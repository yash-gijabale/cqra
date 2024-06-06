import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';
import { StructureData } from 'src/app/wbs/wbs.component';
import { StageData } from 'src/app/wbs/wbs.component';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { CommonService } from 'src/app/common.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';

@Component({
  selector: 'app-annexure-for-observation-report',
  templateUrl: './annexure-for-observation-report.component.html',
  styleUrls: ['./annexure-for-observation-report.component.css']
})
export class AnnexureForObservationReportComponent implements OnInit {
  annexureForm: FormGroup

  SelClient: any
  SelProject: any
  SelStructure: any


  clients: ClientData[];
  projects: ProjectData[];
  structures: StructureData[];
  stages: StageData[];
  trades: TradeData[];


  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })




    this.annexureForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      authPerson: ['', Validators.required],
      designation: ['', Validators.required],
      note: ['', Validators.required],

    })

  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe(data => {
      // console.log('client projects-->', data)
      this.projects = data
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      console.log(data);
      this.structures = data
    })

    this.tradeService.getProjectTrades(this.SelProject).subscribe((data) => {
      console.log(data);
      this.trades = data
    })
  }

  getStages() {
    this.commonService.getStagesByStructureId(this.SelStructure).subscribe((data) => {
      console.log(data);
      this.stages = data
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

  addStages = []
  addStage(e) {
    this.addCheckboxData('addStages', e)
    console.log('stages', this.addStages)
  }

  addTrades = []
  addTrade(e) {
    this.addCheckboxData('addTrades', e)
    console.log('trades', this.addTrades)
  }

  onSubmit() {
    let formData = {
      inspectReport: {
        ...this.annexureForm.value,
        stages: this.addStages,
        trades: this.addTrades
      }
    }
    console.log(formData)

  }
}
