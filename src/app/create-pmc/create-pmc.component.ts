import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { first } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';

export class PmcData{
  constructor(
    public pmcName : string,
    public pmcAddress : string,
    public pmcEmail : string,
    public pmcPhone : string
  ){

  }
}

@Component({
  selector: 'app-create-pmc',
  templateUrl: './create-pmc.component.html',
  styleUrls: ['./create-pmc.component.css']
})
export class CreatePmcComponent implements OnInit {
  SelClient: string = "0";
  registerForm: FormGroup;
  submitted = false;
  clients: ClientData[]
  contractorId: number;
  isLoading = false;
  projects:ProjectData[]
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private clientServiceService: ClientServiceService, 
    private formBuilder: FormBuilder,
    private commonService : CommonService
    ) { }


  ngOnInit() {
    this.contractorId = this.route.snapshot.params['id'];

    if (this.contractorId != -1) {
      this.clientServiceService.retrieveContractor(this.contractorId)
        .pipe(first())
        .subscribe(
          data => this.registerForm.patchValue(data),
          err => console.log(err)
        )
    }

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;
    }, (err) => {
      console.log('-----> err', err);
    })
    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      pmcName: ['', Validators.required],
      pmcAddress: ['', Validators.required],
      projectId: ['', Validators.required],
      gstNumber: ['', Validators.required],
      pmcEmail: ['', [Validators.required, Validators.email]],
      pmcPhone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() { return this.registerForm.controls; }

  getProjects() {
    console.log(this.SelClient)
    this.commonService.getClientProject(this.SelClient).subscribe(data => this.projects = data)
  }
  
  onSubmit(){
    console.log(this.registerForm.value)
    this.clientServiceService.createPmc(this.registerForm.value)
    .subscribe(data => {
      console.log('pmc aded-->', data)
    })
  }

}
