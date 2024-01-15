import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';

@Component({
  selector: 'app-create-mis-report',
  templateUrl: './create-mis-report.component.html',
  styleUrls: ['./create-mis-report.component.css']
})
export class CreateMisReportComponent implements OnInit {
  registerForm: FormGroup;

  SelClientId: string = "0";
  SelProject: string = "0";
  submitted = false;
  SelUser: string = "0";
  clients: ClientData[]
  projects: ProjectData[]

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private clientServiceService: ClientServiceService,
    private commonService: CommonService
    ) { }

  ngOnInit() {

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;

    }, (err) => {
      console.log('-----> err', err);
    })


    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      month: ['', Validators.required],
      index: ['', Validators.required],
      reviewOfWork: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
    })

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  getProject() {
    this.commonService.getClientProject(this.SelClientId).subscribe(data => this.projects = data)

  }

}
