import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { Trade } from 'src/app/trade/trade.component';
import { StageData, StructureData } from 'src/app/wbs/wbs.component';

@Component({
  selector: 'app-create-audit-observation-report',
  templateUrl: './create-audit-observation-report.component.html',
  styleUrls: ['./create-audit-observation-report.component.css']
})
export class CreateAuditObservationReportComponent implements OnInit {
  registerForm: FormGroup

  SelClient: any
  SelProject: any
  SelStructure: any

  // currentStage: any

  addStructures = []
  addStages = []
  addTrades = []


  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  stages: StageData[] = []
  trades: Trade[] = []

  submitLoad: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private tradeService: TradeMaintanceService,
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data
    })

    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      clientRep: ['', Validators.required],
      cqraRep: ['', Validators.required],
      reportHeader: ['', Validators.required],
      otherPerson: ['', Validators.required],
      remark: ['', Validators.required],
    })
  }

  getProjects() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => {
      this.projects = data
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      this.structures = data
    })
  }

  showStages(structureId) {
    this.commonService.getStagesByStructureId(structureId).subscribe((data) => {
      this.stages = data
      console.log('stages...', this.stages)
    })
  }

  showTrades() {
    this.tradeService.getAllTrades().subscribe((data) => {
      this.trades = data
      console.log(data)
    })
  }


  addCheckboxData(arry, e) {
    let id = Number(e.target.value)
    if (e.target.checked) {
      let isExist = this[arry].find(item => {
        return id == item
      })
      if (!isExist) {
        this[arry].push(id)
      }
    } else {
      this[arry] = this[arry].filter(item => {
        return id != item
      })
    }
  }
  addStrucuture(e) {
    this.addCheckboxData('addStructures', e)
    console.log('structures', this.addStructures)
  }
  addstage(e) {
    this.addCheckboxData('addStages', e)
    console.log('stages', this.addStages)
  }
  addTrade(e) {
    this.addCheckboxData('addTrades', e)
    console.log('trades', this.addTrades)
  }


  //slectall checkbox
  addAllCheckboxData(arry: number[], e: Event, checkboxSelector: string) {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      $(checkboxSelector).prop('checked', true);
      const elements = document.querySelectorAll(checkboxSelector);
      arry.length = 0;
      elements.forEach(item => {
        const id = Number((item as HTMLInputElement).value);
        arry.push(id);
      });
    } else {
      $(checkboxSelector).prop('checked', false);
      arry.length = 0;
    }
  }

  addStructureAll(e) {
    this.addAllCheckboxData(this.addStructures, e, '.structureCheckbox');
    console.log('structures..', this.addStructures);
  }

  addStageAll(e) {
    this.addAllCheckboxData(this.addStages, e, '.stageCheckbox');
    console.log('stages..', this.addStages);
  }

  addTradeAll(e) {
    this.addAllCheckboxData(this.addTrades, e, '.tradeCheckbox');
    console.log('trades..', this.addTrades);
  }


  onSubmit() {
    let formData = {
      auditObservation: {
        ...this.registerForm.value,
        Structures: this.addStructures,
        Stages: this.addStages,
        Trades: this.addTrades,
      }
    }
    console.log(formData)
  }


}
