import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { ClientServiceService } from '../service/client-service.service';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ClientData } from '../client/client.component';
import { ProjectData } from '../project/project.component';
import { StructureData } from '../wbs/wbs.component';
import { Trade } from '../trade/trade.component';
import { clientStaffData } from '../create-client-staff/create-client-staff.component';
import { ContractorData } from '../contractor-forman/contractor-forman.component';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

export class NcCountReportData {
  constructor(
    public clientId: number,
    public projectId: number,
    public structureId: number,
    public tradeId: number,
    public reviewBy: number,
    public approveBy: number,
    public dateFrom: string,
    public dateTo: string,
    public approveDesign: string,
    public remark: string,
  ) { }
}

@Component({
  selector: 'app-nc-count-report',
  templateUrl: './nc-count-report.component.html',
  styleUrls: ['./nc-count-report.component.css']
})
export class NcCountReportComponent implements OnInit {
  SelProject: any;
  SelStructure: any;
  SelClient: any;
  projects: ProjectData[];
  structures: StructureData[]
  ncCountForm: FormGroup
  clients: ClientData[]
  trades: Trade
  clientStaff: clientStaffData
  contractors: ContractorData
  ncCountID: number
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ncCountID = this.route.snapshot.params['id']
    if (this.ncCountID != -1) {
      let Retrivedata;
      this.commonService.retirveNcCountReport(this.ncCountID)
        .pipe(first())
        .subscribe(data => {
          Retrivedata = data
          console.log(data)
          this.commonService.getClientProject(Retrivedata.clientId).subscribe(data => this.projects = data)
          this.commonService.getStructures(Retrivedata.clientId, Retrivedata.projectId).subscribe(data => { this.structures = data })
          this.tradeService.getProjectTrades(Retrivedata.projectId).subscribe(data => { this.trades = data })
          this.clientService.getContractorByProjectId(Retrivedata.projectId).subscribe(data => this.contractors = data)
          this.clientService.getClientStaffByProjectId(Retrivedata.projectId).subscribe(data => this.clientStaff = data)
          this.ncCountForm.patchValue(data)
        })
    }

    this.clientService.getAllClients()
      .subscribe(data => this.clients = data)


    this.ncCountForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      tradeId: ['', Validators.required],
      reviewBy: ['', Validators.required],
      approveBy: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      approveDesign: ['', Validators.required],
      remark: ['', Validators.required],
    })

  }



  getProjects() {
    console.log(this.SelClient)
    this.commonService.getClientProject(this.SelClient).subscribe(data => this.projects = data)
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

    this.clientService.getClientStaffByProjectId(this.SelProject).subscribe(data => this.clientStaff = data)
  }

  onSubmit() {
    console.log(this.ncCountForm.value)
    if (this.ncCountID != -1) {
      this.commonService.updateNcCountReport(this.ncCountForm.value, this.ncCountID)
        .subscribe(data => {
          console.log('report updated-->', data)
        },
          err => console.log(err))
    } else {

      this.commonService.createNcCountReport(this.ncCountForm.value)
        .subscribe(data => {
          console.log('report created', data)
        },
          err => console.log(err)
        )
    }
  }
}
