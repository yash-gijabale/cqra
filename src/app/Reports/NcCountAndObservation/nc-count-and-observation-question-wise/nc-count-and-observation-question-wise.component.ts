import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { ContractorData } from 'src/app/contractor-forman/contractor-forman.component';
import { clientStaffData } from 'src/app/create-client-staff/create-client-staff.component';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { Trade } from 'src/app/trade/trade.component';
import { StructureData } from 'src/app/wbs/wbs.component';

@Component({
  selector: 'app-nc-count-and-observation-question-wise',
  templateUrl: './nc-count-and-observation-question-wise.component.html',
  styleUrls: ['./nc-count-and-observation-question-wise.component.css']
})
export class NcCountAndObservationQuestionWiseComponent implements OnInit {

  ncCountAndObservatiobForm: FormGroup
  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  trades: Trade[] = []
  contractors: any = []
  clientStaffs: any = []


  SelClient: Number = 0
  SelProject: Number = 0
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients()
      .subscribe(data => {
        console.log(data)
        this.clients = data
      })

    this.ncCountAndObservatiobForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      approvedBy: ['', Validators.required],
      designation: ['', Validators.required],
      remark: ['', Validators.required],
    })
  }

  onSubmit() {

  }

  getProjects() {
    this.commonService.getClientProject(this.SelClient)
      .subscribe(data => {
        this.projects = data
      })
  }

  getStructure() {
    this.commonService.getStructures(this.SelClient, this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.structures = data
      })

    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

    this.clientService.getContractorByProjectId(this.SelProject).subscribe(data => this.contractors = data)
    this.clientService.getClientStaffByProjectId(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.clientStaffs = data
      })
  }

}
