import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { ProjectData, ProjectView } from '../project/project.component';
export class UserView{
  constructor(
    public userId:number,
    public userName: string,
    public userFullName: string,
    public email:string,
    
  ){
 
  }
}



@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {

  SelClientId:string="0"; 
  SelProjectId=[];
  SelRuserId=[];
  fromDate:string="0";
  toDdate:string="0";
  users:UserView[];
  rUsers:UserView[];
  projectForm: FormGroup;
  rProjects:ProjectView[];
  submitted = false;
  
  constructor(private commonService:CommonService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {

    this.projectForm = this.formBuilder.group({
      userId: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      
  });


  this.commonService.getRegionalManagers()
  .subscribe(
    (data) => {
    console.log('Rgional Manager Data==',data)
   // this.users= data;
  
  }, (err) => {
    console.log('-----> err', err);
  })

  this.commonService.getUsers()
  .subscribe(
    (data) => {
    console.log('User Data==',data)
   // this.rUsers= data;
  
  }, (err) => {
    console.log('-----> err', err);
  })

  }
  getProjects(){
    alert(this.SelClientId);
    this.commonService.getProjects(this.SelClientId)
    .subscribe(
      (data) => {
      console.log('Project Data==',data)
      this.rProjects= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  get f() { return this.projectForm.controls; }
  onSubmit(){
    alert(this.SelProjectId+" TO "+this.SelRuserId +" Date "+this.fromDate+"To"+ this.toDdate);
   
    
  }
}
