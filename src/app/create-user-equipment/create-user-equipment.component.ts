import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-create-user-equipment',
  templateUrl: './create-user-equipment.component.html',
  styleUrls: ['./create-user-equipment.component.css']
})

export class CreateUserEquipmentComponent implements OnInit {
  registerForm: FormGroup;
   
  SelEquipmentType:string="0";
  submitted = false;
  SelUser:string="0"; 

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService) { }

  ngOnInit() {

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
  }

}
