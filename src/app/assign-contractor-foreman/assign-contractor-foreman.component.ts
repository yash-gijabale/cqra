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
import { FormanData } from '../contractor-forman/contractor-forman.component';

export class AssignForeman {
  constructor(
    public schemeId: Number,
    public structureId: Number,
    public contractorId: Number,
    public foremanId: Number,
    public tradeId: number,
    public stageId: number,
  ) { }
}

@Component({
  selector: 'app-assign-contractor-foreman',
  templateUrl: './assign-contractor-foreman.component.html',
  styleUrls: ['./assign-contractor-foreman.component.css']
})
export class AssignContractorForemanComponent implements OnInit {
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
  formans: FormanData

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
      contractorId: ['', Validators.required],
      foremanId: ['', Validators.required],
      tradeId: ['', Validators.required],
      stageId: ['', Validators.required]
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

  getForeman() {
    this.clientService.getForemanByContractorId(this.SelContractor)
      .subscribe(data => {
        console.log(data)
        this.formans = data
      })
  }

  onSubmit() {

    let tradeIds = this.registerForm.value.tradeId
    let stageId = this.registerForm.value.stageId
    let finalArrayData = []
    tradeIds.forEach((tradeId) => {
      stageId.forEach((stageId) => {
        let data = {
          schemeId: this.registerForm.value.schemeId,
          structureId: this.registerForm.value.structureId,
          contractorId: this.registerForm.value.contractorId,
          foremanId: this.registerForm.value.foremanId,
          tradeId,
          stageId
        }

        finalArrayData.push(data)
      })
    })

    console.log(finalArrayData)
    this.clientService.assignContractorForeman(finalArrayData)
      .subscribe(data => console.log('assisned foreman-->', data),
        err => console.log(err))
  }

}

