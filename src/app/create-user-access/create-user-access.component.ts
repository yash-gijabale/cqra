import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-create-user-access',
  templateUrl: './create-user-access.component.html',
  styleUrls: ['./create-user-access.component.css']
})
export class CreateUserAccessComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  SelUser:string="0"; 
  userMenu = JSON.parse(sessionStorage.getItem('userMenu'))
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService) { }

  ngOnInit() {

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
  }

}
