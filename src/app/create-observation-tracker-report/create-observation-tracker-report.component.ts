import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { ClientData } from '../client/client.component';
import { StageData, StructureData } from '../wbs/wbs.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';
import { ContractorData } from '../contractor-forman/contractor-forman.component';
import { SupervisorData } from '../contractor-supervisor/contractor-supervisor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionReport } from '../creaate-inspectionreport/creaate-inspectionreport.component';



export class otrReportData {
  constructor(
    public observationtracker: InspectionReport,
    public trade: Array<Number>,
    public stages: Array<Number>
  ) {

  }
}
@Component({
  selector: 'app-create-observation-tracker-report',
  templateUrl: './create-observation-tracker-report.component.html',
  styleUrls: ['./create-observation-tracker-report.component.css']
})
export class CreateObservationTrackerReportComponent implements OnInit {

  registerForm: FormGroup;
  SelProject: any;
  SelStructure: any;
  SelClient: any;
  SelContractor: any
  projects: ProjectData[];
  submitted: boolean
  structures: StructureData[]
  stages: StageData[]
  clients: ClientData[]
  trades: Trade
  contractors: ContractorData[]
  supervisors: SupervisorData
  otrId: Number
  typeId: Number
  constructor(
    private commonServices: CommonService,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.submitted = true;
    this.otrId = this.route.snapshot.params['id']
    this.typeId = this.route.snapshot.params['type']
    this.clientService.getAllClients()
      .subscribe(data => this.clients = data)

    // this.commonServices.getAllContractors()
    //   .subscribe(data => {
    //     console.log('contractor', data)
    //     this.contractors = data
    //   })

    if (this.otrId != -1) {
      this.commonServices.getOTRReport(this.otrId)
        .subscribe(data => {
          console.log(data)
          // let retriveData = data
          this.commonServices.getClientProject(data.observationtracker.clientId).subscribe(data => this.projects = data)
          this.commonServices.getStructures(data.observationtracker.clientId, data.observationtracker.projectId).subscribe(data => this.structures = data)
          this.tradeService.getProjectTrades(data.observationtracker.projectId).subscribe(data => this.trades = data)
          this.commonServices.getStages(data.observationtracker.clientId, data.observationtracker.projectId, data.observationtracker.structureId).subscribe(data => this.stages = data)

          this.registerForm.patchValue(data.observationtracker)
          this.registerForm.patchValue({ obstraTrade: data.trade })
          this.registerForm.patchValue({ obstraStage: data.stages })
          this.registerForm.patchValue({ fromDate: new Date(data.observationtracker.fromDate).toISOString().substring(0,10) })
          this.registerForm.patchValue({ toDate: new Date(data.observationtracker.toDate).toISOString().substring(0,10) })
        })

    }

    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      obstraTrade: ['', Validators.required],
      obstraStage: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      clientRep: ['', Validators.required],
      cqraRep: ['', Validators.required],
      reportHeader: ['', Validators.required],
      otherPerson: ['', Validators.required],
      reportName: ['', Validators.required]
    })
  }


  getProjects() {
    console.log(this.SelClient)
    this.commonServices.getClientProject(this.SelClient).subscribe(data => this.projects = data)
  }
  getStructure() {
    this.commonServices.getStructures(this.SelClient, this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.structures = data
      })

    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

  }
  getStages() {
    this.commonServices.getStages(this.SelClient, this.SelProject, this.SelStructure)
      .subscribe(data => {
        console.log(data)
        this.stages = data
      })
  }

  get f() { return this.registerForm.controls }

  submitLoad: boolean = false
  onSubmit() {
    this.submitLoad = true
    let formData = {
      inspectReport: { ...this.registerForm.value, type: this.typeId },
      obstraTrade: this.registerForm.value.obstraTrade,
      obstraStage: this.registerForm.value.obstraStage
    }

    console.log(formData)

    if (this.otrId != -1) {
      this.commonServices.updateOtr(formData, this.otrId)
        .subscribe(data => {
          console.log('updated', data)
          this.submitLoad = false
        }, err => {
          this.submitLoad = false

        })

    } else {

      this.commonServices.createObservationTrackerReport(formData)
        .subscribe(
          data => {
            console.log(data)
            this.submitLoad = false

          },
          err => {
            this.submitLoad = false

          })
    }
  }

  edit(id) {
    this.router.navigate(['createOTR', id])
  }
}
