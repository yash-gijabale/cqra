import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { StageData, StructureData } from 'src/app/wbs/wbs.component';

@Component({
  selector: 'app-create-method-statement',
  templateUrl: './create-method-statement.component.html',
  styleUrls: ['./create-method-statement.component.css']
})
export class CreateMethodStatementComponent implements OnInit {
  mathodStatementForm: FormGroup


  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  stages: StageData[] = []
  trades: TradeData[] = []

  SelClient: any
  SelProject: any
  SelStructure: any
  SelStage: any
  SelTrade: any
  // SelClient:any

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private tradeService: TradeMaintanceService,
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      console.log(data)
      this.clients = data
    })

    this.mathodStatementForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      stageId: ['', Validators.required],
      tradeId: ['', Validators.required],
      contractor: ['', Validators.required],
      criticalActivity: ['', Validators.required],
      majorDifficulties: ['', Validators.required],
      methodStatement: ['', Validators.required],
      additionalResource: ['', Validators.required],
      clientRepres: ['', Validators.required],
      contractorRepres: ['', Validators.required],
      cqraRepres: ['', Validators.required],
    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => {
      this.projects = data
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      this.structures = data
    })
  }

  getStages() {
    this.commonService.getStagesByStructureId(this.SelStructure).subscribe((data) => {
      this.stages = data
    })
  }

  getTrades() {
    this.tradeService.getProjectTrades(this.SelProject).subscribe((data) => {
      // console.log(data);
      this.trades = data
    })
  }



  onSubmit() {
    let formData = {
      mathodStatementData: {
        ...this.mathodStatementForm.value
      }
    }
    console.log(formData)
  }




}
