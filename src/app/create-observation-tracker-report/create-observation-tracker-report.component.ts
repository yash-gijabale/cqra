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
  constructor(
    private commonServices: CommonService,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {
    this.submitted = true;
    this.clientService.getAllClients()
      .subscribe(data => this.clients = data)

    this.commonServices.getAllContractors()
      .subscribe(data => {
        console.log('contractor', data)
        this.contractors = data
      })

    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      schemeId: ['', Validators.required],
      structureId: ['', Validators.required],
      tradeId: ['', Validators.required],
      stageId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      clientRep: ['', Validators.required],
      cqraRep: ['', Validators.required],
      reportHeader: ['', Validators.required],
      othPerson: ['', Validators.required],
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

  onSubmit() {
    console.log(this.registerForm.value)
  }
}
