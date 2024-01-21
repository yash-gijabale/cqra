import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { first } from 'rxjs/operators';


export class MisFromData {
  constructor(
    public clientId: Number,
    public schemeId: Number,
    public month: String,
    public value: String,
    public qualityOfWork: String,
    public image1: String,
    public image2: String,
  ) { }
}

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
  misId: number


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commonService: CommonService
  ) { }


  ngOnInit() {

    this.misId = this.route.snapshot.params['id']

    if (this.misId != -1) {
      let Mis;
      this.commonService.getMisReport(this.misId)
        .pipe(first())
        .subscribe(data => {
          Mis = data
          this.commonService.getClientProject(Mis.clientId).subscribe(data => this.projects = data)
          this.registerForm.patchValue(data)
        })
    }

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;

    }, (err) => {
      console.log('-----> err', err);
    })


    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      schemeId: ['', Validators.required],
      month: ['', Validators.required],
      value: ['', Validators.required],
      qualityOfWork: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
    })

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.registerForm.value);

    if (this.misId != -1) {
      this.commonService.updateMisReport(this.registerForm.value, this.misId)
      .subscribe(data =>{
        console.log('updated-->', data)
      })

    } else {

      this.commonService.createMisReport(this.registerForm.value)
        .subscribe(data => {
          console.log('data Added-->', data)
        })
    }
  }

  getProject() {
    this.commonService.getClientProject(this.SelClientId).subscribe(data => this.projects = data)

  }

}
