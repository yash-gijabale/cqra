import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { StageData, StructureData } from 'src/app/wbs/wbs.component';

@Component({
  selector: 'app-edit-goodwork-practices',
  templateUrl: './edit-goodwork-practices.component.html',
  styleUrls: ['./edit-goodwork-practices.component.css']
})
export class EditGoodworkPracticesComponent implements OnInit {
  goodworkForm: FormGroup

  addquestions = []

  SelClient: any
  SelProject: any
  SelStructure: any
  SelStage: any
  SelTrade: any
  SelSubgroup: any
  SelQuestionGroup: any

  addquuestions: any

  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  subgroups: any
  questiongroups: any
  questions: any
  stages: StageData[] = []
  trades: TradeData[] = []
  // questiongroups: any;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data

    })

    this.goodworkForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      stageId: ['', Validators.required],
      tradeId: ['', Validators.required],
      subgroupId: ['', Validators.required],
      questiongroupId: ['', Validators.required],
      reportFrom: ['', Validators.required],
      reportTo: ['', Validators.required],
    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => {
      this.projects = data
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      console.log(data);
      this.structures = data
    })

  }

  getStage() {
    this.commonService.getStagesByStructureId(this.SelStructure).subscribe((data) => {
      console.log(data);
      this.stages = data
    })
  }

  getTrade() {
    this.tradeService.getProjectTrades(this.SelProject).subscribe((data) => {
      console.log(data);
      this.trades = data
    })

  }

  getSubgroup() {
    this.tradeService.getSubgroupsByTrades(this.SelTrade).subscribe((data) => {
      this.subgroups = data
    })

  }

  getQuestionGroup() {
    this.tradeService.getQuestiongroupBySubgroup(this.SelSubgroup).subscribe((data) => {
      console.log(data)
      this.questiongroups = data
    })
  }

  getQuestions() {
    this.tradeService.getAllQuestions().subscribe((data) => {
      console.log(data)
      this.questions = data
    })
  }

  addCheckboxData(arry, e) {
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

  addquestion(e) {
    this.addCheckboxData('addquestions', e)
    console.log('quetions...', this.addquestions)
  }

  onSubmit() {
    let formData = {
      editGoodwork: {
        ...this.goodworkForm.value,
        questions: this.addquestions
      }
    }
    console.log(formData)
  }


}
