import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-create-quality-index-report',
  templateUrl: './create-quality-index-report.component.html',
  styleUrls: ['./create-quality-index-report.component.css']
})
export class CreateQualityIndexReportComponent implements OnInit {

  qualityIndexReportForm: FormGroup;
  submitted = false;
  SelProject:string="0"; 
  SelClient:string="0"; 
  SelTrade:string="0"; 
  SelStructure:string="0"; 
  clients:ClientData[]
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService) { }

  ngOnInit() {
    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    }, (err) => {
      console.log('-----> err', err);
    })


    this.qualityIndexReportForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      tradeId: ['', Validators.required],
      clientRep: ['', Validators.required],
      assessmentDate: ['', Validators.required],
      nabcReport: ['', Validators.required],
      nabcNote: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      approver: ['', Validators.required],
      approverDesign: ['', Validators.required],
      revever: ['', Validators.required],
      revekverDesign: ['', Validators.required],
      createrName: ['', Validators.required],
      createrDesign: ['', Validators.required],
      reportHeader: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
      cycleOfInspection: ['', Validators.required],
      typeOfProject: ['', Validators.required],
      uicNumber: ['', Validators.required],
      index: ['', Validators.required]
    })
  }
  get f() { return this.qualityIndexReportForm.controls; }

  onSubmit() {
      console.log("Id==");
  }

}