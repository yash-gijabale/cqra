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
import { data } from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';
// import {FormControl} from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private userService: UserService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.userService.getAllRegions().subscribe(data => this.regions = data)
    this.userService.getAllRoles().subscribe(data => this.roles = data)

    if(this.representingType == 1){
      this.clientServiceService.getAllClients()
      .subscribe(data => {
        this.clients = data
        this.clientDataToRepresentator(data)
      })
    }

    if (this.id != -1) {
      this.userService.retriveUser(this.id)
        .pipe(first())
        .subscribe(x => {
          console.log(x)
          this.registerForm.patchValue(x)
        });
    }

    this.registerForm = this.formBuilder.group({
      userFullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      designation: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
      roleId: ['', Validators.required],
      userImage: ['', Validators.required],
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
      department: ['', Validators.required],
      cadre: ['', Validators.required]


    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.registerForm.value)
    // return

    //UPDATING THE FORM FOR MAPPING VALUES IN BACKEND
    let formData = {
      ...this.registerForm.value,
      // userRole: Number(this.registerForm.value.roleId),
      status: true
    }

    console.log(formData)

    //IF VALDATION IS FALSE THEN RETUN AND SHOW ERRORS
    // if (this.registerForm.invalid) {
    //   return
    // }


    //UPDATE USER AND CREATE USER 
    if (this.id != -1) {
      this.userService.updateUSer(formData, this.id)
        .subscribe(
          data => { console.log('user updated-->', data) },
          err => console.log(err))

    } else {

      this.userService.createUser(formData)
        .subscribe(
          data => {
            console.log('user created!--->', data),
              this.registerForm.reset()
          },
          err => console.log(err)
        )
    }

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


  contractorDataToRepresentator(data){
    this.representator = []
      data.forEach(item =>{
        let contractor = {
          id: item.contractorId,
          name: item.contractorName
        }
        this.representator.push(contractor)
      })
  }

  pmcDataToRepresentator(data){
    this.representator = []
      data.forEach(item =>{
        let pmc = {
          id: item.pmcId,
          name: item.pmcName
        }
        this.representator.push(pmc)
      })
  }

  clientDataToRepresentator(data){
    this.representator = []
      data.forEach(item =>{
        let client = {
          id: item.clientId,
          name: item.clientName
        }
        this.representator.push(client)
      })
  }

}
