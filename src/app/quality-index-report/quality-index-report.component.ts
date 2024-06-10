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
  trades: Trade[] = []
  // clientStaff: clientStaffData[]
  contractors:any = []
  qualityIndexId: number
  stages: Array<any> = []

  currentDate = new Date().toISOString().substring(0,10)

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
      // tradeId: ['', Validators.required],
      // reviewBy: ['', Validators.required],
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

  getStages(e) {
    let id = Number(e.target.value)
    this.commonService.getStages(this.SelClient, this.SelProject, id)
      .subscribe(data => {
        this.stages = data

      })
  }

  onSubmit() {
    console.log(this.qualityIndexForm.value)
    let formData = {
      ...this.qualityIndexForm.value,
      tradeId: this.addTrades.toString(),
      reviewBy: this.addPersons.toString(),
      // stages: this.addStages.toString()
    }
    console.log(formData)
    // return
    // tradeId: ['', Validators.required],
      // reviewBy: ['', Validators.required],
    if (this.qualityIndexId != -1) {
      this.commonService.updateQualityINdexReport(formData, this.qualityIndexId)
        .subscribe(data => {
          console.log('report updated-->', data)
        },
          err => console.log(err))
    } else {
      this.commonService.createQualityIndexReport(formData)
        .subscribe(data => {
          console.log('report created', data)
        },
          err => console.log(err)
        )
    }
  }

  addStages = []
  addStage(e) {
    this.handleCheckboxAdd('addStages', e)
    console.log(this.addStages)
  }

  addTrades = []
  addTrade(e) {
    this.handleCheckboxAdd('addTrades', e)
    console.log(this.addTrades)
  }

  addPersons = []
  addPerson(e) {
    this.handleCheckboxAdd('addPersons', e)
    console.log(this.addPersons)
  }


  handleCheckboxAdd(arry, e) {
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


  selectAllStages(e) {
    this.handelAllSelectCheckbox('stageCheckbox', 'addStages', e)
    console.log(this.addStages)
  }

  selectAllTrade(e) {
    this.handelAllSelectCheckbox('tradeCheckbox', 'addTrades', e)
    console.log(this.addTrades)
  }

  selectAllPerson(e){
    this.handelAllSelectCheckbox('personCheckbox', 'addPersons', e)
    console.log(this.addPersons)
  }
  handelAllSelectCheckbox(className, arry, e) {
    if (e.target.checked) {
      let inputArray = Array.from(document.getElementsByClassName(`${className}`))
      console.log(inputArray)
      this[arry] = []
      inputArray.forEach(item => {
        let a = item as HTMLInputElement
        this[arry].push(Number(a.value))

      });

      $(`.${className}`).prop('checked', true)
    } else {
      this[arry] = []
      $(`.${className}`).prop('checked', false)
    }

  }
}
