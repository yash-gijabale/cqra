import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
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

    let formData = {
      ...this.ncCountAndObservatiobForm.value,
      structures:this.structureList,
      trades: this.tradeList,
      contractors: this.personList,
      clientStaff: this.staffList
    }

    console.log(formData)

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

  structureList = []
  addStructure(e) {
    this.handleCheckboxAdd('structureList', e)
    console.log(this.structureList)
  }

  tradeList = []
  addTrade(e) {
    this.handleCheckboxAdd('tradeList', e)
    console.log(this.tradeList)
  }

  personList = []
  addPerson(e) {
    this.handleCheckboxAdd('personList', e)
    console.log(this.personList)
  }

  staffList = []
  addStaff(e){
    this.handleCheckboxAdd('staffList', e)
    console.log(this.staffList)
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

  
  selectAllStrucutre(e) {
    this.handelAllSelectCheckbox('structureCheckbox', 'structureList', e)
    console.log(this.structureList)
  }

  selectAllTrade(e) {
    this.handelAllSelectCheckbox('tradeCheckbox', 'tradeList', e)
    console.log(this.tradeList)
  }

  selectAllPerson(e){
    this.handelAllSelectCheckbox('personCheckbox', 'personList', e)
    console.log(this.personList)
  }

  selectAllStaff(e){
    this.handelAllSelectCheckbox('staffCheckbox', 'staffList', e)
    console.log(this.staffList)
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
