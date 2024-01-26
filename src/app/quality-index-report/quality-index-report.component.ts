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

export class QualityIndexReport {
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
    public reviewDesign: string,
    public reportHeader: string,
  ) { }
}

@Component({
  selector: 'app-quality-index-report',
  templateUrl: './quality-index-report.component.html',
  styleUrls: ['./quality-index-report.component.css']
})
export class QualityIndexReportComponent implements OnInit {
  SelProject: any;
  SelStructure: any;
  SelClient: any;
  projects: ProjectData[];
  structures: StructureData[]
  qualityIndexForm: FormGroup
  clients: ClientData[]
  trades: Trade
  // clientStaff: clientStaffData[]
  contractors: ContractorData
  qualityIndexId: number
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.qualityIndexId = this.route.snapshot.params['id']
    if (this.qualityIndexId != -1) {
      let Retrivedata;
      this.commonService.retriveQualityIndexReport(this.qualityIndexId)
        .pipe(first())
        .subscribe(data => {
          Retrivedata = data
          console.log(data)
          this.commonService.getClientProject(Retrivedata.clientId).subscribe(data => this.projects = data)
          this.commonService.getStructures(Retrivedata.clientId, Retrivedata.projectId).subscribe(data => { this.structures = data })
          this.tradeService.getProjectTrades(Retrivedata.projectId).subscribe(data => { this.trades = data })
          this.clientService.getContractorByProjectId(Retrivedata.projectId).subscribe(data => this.contractors = data)

          this.qualityIndexForm.patchValue(data)
        })
    }

    this.clientService.getAllClients()
      .subscribe(data => this.clients = data)

    // this.clientService.getAllClientStaff()
    //   .subscribe(data => this.clientStaff = data)

    // this.commonService.getAllContractors()
    //   .subscribe(data => this.contractors = data)

    this.qualityIndexForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      tradeId: ['', Validators.required],
      reviewBy: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      approveDesign: ['', Validators.required],
      reviewDesign: ['', Validators.required],
      reportHeader: ['', Validators.required],
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

    // this.clientService.getClientStaffByProjectId(this.SelProject).subscribe(data => this.clientStaff = data)
  }

  onSubmit() {
    console.log(this.qualityIndexForm.value)
    if (this.qualityIndexId != -1) {
      this.commonService.updateQualityINdexReport(this.qualityIndexForm.value, this.qualityIndexId)
        .subscribe(data => {
          console.log('report updated-->', data)
        },
          err => console.log(err))
    } else {
      this.commonService.createQualityIndexReport(this.qualityIndexForm.value)
        .subscribe(data => {
          console.log('report created', data)
        },
          err => console.log(err)
        )
    }
  }
}
