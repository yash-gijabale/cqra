import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { first } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';

@Component({
  selector: 'app-create-contractor',
  templateUrl: './create-contractor.component.html',
  styleUrls: ['./create-contractor.component.css']
})
export class CreateContractorComponent implements OnInit {

  SelClient: string = "0";
  SelProject: string = '0'
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
      contractorName: ['', Validators.required],
      contarctorAddress: ['', Validators.required],
      projectId: ['', Validators.required],
      gstNumber: ['', Validators.required],
      contarctorEmail: ['', [Validators.required, Validators.email]],
      contarctorPhone: ['', [Validators.required, Validators.minLength(10)]],
    });


  }

  get f() { return this.registerForm.controls; }

  getProjects() {
    console.log(this.SelClient)
    this.commonService.getClientProject(this.SelClient).subscribe(data => this.projects = data)
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return
    }
    this.isLoading = true;
    console.log("Id==");
    let fromData = {...this.registerForm.value, isActive: 1}
    console.log(fromData)

    if (this.contractorId != -1) {

      this.clientServiceService.updateContractor(fromData, this.contractorId)
        .subscribe(
          data => {
            console.log('updated !')
            console.log(data)
          },
          err => console.log(err)
        )

    } else {

      this.clientServiceService.createContractor(fromData)
        .subscribe(data => {
          console.log('data adedd', data)
          this.isLoading = false
        })
    }

  }

}
