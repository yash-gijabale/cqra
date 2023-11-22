import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-trade-group',
  templateUrl: './create-trade-group.component.html',
  styleUrls: ['./create-trade-group.component.css']
})
export class CreateTradeGroupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit() {
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
     
    }

}
