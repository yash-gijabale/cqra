import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { UserView } from '../user-log/user-log.component';

@Component({
  selector: 'app-create-snagging-document',
  templateUrl: './create-snagging-document.component.html',
  styleUrls: ['./create-snagging-document.component.css']
})
export class CreateSnaggingDocumentComponent implements OnInit {

  clients:ClientData[];
  projects:ProjectData[];
  structures:any;
  trades:any;
  contractors:any;
  approvers:UserView[];
  reviwers:UserView[];
  creaters:UserView[];
  SelClientId:string="0"; 
  SelProjectId:string="0";
  SelstructureId:string="0";
  SelTradeId:string="0";
  SelContractorId:string ="0";
  SelAssessmentDate:string ="0";
  Selnabcreport:string ="0";
  Selnabcnote:string ="0";
  SelFromDate:string ="0";
  SelToDate:string ="0";
  
  
  
  constructor(private clientServiceService:ClientServiceService,private commonService:CommonService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
    
    this.commonService.getApprovers().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.approvers= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })

    this.commonService.getReviewer().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.reviwers= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })

    this.commonService.getCreater().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.creaters= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })

  }

  getProjects(){
    alert(this.SelClientId);
    this.commonService.getClientProject(this.SelClientId)
    .subscribe(
      (data) => {
      console.log('Project Data==',data)
      this.projects= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  getStructures(){
    alert(this.SelProjectId);
    this.commonService.getStructures(this.SelClientId,this.SelProjectId)
    .subscribe(
      (data) => {
      console.log('Structure Data==',data)
      this.structures= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  getTrade(){
    alert("called"+this.SelstructureId);
    this.commonService.getTrade(this.SelClientId,this.SelProjectId,this.SelstructureId)
    .subscribe(
      (data) => {
      console.log('Trade Data==',data)
      this.trades= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
   
  }

  getContractor(){
    alert("called"+this.SelstructureId);
    this.commonService.getContractors(this.SelClientId,this.SelProjectId,this.SelstructureId,this.SelTradeId)
    .subscribe(
      (data) => {
      console.log('Contractor Data==',data)
      this.contractors= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
   
  }

}
