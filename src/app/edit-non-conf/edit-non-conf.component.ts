import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-non-conf',
  templateUrl: './edit-non-conf.component.html',
  styleUrls: ['./edit-non-conf.component.css']
})
export class EditNonConfComponent implements OnInit {

  SelClientId:string="0"; 
  SelProjectId:string="0";
  SelStructureId:string="0";
  SelStageId:string="0";
  SelTradeId:string="0";
  SelChecklistId:string="0";
  SelQuestionGroupId:string="0";
  SelQuestionId:string="0";
  projects:ProjectData[];
  structures:any;
  fromDate:any;
  toDdate:any;
  
  stages:any;
  trades:any;
  checklists:any;
  registerForm: FormGroup;
  checklist:any;
  questiongroups:any;
  questions:any;
  clients:ClientData[];
  submitted = false;

  constructor(private clientServiceService:ClientServiceService,private commonService:CommonService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }


  getProjects() {
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

  getStages(){
    
   alert("Structure ="+this.SelProjectId+" stage="+this.SelStructureId)
      this.commonService.getStages(this.SelClientId,this.SelProjectId, this.SelStructureId)
      .subscribe(
        (data) => {
        console.log('stage Data==',data)
        this.stages= data;
      
      }, (err) => {
        console.log('-----> err', err);
      })
  }

  getTrades(){
    
    alert("Structure ="+this.SelProjectId+" stage="+this.SelStructureId)
       this.commonService.getTrades(this.SelProjectId,this.SelStructureId)
       .subscribe(
         (data) => {
         console.log('stage Data==',data)
         this.trades= data;
       
       }, (err) => {
         console.log('-----> err', err);
       })
   }

   getChecklist(){
    alert("Structure ="+this.SelProjectId+" stage="+this.SelStructureId)
    this.commonService.getChecklists(this.SelProjectId,this.SelTradeId)
    .subscribe(
      (data) => {
      console.log('stage Data==',data)
      this.checklists= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
   }

   getQuestionGroup(){
    alert("Structure ="+this.SelProjectId+" stage="+this.SelStructureId)
    this.commonService.getQuestionGroup(this.SelTradeId)
    .subscribe(
      (data) => {
      console.log('stage Data==',data)
      this.questiongroups= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
   }

   getQuestions(){
    alert("Structure ="+this.SelProjectId+" stage="+this.SelStructureId)
    this.commonService.getQuestion(this.SelTradeId,this.SelQuestionGroupId)
    .subscribe(
      (data) => {
      console.log('stage Data==',data)
      this.trades= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
   }

   get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log('SUCCESS!!')
  }

  }
