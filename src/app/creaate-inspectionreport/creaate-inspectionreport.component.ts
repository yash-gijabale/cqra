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
import { InspectorTraning } from '../service/inspectionTraining.service';

export class InspectionReportSnappAudit {
  constructor(
    public snapAudit: Object,
    public inspectTradeList: Array<Object>,
    public inspectClientList: Array<Object>,
    public inspectStructureList: Array<Object>
  ) { }
}

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
  contractors: ContractorData
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
  SelContractor: string = "0";
  cycleOfInspection: CycleOfInspection[]

  inspectionReporotForm: FormGroup
  inspectionReportId: number

  masterIds: Array<any>
  userId: number = Number(localStorage.getItem('id'))
  constructor(
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tradeService: TradeMaintanceService,
    private userService: UserService,
    private route: ActivatedRoute,
    private inspectionTraining: InspectorTraning
  ) { }

  ngOnInit() {

    this.inspectionReportId = this.route.snapshot.params['id']

    this.clientServiceService.getAllClients().subscribe((data) => {
      this.clients = data;
    }, (err) => {
      console.log('-----> err', err);
    })

    this.inspectionTraining.getMasterIdsByUserId(this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterIds = data

      })

    // this.commonService.getAllContractors().subscribe(data => this.contractors = data)

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
          this.commonService.getClientProject(retrivedData.snapAudit.clientId).subscribe(data => this.projects = data)

          this.commonService.getStructures(retrivedData.snapAudit.clientId, retrivedData.snapAudit.schemeId).subscribe(data => this.structures = data)

          this.tradeService.getProjectTrades(retrivedData.snapAudit.schemeId).subscribe(data => this.trades = data)

          this.clientServiceService.getContractorByProjectId(retrivedData.snapAudit.schemeId).subscribe(data => {
            this.contractors = data
          })
          this.inspectionReporotForm.patchValue(retrivedData.snapAudit)
          let tradeIds = retrivedData.inspectTradeList.map((items) => {
            return items.tradeId
          })
          let structureIds = retrivedData.inspectStructureList.map((item) => {
            return item.structureId
          })
          let clientReps = retrivedData.inspectClientList.map((item) => {
            return item.clientId
          })
          console.log(structureIds)
          this.inspectionReporotForm.patchValue({ tradeId: tradeIds })
          this.inspectionReporotForm.patchValue({ structureId: structureIds })
          this.inspectionReporotForm.patchValue({ clientRep: clientReps })
        }, err => console.log(err))
    }

    this.inspectionReporotForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      schemeId: ['', Validators.required],
      structureId: ['', Validators.required],
      tradeId: ['', Validators.required],
      clientRep: ['', Validators.required],
      assessmentDate: ['', Validators.required],
      nabc: ['', Validators.required],
      nabcNote: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      approverId: ['', Validators.required],
      approverDesign: ['', Validators.required],
      reviewerId: ['', Validators.required],
      reviewerDesign: ['', Validators.required],
      createrId: ['', Validators.required],
      createrName: ['', Validators.required],
      reportHeader: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
      cycleId: ['', Validators.required],
      typeOfReport: ['', Validators.required],
      uicNo: ['', Validators.required],
      saIndex: ['', Validators.required],
      masterId: ['', Validators.required]
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

  fetchProject(id) {
    this.commonService.getClientProject(id)
      .subscribe(
        (data) => {
          this.projects = data;
        }, (err) => {
          console.log('-----> err', err);
        })
  }

  getMasterDetails(e) {
    this.inspectionTraining.getMasterDetails(e.target.value, this.userId)
      .subscribe(data => {
        console.log('master Data', data)
        let mData = data
        this.inspectionReporotForm.patchValue({ clientId: data[0].clientId })
        this.commonService.getClientProject(data[0].clientId)
          .subscribe(
            (data) => {
              this.projects = data;
              this.inspectionReporotForm.patchValue({ projectId: mData[0].projectId })
            })
        this.inspectionReporotForm.patchValue({ fromDate: new Date(data[0].fromDate).toISOString().substring(0, 10) })
        this.inspectionReporotForm.patchValue({ toDate: new Date(data[0].toDate).toISOString().substring(0, 10) })
        this.inspectionReporotForm.patchValue({ cycleId: data[0].cycleId })
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

    this.clientServiceService.getContractorByProjectId(this.SelProject)
      .subscribe(data => {
        this.contractors = data
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
      snapAudit: { ...this.inspectionReporotForm.value, type: 0 },
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
