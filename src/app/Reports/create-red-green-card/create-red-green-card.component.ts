import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { SubgroupData } from 'src/app/create-subgroup/create-subgroup.component';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ProjectData } from 'src/app/project/project.component';
import { StageData, StructureData } from 'src/app/wbs/wbs.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { CommonService } from 'src/app/common.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { clientStaffData } from 'src/app/create-client-staff/create-client-staff.component';

@Component({
  selector: 'app-create-red-green-card',
  templateUrl: './create-red-green-card.component.html',
  styleUrls: ['./create-red-green-card.component.css']
})
export class CreateRedGreenCardComponent implements OnInit {
  redGreenCardForm: FormGroup

  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  stages: StageData[] = []
  trades: TradeData[] = []
  subgroups: any


  SelClient: any
  SelProject: any
  SelStructure: any
  SelStage: any
  SelTrade: any
  SelSubgroup: any


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.redGreenCardForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      stageId: ['', Validators.required],
      tradeId: ['', Validators.required],
      subgroupId: ['', Validators.required],
      forType: ['', Validators.required],
      ToUser: ['', Validators.required],
      cardType: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
      reason: ['', Validators.required],

    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe(data => {
      // console.log('client projects-->', data)
      this.projects = data
    })
  }

  getStructures() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      console.log('structures..', data);
      this.structures = data
    })

    this.tradeService.getProjectTrades(this.SelProject).subscribe((data) => {
      console.log(data);
      this.trades = data
    })
  }

  getStages() {
    this.commonService.getStagesByStructureId(this.SelStructure).subscribe((data) => {
      console.log('stages..', data);
      this.stages = data
    })
  }


  getSubgroups() {
    this.tradeService.getSubgroupsByTrades(this.SelTrade).subscribe((data) => {
      console.log('subgroups..', data)
      this.subgroups = data
    })
  }







  onSubmit() {
    let formData = {
      redGreenCardData: {
        ...this.redGreenCardForm.value
      }
    }
    console.log(formData)
  }

}
