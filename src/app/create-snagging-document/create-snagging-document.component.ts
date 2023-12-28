import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { UserView } from '../user-log/user-log.component';
import { CycleOfInspection } from '../ncclosure-sa/ncclosure-sa.component';
import { UserService } from '../service/user.service';
import { TradeMaintanceService } from '../trade-maintance.service';

@Component({
  selector: 'app-create-snagging-document',
  templateUrl: './create-snagging-document.component.html',
  styleUrls: ['./create-snagging-document.component.css']
})
export class CreateSnaggingDocumentComponent implements OnInit {

  clients: ClientData[];
  projects: ProjectData[];
  structures: any;
  trades: any;
  contractors: any;
  approvers: UserView[];
  reviwers: UserView[];
  creaters: UserView[];
  cycleOfInspection: CycleOfInspection[]
  SelClientId: string = "0";
  SelProjectId: string = "0";
  SelstructureId: string = "0";
  SelTradeId: string = "0";
  SelContractorId: string = "0";
  SelAssessmentDate: string = "0";
  Selnabcreport: string = "0";
  Selnabcnote: string = "0";
  SelFromDate: string = "0";
  SelToDate: string = "0";

  snaggingReportFrom: FormGroup


  constructor(
    private clientServiceService: ClientServiceService, 
    private commonService: CommonService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService,
    private tradeService: TradeMaintanceService,
    )
     { }

  ngOnInit() {

    this.snaggingReportFrom = this.formBuilder.group({
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

    this.clientServiceService.getAllClients().subscribe((data) => {
      this.clients = data;
    }, (err) => {
      console.log('-----> err', err);
    })

    this.commonService.getAllContractors().subscribe(data => this.contractors = data)

    this.commonService.getAllCycleOfInspection().subscribe(data => this.cycleOfInspection = data, err => console.log(err))

    this.userService.getApproverList().subscribe(data => this.approvers = data)
    this.userService.getReviewverList().subscribe(data => this.reviwers = data)
    this.userService.getCreaterList().subscribe(data => this.creaters = data)

  }

  getProjects() {
    // alert(this.SelClientId);
    this.commonService.getClientProject(this.SelClientId)
      .subscribe(
        (data) => {
          console.log('Project Data==', data)
          this.projects = data;

        }, (err) => {
          console.log('-----> err', err);
        })
  }

  getStructures() {
    // alert(this.SelProjectId);
    this.commonService.getStructures(this.SelClientId, this.SelProjectId)
      .subscribe(
        (data) => {
          console.log('Structure Data==', data)
          this.structures = data;

        }, (err) => {
          console.log('-----> err', err);
        })
        this.tradeService.getProjectTrades(this.SelProjectId)
        .subscribe(data => {
          console.log(data)
          this.trades = data
        })
  }


  getContractor() {
    // alert("called" + this.SelstructureId);
    this.commonService.getContractors(this.SelClientId, this.SelProjectId, this.SelstructureId, this.SelTradeId)
      .subscribe(
        (data) => {
          console.log('Contractor Data==', data)
          this.contractors = data;

        }, (err) => {
          console.log('-----> err', err);
        })

  }

  get f() { return this.snaggingReportFrom.controls }

  onSubmit() {
    let tradeIds = this.snaggingReportFrom.value.tradeId
    let structureIds = this.snaggingReportFrom.value.structureId
    let contractors = this.snaggingReportFrom.value.clientRep

    delete this.snaggingReportFrom.value.tradeId
    delete this.snaggingReportFrom.value.structureId
    delete this.snaggingReportFrom.value.clientRep
    let data = {
      inspectReport: this.snaggingReportFrom.value,
      inspectTrade: tradeIds,
      inspectClient: contractors,
      inspectStructure: structureIds
    }
    console.log(data)
    this.commonService.createSnaggingReport(data)
    .subscribe(data => console.log('snagging added-->', data))
  }

}
