import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';


@Component({
  selector: 'app-assign-constructor-supervisor',
  templateUrl: './assign-constructor-supervisor.component.html',
  styleUrls: ['./assign-constructor-supervisor.component.css']
})
export class AssignConstructorSupervisorComponent implements OnInit {

  registerForm:FormGroup;
  SelProject:any;
  SelStructure:any;
  projects : ProjectData[];
  submitted:boolean
  structures:any

  constructor(
    private commonServices:CommonService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {

    this.submitted = true;
    this.commonServices.getAllProject()
    .subscribe(data => {
      console.log('projects--->', data)
      this.projects = data
    })

    this.registerForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      contractorId: ['', Validators.required],
      supervisorId: ['', Validators.required],
      tradeId: ['', Validators.required],
    })
  }
  getStructure(){
    console.log(this.SelProject)
    
  }

  onSubmit()
  {
    console.log('sibmited')
  }

}
