import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { CommonService } from 'src/app/common.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';

@Component({
  selector: 'app-quality-inspection-parameters-report',
  templateUrl: './quality-inspection-parameters-report.component.html',
  styleUrls: ['./quality-inspection-parameters-report.component.css']
})
export class QualityInspectionParametersReportComponent implements OnInit {
  qualityInspectionForm: FormGroup;
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
    private snackBar: SnackBarComponent

  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.qualityInspectionForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      tradeId: ['', Validators.required],
      clientRepre: ['', Validators.required],
      cqraRepre: ['', Validators.required],
    })


  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe(data => {
      console.log('client projects-->', data)
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

  load: boolean = false
  url: String = ''
  onSubmit() {
    this.load = true
    let formdata = this.qualityInspectionForm.value
    console.log(formdata)
    this.commonService.downloadQualityInspectionParameter(this.SelProject, this.SelClient, formdata.tradeId, formdata.clientRepre, formdata.cqraRepre)
      .subscribe(data => {
        console.log(data)
        this.load = false
        this.url = data.url
      },err =>{
        this.load = false
        this.snackBar.showSnackError()
      })
  }

}
