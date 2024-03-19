import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientServiceService } from '../service/client-service.service';
import { UserService } from '../service/user.service';
import { ClientData } from '../client/client.component';
import { RegionView } from '../add-region/add-region.component';
import { RoleView } from '../add-role/add-role.component';
import { CommonService } from '../common.service';

import { InspectorTraning } from '../service/inspectionTraining.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  // imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})

export class CreateUserComponent implements OnInit {

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  SelUserType: string = "0";
  SelRole: string = "0";
  SelRedAlert: string = "0";
  id: number;
  registerForm: FormGroup;
  redAlerts;
  submitted = false;
  representingType: Number = 1
  showCadre = true
  clients: ClientData[]
  regions: RegionView
  roles: RoleView

  representator = []

  isLoading = false

  userRegions = []

  projects: Array<any> = []

  isProjectLoad: boolean = false

  clientProjectObject = {}

  assignProjectObject = {}


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private userService: UserService,
    private commonService: CommonService,
    private inspectionTraining: InspectorTraning
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.userService.getAllRegions().subscribe(data => this.regions = data)
    this.userService.getAllRoles().subscribe(data => this.roles = data)

    if (this.representingType == 1) {
      this.clientServiceService.getAllClients()
        .subscribe(data => {
          this.clients = data
          this.clientDataToRepresentator(data)
        })
    }

    if (this.id != -1) {
      this.userService.retriveUser(this.id)
        .pipe(first())
        .subscribe(data => {
          console.log(data)
          if (data[0]) {

            let userData: any = data[0]
            this.representingType = userData.representingTypeId
            this.getRepresentors()
            this.userRegions = userData.region.split(",")
            this.userRegions = this.userRegions.map(e => {
              return Number(e)
            })
            console.log(this.userRegions)
            this.registerForm.patchValue(data[0])
            this.registerForm.patchValue({ region: this.userRegions })
            this.registerForm.patchValue({ dateOfJoining: new Date(userData.dateOfJoining).toISOString().substring(0, 10) })
          }
        });
      
      this.inspectionTraining.getUserDeclarationDetails(this.id)
      .subscribe(data =>{
        console.log(data)
        data.forEach(d =>{
          this.assignProjectList.push(d.projectId)
          this.assignProjectObject[d.projectId] = true
        })
      })
    }

    this.isProjectLoad = true
    this.commonService.getAllProject()
      .subscribe(data => {
        console.log(data)
        this.projects = data
        this.isProjectLoad = false
        this.generateClientProjectObject(data)

      })

    this.registerForm = this.formBuilder.group({
      userFullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      designation: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
      roleId: ['', Validators.required],
      userImage: ['', Validators.nullValidator],
      approverN: ['', Validators.nullValidator],
      reviewerN: ['', Validators.nullValidator],
      createrN: ['', Validators.nullValidator],
      l0: ['', Validators.nullValidator],
      l1: ['', Validators.nullValidator],
      l2: ['', Validators.nullValidator],
      l3: ['', Validators.nullValidator],
      region: [[], Validators.required],
      representingTypeId: ['', Validators.required],
      representingId: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      department: ['', Validators.nullValidator],
      cadre: ['', Validators.nullValidator],
      employeeId: ['', Validators.nullValidator]


    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.registerForm.value.region = this.registerForm.value.region.toString()
    let signData = document.querySelector('#userSign') as HTMLInputElement
    let img1: File = signData.files[0]
    console.log(img1)

    // console.log(this.registerForm.value)
    // return
    //UPDATING THE FORM FOR MAPPING VALUES IN BACKEND
    let formData = {
      ...this.registerForm.value,
      status: true,
    }

    console.log(formData)

    // IF VALDATION IS FALSE THEN RETUN AND SHOW ERRORS
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      return
    }


    //UPDATE USER AND CREATE USER 
    if (this.id != -1) {
      this.isLoading = true
      this.userService.updateUSer(formData, this.id)
        .subscribe(
          data => {
            console.log('user updated-->', data)
            this.isLoading = false
            let newUser: any = data
            this.assignProjectForNonCQRA(newUser.id)

            if (img1) {
              this.userService.uploadUserSign(newUser.id, img1)
                .subscribe(data => {
                  console.log('img uploaded', data)
                }, err => console.log(err))

            }

          },
          err => console.log(err))
    } else {

      this.isLoading = true
      this.userService.createUser(formData)
        .subscribe(
          data => {
            console.log('user created!--->', data)
            let newUser: any = data
            this.registerForm.reset()
            this.assignProjectForNonCQRA(newUser.id)
            this.isLoading = false
            if (img1) {
              this.userService.uploadUserSign(newUser.id, img1)
                .subscribe(data => {
                  console.log('img uploaded', data)
                })

            }

          },
          err => console.log(err)
        )
    }

  }


  generateClientProjectObject(data) {
    data.forEach(item => {
      this.clientProjectObject[item.projectId] = item.clientId
    })
  }

  getRepresentors() {
    console.log(this.representingType)
    if (this.representingType == 1) {
      this.showCadre = true
    } else {
      this.showCadre = false
    }

    let letter: Number = this.representingType
    switch (Number(letter)) {
      // console.log()
      case 3:
        this.commonService.getAllContractors().subscribe(data => {
          console.log('contractors-->', data)
          this.contractorDataToRepresentator(data)
        })
        break;

      case 4:
        this.clientServiceService.getAllPmcs().subscribe(data => {
          console.log('PMC-->', data)
          this.pmcDataToRepresentator(data)
        })
        break;

      default:
        this.clientServiceService.getAllClients().subscribe(data => {
          console.log('clients-->', data)
          this.clientDataToRepresentator(data)
        })
        break;
    }

    console.log(this.showCadre)
  }


  contractorDataToRepresentator(data) {
    this.representator = []
    data.forEach(item => {
      let contractor = {
        id: item.contractorId,
        name: item.contractorName
      }
      this.representator.push(contractor)
    })
  }

  pmcDataToRepresentator(data) {
    this.representator = []
    data.forEach(item => {
      let pmc = {
        id: item.pmcId,
        name: item.pmcName
      }
      this.representator.push(pmc)
    })
  }

  clientDataToRepresentator(data) {
    this.representator = []
    data.forEach(item => {
      let client = {
        id: item.clientId,
        name: item.clientName
      }
      this.representator.push(client)
    })
  }


  assignProjectList = []
  addToProjectList(e) {
    if (e.target.checked) {
      this.assignProjectList.push(Number(e.target.value))
    } else {
      let updateTradeArray = this.assignProjectList.filter(trade => {
        if (trade != e.target.value) {
          return trade
        }
      })

      this.assignProjectList = updateTradeArray
    }

    console.log(this.assignProjectList)
  }

  assignProjectForNonCQRA(userId) {
    if (this.representingType != 1 && this.assignProjectList.length > 0) {
      let assignData = []
      this.assignProjectList.forEach(projectId => {
        let data = {
          clientId: this.clientProjectObject[projectId],
          projectId: projectId,
          userId: Number(userId),
          trainingDate: new Date().toISOString().slice(0, 10),
          dtmStatus: 1,
          userStatus: 1
        }
        assignData.push(data)
      })
      console.log(assignData)
      this.inspectionTraining.assignMultipleProject(assignData)
        .subscribe(data => {
          console.log('projexts assigned', data)
        })
    }

  }
}
