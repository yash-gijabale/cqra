import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { StructureData } from 'src/app/wbs/wbs.component';

@Component({
  selector: 'app-create-inspection-survey-report',
  templateUrl: './create-inspection-survey-report.component.html',
  styleUrls: ['./create-inspection-survey-report.component.css']
})
export class CreateInspectionSurveyReportComponent implements OnInit {
  inspectionSurveyForm: FormGroup

  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  trades: any

  SelClient: any
  SelProject: any
  SelStructure: any

  addTrades = []

  constructor(
    private formbuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService

  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data
    })

    this.inspectionSurveyForm = this.formbuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      plannedDate: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reportHeader: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
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

  getTrade() {
    this.tradeService.getAllTrades().subscribe((data) => {
      console.log(data)
      this.trades = data
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

  addTrade(e) {
    this.addCheckboxData('addTrades', e)
    console.log('trades', this.addTrades)
  }

  onSubmit() {
    let formData = {
      inspectionSurvey: {
        ...this.inspectionSurveyForm.value,
        trades: this.addTrades
      }
    }
    console.log(formData)
  }

}
