import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { data } from 'jquery';

@Component({
  selector: 'app-create-contractor',
  templateUrl: './create-contractor.component.html',
  styleUrls: ['./create-contractor.component.css']
})
export class CreateContractorComponent implements OnInit {

  SelClientId:string="0";  
  registerForm: FormGroup;
  submitted = false;
  clients:ClientData[]

  constructor( private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService, private formBuilder: FormBuilder,) { }


  ngOnInit() {

    
    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    }, (err) => {
      console.log('-----> err', err);
    })
    this.registerForm = this.formBuilder.group({
      clientId : ['', Validators.required],
      contractorName: ['', Validators.required],
      address: ['', Validators.required],
      contractorEmail: ['', Validators.required],
      contractorPhone: ['', Validators.required],
    });


  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
      console.log(this.registerForm.value)

      this.clientServiceService.createContractor(this.registerForm.value)
      .subscribe(data => {
        console.log('data adedd')
      })
     
    }

}
