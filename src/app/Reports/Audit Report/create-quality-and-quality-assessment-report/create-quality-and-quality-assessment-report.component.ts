import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { Trade } from 'src/app/trade/trade.component';
import { StructureData } from 'src/app/wbs/wbs.component';

@Component({
  selector: 'app-create-quality-and-quality-assessment-report',
  templateUrl: './create-quality-and-quality-assessment-report.component.html',
  styleUrls: ['./create-quality-and-quality-assessment-report.component.css']
})
export class CreateQualityAndQualityAssessmentReportComponent implements OnInit {
  qualityAssessmentForm: FormGroup

  SelClient: any
  SelProject: any

  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  trades: TradeData[] = []

  addStructures = []
  addTrades = []

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
  ) { }

  ngOnInit() {
    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data
    })

    this.qualityAssessmentForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      coverage: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      transPage: ['', Validators.required],
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
      console.log(data)
    })


    this.tradeService.getProjectTrades(this.SelProject).subscribe((data) => {
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

  addStructure(e) {
    this.addCheckboxData('addStructures', e)
    console.log('structures', this.addStructures)
  }

  addTrade(e) {
    this.addCheckboxData('addTrades', e)
    console.log('trades', this.addTrades)
  }

  //addAll Checkbox
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
    this.addAllCheckboxData(this.addStructures, e, '.StructureCheckbox');
    console.log('structures..', this.addStructures);

  }
  addTradeAll(e) {
    this.addAllCheckboxData(this.addTrades, e, '.tradeCheckbox');
    console.log('trades..', this.addTrades);

  }




  onSubmit() {
    let formData = {
      qualityAssessmentData: {
        ...this.qualityAssessmentForm.value,
        structures: this.addStructures,
        trades: this.addTrades
      }
    }
    console.log(formData)
  }



}
