import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { CommonService } from 'src/app/common.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';


@Component({
  selector: 'app-create-quality-procedure-amendment-report',
  templateUrl: './create-quality-procedure-amendment-report.component.html',
  styleUrls: ['./create-quality-procedure-amendment-report.component.css']
})
export class CreateQualityProcedureAmendmentReportComponent implements OnInit {
  qualityProcedureForm: FormGroup


  clients: ClientData[];
  projects: ProjectData[];
  trades: TradeData[];

  SelClientId: string = '0'
  SelProjectId: string = '0'
  SelTradeId: string = '0'


  SelClient: any
  SelProject: any
  SelTrade: any

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

    this.qualityProcedureForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      tradeId: ['', Validators.required],
      clientRepre: ['', Validators.required],
      cqraRepre: ['', Validators.required],
      standard_procedure: ['', Validators.required],
      amendment: ['', Validators.required],

    })


  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe(data => {
      // console.log('client projects-->', data)
      this.projects = data
    })
  }

  getTrade() {
    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      });


  }


  rowwCount = 1
  addNewRow() {
    this.rowwCount++
    let filed = ` <tr id="myrow"${this.rowwCount}>
    <td>${this.rowwCount}</td>
    <td><input type="text" class="standard_procedure form-control" id='standard_procedure${this.rowwCount}'></td>
    <td><input type="text" id="amendment1" class="form-control" id='amendment1${this.rowwCount}'></td>
  </tr>`

    let areaFiled = <HTMLTableElement>document.querySelector('#tableBody')
    // console.log(areaFiled)
    areaFiled.insertAdjacentHTML('beforeend', filed)

  }






  onSubmit() {
    let formData = { ...this.qualityProcedureForm.value }
    console.log(formData)

  }

}
