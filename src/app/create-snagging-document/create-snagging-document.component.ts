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
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { InspectorTraning } from '../service/inspectionTraining.service';


export class SnaggingReportView {
  constructor(
    public snapAudit: Object,
    public snaggStruList: Array<Object>,
    public snaggclientList: Array<Object>,
    public snaggTradeList: Array<Object>
  ) { }
}


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
  SelContractor: string = "0";
  SelAssessmentDate: string = "0";
  Selnabcreport: string = "0";
  Selnabcnote: string = "0";
  SelFromDate: string = "0";
  SelToDate: string = "0";

  snaggingReportFrom: FormGroup
  snaggingReportId: Number

  userId = Number(localStorage.getItem('id'))
  masterIds:any

  constructor(
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute,
    private inspectionTraining: InspectorTraning
  ) { }

  ngOnInit() {

    this.snaggingReportId = this.route.snapshot.params['id']

    this.snaggingReportFrom = this.formBuilder.group({
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
      saIndex: ['', Validators.required]
    })

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


    if (this.snaggingReportId != -1) {
      let retrivedData;
      this.commonService.getSnaggingReport(this.snaggingReportId)
        .pipe(first())
        .subscribe(data => {
          console.log(data)
          this.snaggingReportFrom.patchValue(data.snapAudit)
          retrivedData = data
          this.commonService.getClientProject(retrivedData.snapAudit.clientId).subscribe(data => this.projects = data)

          this.commonService.getStructures(retrivedData.snapAudit.clientId, retrivedData.snapAudit.schemeId).subscribe(data => this.structures = data)

          this.tradeService.getProjectTrades(retrivedData.snapAudit.schemeId).subscribe(data => this.trades = data)

          this.clientServiceService.getContractorByProjectId(retrivedData.snapAudit.schemeId).subscribe(data =>{this.contractors = data})

          let tradeIds = retrivedData.snaggTradeList.map((items) => {
            return items.tradeIds
          })
          let structureIds = retrivedData.snaggStruList.map((item) => {
            return item.structureIds
          })
          let clientReps = retrivedData.snaggclientList.map((item) => {
            return item.clientId
          })
          this.snaggingReportFrom.patchValue({ tradeId: tradeIds })
          this.snaggingReportFrom.patchValue({ structureId: structureIds })
          this.snaggingReportFrom.patchValue({ clientRep: clientReps })
        })
    }


    // this.commonService.getAllContractors().subscribe(data => this.contractors = data)

    this.commonService.getAllCycleOfInspection().subscribe(data => this.cycleOfInspection = data, err => console.log(err))

    this.userService.getApproverList().subscribe(data => {
      console.log(data)
      this.approvers = data
    })
    this.userService.getReviewverList().subscribe(data => this.reviwers = data)
    this.userService.getCreaterList().subscribe(data => this.creaters = data)
  }

  getMasterDetails(e) {
    this.inspectionTraining.getMasterDetails(e.target.value, this.userId)
      .subscribe(data => {
        console.log('master Data', data)
        let mData = data
        this.snaggingReportFrom.patchValue({ clientId: data[0].clientId })
        this.commonService.getClientProject(data[0].clientId)
          .subscribe(
            (data) => {
              this.projects = data;
              this.snaggingReportFrom.patchValue({ projectId: mData[0].projectId })
            })
        this.snaggingReportFrom.patchValue({ fromDate: new Date(data[0].fromDate).toISOString().substring(0, 10) })
        this.snaggingReportFrom.patchValue({ toDate: new Date(data[0].toDate).toISOString().substring(0, 10) })
        this.snaggingReportFrom.patchValue({ cycleId: data[0].cycleId })
      })
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

      this.clientServiceService.getContractorByProjectId(this.SelProjectId)
      .subscribe(data =>{
        this.contractors = data
      })
  }


  // getContractor() {
  //   // alert("called" + this.SelstructureId);
  //   this.commonService.getContractors(this.SelClientId, this.SelProjectId, this.SelstructureId, this.SelTradeId)
  //     .subscribe(
  //       (data) => {
  //         console.log('Contractor Data==', data)
  //         this.contractors = data;

  //       }, (err) => {
  //         console.log('-----> err', err);
  //       })

  // }

  get f() { return this.snaggingReportFrom.controls }

  onSubmit() {
    let tradeIds = this.snaggingReportFrom.value.tradeId
    let structureIds = this.snaggingReportFrom.value.structureId
    let contractors = this.snaggingReportFrom.value.clientRep

    delete this.snaggingReportFrom.value.tradeId
    delete this.snaggingReportFrom.value.structureId
    delete this.snaggingReportFrom.value.clientRep
    let data = {
      snapAudit: {...this.snaggingReportFrom.value, type: 1},
      snaggTrade: tradeIds,
      snaggclient: contractors,
      snaggStru: structureIds
    }
    console.log(data)

    if (this.snaggingReportId != -1) {
      this.commonService.updateSnaggingReport(data, this.snaggingReportId)
        .subscribe(data => console.log('snagging upadated-->', data))
    } else {
      this.commonService.createSnaggingReport(data)
        .subscribe(data => console.log('snagging added-->', data))
    }
  }

}
