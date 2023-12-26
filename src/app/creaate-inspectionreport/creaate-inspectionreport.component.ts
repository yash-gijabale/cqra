import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { UserView } from '../user-log/user-log.component';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ContractorData } from '../contractor-forman/contractor-forman.component';

@Component({
  selector: 'app-creaate-inspectionreport',
  templateUrl: './creaate-inspectionreport.component.html',
  styleUrls: ['./creaate-inspectionreport.component.css']
})
export class CreaateInspectionreportComponent implements OnInit {

  clients: ClientData[];
  projects: ProjectData[];
  contractors: ContractorData[]
  structures: any;
  trades: any;
  SelAssessmentDate: any;
  approvers: UserView[];
  reviwers: UserView[];
  creaters: UserView[];
  SelClient: string = "0";
  SelProject: string = "0";
  SelStructure: string = "0";
  SelTradeId: string = "0";
  SelContractorId: string = "0";

  inspectionReporotForm: FormGroup
  constructor(
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {

    this.clientServiceService.getAllClients().subscribe((data) => {
      this.clients = data;
    }, (err) => {
      console.log('-----> err', err);
    })

    this.commonService.getAllContractors()
      .subscribe(data => this.contractors = data)

    // this.commonService.getApprovers().subscribe((data) => {
    //   console.log('----> office service : approval', data);
    //   this.approvers = data;

    // }, (err) => {
    //   console.log('-----> err', err);
    // })

    // this.commonService.getReviewer().subscribe((data) => {
    //   console.log('----> office service : reviever', data);
    //   this.reviwers = data;

    // }, (err) => {
    //   console.log('-----> err', err);
    // })

    // this.commonService.getCreater().subscribe((data) => {
    //   console.log('----> office service :crateter', data);
    //   this.creaters = data;

    // }, (err) => {
    //   console.log('-----> err', err);
    // })


    this.inspectionReporotForm = this.formBuilder.group({
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

  get f() { return this.inspectionReporotForm.controls }

  getProjects() {
    this.commonService.getClientProject(this.SelClient)
      .subscribe(
        (data) => {
          console.log('Project Data==', data)
          this.projects = data;

        }, (err) => {
          console.log('-----> err', err);
        })
  }

  getStructures() {
    this.commonService.getStructures(this.SelClient, this.SelProject)
      .subscribe(
        (data) => {
          console.log('Structure Data==', data)
          this.structures = data;

        }, (err) => {
          console.log('-----> err', err);
        })

    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })
  }

  getTrade() {
    this.commonService.getTrade(this.SelClient, this.SelProject, this.SelStructure)
      .subscribe(
        (data) => {
          console.log('Trade Data==', data)
          this.trades = data;

        }, (err) => {
          console.log('-----> err', err);
        })

  }


  onSubmit() {
    console.log(this.inspectionReporotForm.value)
  }

}
