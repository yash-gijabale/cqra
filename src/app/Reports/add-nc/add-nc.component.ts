import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ProjectData } from 'src/app/project/project.component';
import { TradeGroup } from 'src/app/trade-group/trade-group.component';
import { StructureData } from 'src/app/wbs/wbs.component';
import { ClientData } from 'src/app/client/client.component';
import { Trade } from 'src/app/trade/trade.component';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';

@Component({
  selector: 'app-add-nc',
  templateUrl: './add-nc.component.html',
  styleUrls: ['./add-nc.component.css']
})
export class AddNcComponent implements OnInit {
  addNcForm: FormGroup


  SelProject: any
  SelStructure: any


  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  trades: Trade[] = []

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {

    this.commonService.getAllProject().subscribe((data) => {
      this.projects = data
    })

    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data
    })

    this.addNcForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      tradeId: ['', Validators.required],
      ncText: ['', Validators.required],
      location: ['', Validators.required],
      remark: ['', Validators.required],
      severity: ['', Validators.required],
      ncAddressTo: ['', Validators.required],
      impactOnQuality: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      this.structures = data
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
      addNc: {
        ...this.addNcForm.value
      }
    }
    console.log(formData)
  }

}
