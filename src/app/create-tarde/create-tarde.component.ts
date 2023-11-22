import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-tarde',
  templateUrl: './create-tarde.component.html',
  styleUrls: ['./create-tarde.component.css']
})
export class CreateTardeComponent implements OnInit {

  SelTradeGp:string="0";  
  registerForm: FormGroup;
  clients:ClientData[]
  submitted = false;

  constructor( private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService,private formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
     
    }
}
