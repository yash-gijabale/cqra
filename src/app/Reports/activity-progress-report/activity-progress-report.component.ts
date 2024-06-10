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
  selector: 'app-activity-progress-report',
  templateUrl: './activity-progress-report.component.html',
  styleUrls: ['./activity-progress-report.component.css']
})
export class ActivityProgressReportComponent implements OnInit {

  activityProgressForm: FormGroup

  SelClient: any
  SelProject: any
  SelStructure: any


  clients: ClientData[] = [];
  projects: ProjectData[] = [];
  structures: StructureData[] = [];
  stages: StageData[] = [];
  trades: TradeData[] = [];


  addStages: number[] = [];
  addTrades: number[] = [];

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

    this.activityProgressForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      reportFrom: ['', Validators.required],
      reportTo: ['', Validators.required],
      approvedBy: ['', Validators.required],
      designation: ['', Validators.required],
      reportHeader: ['', Validators.required],
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


  addStage(e) {
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
      activityProgressReport: {
        ...this.activityProgressForm.value,
        stages: this.addStages,
        trades: this.addTrades
      }
    }
    console.log(formData)

  }

}
