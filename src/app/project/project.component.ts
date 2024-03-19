import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ClientServiceService } from '../service/client-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';


export class ProjectData {
  constructor(
    public clientId: number,
    public projectName: string,
    public projectCode: string,
    public projectAddress: string,
    public projectCity: string,
    public projectKValue: string,
    public projectRegionalManagerId: string,
    public projectStartDate: string,
    public projectEndDate: string,
    public projectMisNCs: string,
    public projectNCOpen: string,
    public projectRedalert: string,
    public projectCCmails: string,
    public projectAutoNCOpen: string,
    public projectAutoNCOpenWithEmail: string
  ) {

  }
}

export class ProjectView {
  constructor(
    public projectId: string,
    public projectName: string,
    public clientName: string,
    public projectCity: string,

  ) {

  }
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  riskimpartialityForm:FormGroup;


  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ProjectView> = new Subject();

  projects: ProjectData[];
  ProjectViews: ProjectView[];

  // projectId:string =''

  isLoading:boolean

    constructor(
      private clientService: ClientServiceService, 
      private router: Router,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {

    this.isLoading = true

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50]
    };


    this.clientService.getAllProject().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.ProjectViews = data;
      this.dtTrigger.next();
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    });



    // riskimpartialityForm
    this.riskimpartialityForm = this.formBuilder.group({
      developerDet: ['', Validators.required],
      Developer: ['', Validators.required],
      developerIfyes: ['', Validators.required],

      projectDet: ['', Validators.required],
      Project: ['', Validators.required],
      projectIfyes: ['', Validators.required],

      locationDet: ['', Validators.required],
      review: ['', Validators.required],

      contructiondet: ['', Validators.required],
      contruction: ['', Validators.required],
      contructionIfyes: ['', Validators.required],

      signature: ['', Validators.required],
      date: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      // Project: ['', Validators.required],
    })
  }


  databyid :any[]
  getDataByprojectID(id){
    this.clientService.getriskToImpartiality(id)
    .subscribe(data=>{
      this.databyid = data
      console.log(this.databyid)
    })
    
  }
 

  submitimpartiality(){
    let riskToImpartiality = [
      {
        projectId:1,
        description:1,
        details:this.riskimpartialityForm.value.developerDet,
        relationship:this.riskimpartialityForm.value.Developer,
        relationshipDetail:this.riskimpartialityForm.value.developerIfyes
      },
      {
        projectId:1,
        description:2,
        details:this.riskimpartialityForm.value.projectDet,
        relationship:this.riskimpartialityForm.value.Project,
        relationshipDetail:this.riskimpartialityForm.value.projectIfyes
      },
      {
        projectId:1,
        description:3,
        details:this.riskimpartialityForm.value.locationDet,
      },
      {
        projectId:1,
        description:4,
        details:this.riskimpartialityForm.value.review,
      }
    ]

    let riskToImpartialityConstructionContractor = [
      {
        rtiid:1,
        description:1,
        details:this.riskimpartialityForm.value.contructiondet,
        relationship:this.riskimpartialityForm.value.contruction,
        relationshipDetail:this.riskimpartialityForm.value.contructionIfyes
      }
    ]

    let alldata ={
      riskToImpartiality,
      riskToImpartialityConstructionContractor
    }
    console.log(alldata);

    // if(){
    // this.clientService.updateriskToImpartiality(alldata)
    // .subscribe(data=>{
    //   console.log("Form Submited!",data);
    // })
    // }else{
    this.clientService.riskToImpartiality(alldata)
    .subscribe(data=>{
      console.log("Form Submited!",data);
    })

    // }

  }

  editProject(id) {
    console.log(`update ${id}`)
    this.router.navigate(['createProject', id])
  };

  deActivateProject(id) {
    const isDelete = confirm('Are you sure want to Deactivate !')
    if (isDelete) {
      this.clientService.deactivateProject(id)
        .subscribe(
          data => {
            console.log('deactivated !')
            location.reload();
          },
          err => console.log(err)
        )
    }
  }

  configureChecklist(id){
    this.router.navigate(['configureChecklist', id])
  }

  manageTradeDetails(id){
    this.router.navigate(['projectTradeDetails', id])
  }

  manageTradeSequence(id){
    this.router.navigate(['projectTradeSequence', id])
  }
}


