import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-quality-update-report',
  templateUrl: './quality-update-report.component.html',
  styleUrls: ['./quality-update-report.component.css']
})
export class QualityUpdateReportComponent implements OnInit {
  registerForm: FormGroup;
   
  SelClientId:string="0";
  SelProject:string="0";
  SelStructure:string="0";
  SelStage:string="0";
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
