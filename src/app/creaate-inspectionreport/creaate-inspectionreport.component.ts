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
import { CycleOfInspection } from '../ncclosure-sa/ncclosure-sa.component';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

export class InspectionReport {
  constructor(
    public clientId: number,
    public projectId: number,
    public structureId: number,
    public tradeId: number,
    public clientRep: number,
    public assessmentDate: string,
    public nabcReport: number,
    public nabcNote: number,
    public fromDate: string,
    public toDate: string,
    public approver: number,
    public approverDesign: string,
    public revever: number,
    public revekverDesign: string,
    public createrName: number,
    public createrDesign: string,
    public reportHeader: string,
    public image1: string,
    public image2: string,
    public cycleOfInspection: number,
    public typeOfProject: string,
    public uicNumber: string,
    public index: string,
  ) { }
}

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
  cycleOfInspection: CycleOfInspection[]

  inspectionReporotForm: FormGroup
  inspectionReportId: number
  constructor(
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tradeService: TradeMaintanceService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.inspectionReportId = this.route.snapshot.params['id']

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

    if (this.inspectionReportId != -1) {
      let retrivedData;
      this.commonService.retriveInspectionReport(this.inspectionReportId)
        .pipe(first())
        .subscribe(data => {
          console.log(data)
          retrivedData = data
          this.commonService.getClientProject(retrivedData.clientId).subscribe(data => this.projects = data)

          this.commonService.getStructures(retrivedData.clientId, retrivedData.projectId).subscribe(data => this.structures = data)

          this.tradeService.getProjectTrades(retrivedData.projectId).subscribe(data => this.trades = data)
          this.inspectionReporotForm.patchValue(data)
        }, err => console.log(err))



    }
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

  onSubmit() {
    let tradeIds = this.inspectionReporotForm.value.tradeId
    let structureIds = this.inspectionReporotForm.value.structureId
    let contractors = this.inspectionReporotForm.value.clientRep

    delete this.inspectionReporotForm.value.tradeId
    delete this.inspectionReporotForm.value.structureId
    delete this.inspectionReporotForm.value.clientRep
    let data = {
      inspectReport: this.inspectionReporotForm.value,
      inspectTrade: tradeIds,
      inspectClient: contractors,
      inspectStructure: structureIds
    }
    console.log(data)
    // return
    if (this.inspectionReportId != -1) {
      this.commonService.updateInspectionReport(data, this.inspectionReportId)
        .subscribe(data => console.log('Updated inpection-->', data))

    } else {

      this.commonService.createInspectionReport(data)
        .subscribe(data => console.log('created inpection-->', data))
    }
  }

}
