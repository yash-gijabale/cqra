import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientServiceService } from "../service/client-service.service";
import { CommonService } from "../common.service";
import { ProjectData } from "../project/project.component";
import { ClientData } from "../client/client.component";
import { data } from "jquery";
import { Trade } from "../trade/trade.component";
import { TradeMaintanceService } from "../trade-maintance.service";

@Component({
  selector: "app-create-user-allocation",
  templateUrl: "./create-user-allocation.component.html",
  styleUrls: ["./create-user-allocation.component.css"],
})
export class CreateUserAllocationComponent implements OnInit {
  userAllocationForm: FormGroup;
  submitted = false;
  SelUser: string = "0";
  SelProject: string = "0";
  SelStructure: string = "0";
  SelChecklist: string = "0";
  SelClientId: string = "0";
  SelStage: string = "0";
  structures:any;
  stages:any;

  clients :ClientData[]
  trades: Trade[]

  projects:ProjectData[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commanService: CommonService,
    private tradeMaintance: TradeMaintanceService
  ) {}

  ngOnInit() {
    this.commanService.getAllUsers()
    .subscribe(data=> {
      console.log('USERS ==>',data)
    })

    this.clientServiceService.getAllClients()
    .subscribe(data => {
      this.clients = data;
    })

    this.tradeMaintance.getAllTrades()
    .subscribe(data => {
      this.trades = data;
    })

    this.userAllocationForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      userId:['', Validators.required],
      projectId:['', Validators.required],
      structureId : ['', Validators.required],
      stageId : ['', Validators.required],
      tradeId: ['', Validators.required],
      checklistId: ['', Validators.required]
    })

  }
  get f() {
    return this.userAllocationForm.controls;
  }

  onSubmit() {
    console.log("Id==");
    console.log(this.userAllocationForm.value)
  }

  getProjects(){
    console.log(this.SelClientId)
    this.commanService.getClientProject(this.SelClientId)
    .subscribe(
      (data) => {
      console.log('Project Data==',data)
      this.projects= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  getStructure(){
    console.log(this.SelProject)
    this.commanService.getStructures(this.SelClientId,this.SelProject)
    .subscribe(
      (data) => {
      console.log('Structure Data==',data)
      this.structures= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  getStages()
  {
    console.log(this.SelStructure)
    this.commanService.getStages(this.SelClientId,this.SelProject, this.SelStructure)
    .subscribe(
      (data) => {
      console.log('stage Data==',data)
      this.stages= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }
}
