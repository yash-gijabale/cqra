import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { ClientData } from '../client/client.component';
import { StageData, StructureData } from '../wbs/wbs.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';
import { SubgroupView } from '../subgroup/subgroup.component';
import { CheckListView } from '../edit-non-conf/edit-non-conf.component';


export class RFIForm {
  constructor(
    public client: Number,
    public project: Number,
    public workType: Number,
    public structure: Number,
    public stage: Number,
    public unit: Number,
    public subUnit: Number,
    public element: Number,
    public subElement: Number,
    public checkList: Number,
    public groupColumn: Number,
    public coverage: String,
    public drawingNo: String,
    public tradeId: Number
  ) {

  }
}

@Component({
  selector: 'app-create-rfi',
  templateUrl: './create-rfi.component.html',
  styleUrls: ['./create-rfi.component.css']
})
export class CreateRfiComponent implements OnInit {

  SelClient: Number
  SelProject: Number
  SelStructure: Number
  Seltrade: Number
  SelSubgroup: Number

  isbtnLoading = false

  rfiFrom: FormGroup
  projects: ProjectData[]
  clients: ClientData[]
  structures: StructureData[]
  stages: StageData[]
  trades: Trade
  subgroups: SubgroupView
  checklists: CheckListView

  rfiId: Number

  constructor(
    private commanService: CommonService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {
    this.clientService.getAllClients().subscribe(data => this.clients = data)

    this.rfiId = this.route.snapshot.params['id']

    this.commanService.retriveRFI(this.rfiId)
      .subscribe(data => {
        console.log(data)
        this.commanService.getClientProject(data.client).subscribe(data => this.projects = data)
        this.commanService.getStructures(data.client, data.project).subscribe(data => this.structures = data)

        this.tradeService.getProjectTradesScheme(data.project).subscribe(data => { this.trades = data })

        this.commanService.getStages(data.client, data.project, data.structure).subscribe(data => this.stages = data)

        this.tradeService.getSubgroupsByTrades(data.tradeId).subscribe(data => this.subgroups = data )

        this.tradeService.getChecklistBySubgroupId(data.groupColumn).subscribe(data => this.checklists = data)

        this.rfiFrom.patchValue(data)
      })

    this.rfiFrom = this.formBuilder.group({
      client: ['', Validators.required],
      project: ['', Validators.required],
      workType: ['', Validators.required],
      structure: ['', Validators.required],
      stage: ['', Validators.required],
      unit: ['', Validators.nullValidator],
      subUnit: ['', Validators.nullValidator],
      element: ['', Validators.nullValidator],
      subElement: ['', Validators.nullValidator],
      checkList: ['', Validators.required],
      groupColumn: ['', Validators.required],
      coverage: ['', Validators.required],
      drawingNo: ['', Validators.required],
      tradeId: ['', Validators.required]

    })

  }

  get f() {
    return this.rfiFrom.controls
  }

  getProjects() {
    console.log(this.SelClient)
    this.commanService.getClientProject(this.SelClient).subscribe(data => this.projects = data)
  }

  getStructure() {
    this.commanService.getStructures(this.SelClient, this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.structures = data
      })

    this.tradeService.getProjectTradesScheme(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

  }

  getStages() {
    this.commanService.getStages(this.SelClient, this.SelProject, this.SelStructure)
      .subscribe(data => {
        console.log(data)
        this.stages = data
      })
  }

  getSubgroups() {
    this.tradeService.getSubgroupsByTrades(this.Seltrade)
      .subscribe(data => {
        console.log(data)
        this.subgroups = data
      })
  }

  getCheckList() {
    this.tradeService.getChecklistBySubgroupId(this.SelSubgroup)
      .subscribe(data => {
        console.log(data)
        this.checklists = data
      })
  }


  onSubmit() {
    console.log(this.rfiFrom.value)
    this.commanService.createRFI(this.rfiFrom.value)
      .subscribe(data => {
        console.log(data)
      })
  }
}
