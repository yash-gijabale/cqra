import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ProjectData } from '../project/project.component';
import { StructureData } from '../wbs/wbs.component';
import { StageData } from '../wbs/wbs.component';
import { TradeData } from '../create-tarde/create-tarde.component';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';
import { TradeMaintanceService } from '../trade-maintance.service';

@Component({
  selector: 'app-quality-update-report',
  templateUrl: './quality-update-report.component.html',
  styleUrls: ['./quality-update-report.component.css']
})
export class QualityUpdateReportComponent implements OnInit {
  qualityUpdateForm: FormGroup;

  clients: ClientData[];
  projects: ProjectData[];
  structures: StructureData[];
  stages: StageData[];
  trades: TradeData[];


  SelClient: any
  SelProject: any
  SelStructure: any

  // SelClient: string = "0";
  // SelProject: string = "0";
  // SelStructure: string = "0";
  // SelStage: string = "0";
  // submitted = false;
  // SelUser: string = "0";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })



    this.qualityUpdateForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      reportFrom: ['', Validators.required],
      reportTo: ['', Validators.required],
      approvedBy: ['', Validators.required],
      designation: ['', Validators.required],
      note: ['', Validators.required],
      reportHeader: ['', Validators.required],
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


  //select all
  addStageAll(e) {

  }

  addTradeAll(e) {

  }


  get f() { return this.qualityUpdateForm.controls; }

  onSubmit() {
    let formData = {
      qualityUpdateReport: {
        ...this.qualityUpdateForm.value,
        stages: this.addStages,
        trades: this.addTrades
      }
    }
    console.log(formData)
  }

}
