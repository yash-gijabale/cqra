import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';
import { supportsScrollBehavior } from '@angular/cdk/platform';
import { SubgroupView } from '../subgroup/subgroup.component';
import { CheckListView } from '../edit-non-conf/edit-non-conf.component';
import { ClientServiceService } from '../service/client-service.service';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';

export class allocatedChecklistData {
  constructor(
    public pkTradeId: Number,
    public pkSubgroupId: number,
    public checklistId: number,
    public schemeId: number

  ) { }
}
@Component({
  selector: 'app-project-checklist-allocation',
  templateUrl: './project-checklist-allocation.component.html',
  styleUrls: ['./project-checklist-allocation.component.css']
})
export class ProjectChecklistAllocationComponent implements OnInit {

  configureForm: FormGroup
  projectId: number
  trades: Trade
  SelTrade: String = '0'
  SelSubgroup: any
  subgroups: SubgroupView
  checklists: CheckListView
  submitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id']
    this.configureForm = this.formBuilder.group({
      pkTradeId: ['', Validators.required],
      pkSubgroupId: ['', Validators.required],
      checklistId: ['', Validators.required],
    })

    this.tradeService.getProjectTrades(this.projectId)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

  }

  get f() { return this.configureForm.controls; }


  getSubgroups() {
    console.log(this.SelTrade)
    this.tradeService.getSubgroupsByTrades(this.SelTrade)
      .subscribe(data => {
        console.log(data)
        this.subgroups = data
      })
  }

  getChecklist() {
    this.tradeService.getChecklistBySubgroupId(this.SelSubgroup)
      .subscribe(data => {
        console.log(data)
        this.checklists = data
      })
    this.tradeService.getAllocatedChecklist(this.projectId, this.SelTrade, this.SelSubgroup)
      .subscribe(data => {
        let allocatedData = data
        let allocatedChecklist = []
        allocatedData.forEach(item => {
          allocatedChecklist.push(item.checklistId)
        })
        this.preChecklistData(data)
        this.configureForm.patchValue({ checklistId: allocatedChecklist })
        console.log('---->', data, allocatedChecklist)

      })
  }


  preChecklistData(data) {
    let generedData = {}
    let a = {
      target: {
        checked: true
      }
    }

    this.questionData = {}
    data.forEach(item => {
      this.addQuestion(a, item.checklistId, item.pkQuestionGroupId, item.pkQuestionId)
    })

    // this.configureData = generedData

  }
  configLoad: boolean = false
  onSubmit() {
    // this.questionData = {}
    let checklistIds = this.configureForm.value.checklistId
    let finalArray = checklistIds.map((id) => {
      return {
        ...this.configureForm.value,
        checklistId: id,
        schemeId: this.projectId
      }
    })

    // console.log(finalArray)
    this.configLoad = true
    this.clientService.getChecklistQuestions(this.configureForm.value.pkTradeId, this.configureForm.value.pkSubgroupId, { 'intlist': checklistIds })
      .subscribe(data => {
        console.log(data)
        this.generatDataForConfigure(data)
        this.configLoad = false
      })

  }

  configureData = {}
  checklistName = {}
  questionGroupName = {}
  generatDataForConfigure(data) {
    let generedData = {}
    data.forEach(item => {
      if (generedData[item.checklistId]) {
        if (generedData[item.checklistId][item.questionGroup]) {
          generedData[item.checklistId][item.questionGroup]['data'].push(item)
        } else {
          generedData[item.checklistId][item.questionGroup] = {}
          generedData[item.checklistId][item.questionGroup]['data'] = []
          generedData[item.checklistId][item.questionGroup]['data'].push(item)
        }
      } else {
        generedData[item.checklistId] = {}
        generedData[item.checklistId][item.questionGroup] = {}
        generedData[item.checklistId][item.questionGroup]['data'] = []
        generedData[item.checklistId][item.questionGroup]['data'].push(item)
      }
    })

    data.forEach(d => {
      if (!this.checklistName[d.checklistId]) {
        this.checklistName[d.checklistId] = d.checklistname
      }
    })

    data.forEach(d => {
      if (!this.questionGroupName[d.questionGroup]) {
        this.questionGroupName[d.questionGroup] = d.questionGroupname
      }
    })


    console.log(generedData)
    console.log(this.questionGroupName)
    console.log(this.checklistName)
    this.configureData = generedData
  }

  questionData = {}
  addQuestion(e, checkListId, qgId, qId) {
    if (e.target.checked) {
      if (this.questionData[checkListId]) {
        if (this.questionData[checkListId][qgId]) {
          if (!this.questionData[checkListId][qgId].includes(qId)) {
            this.questionData[checkListId][qgId].push(qId)
          }
        } else {
          this.questionData[checkListId][qgId] = []
          this.questionData[checkListId][qgId].push(qId)
        }
      } else {
        this.questionData[checkListId] = {}
        this.questionData[checkListId][qgId] = []
        this.questionData[checkListId][qgId].push(qId)
      }
    } else {
      this.questionData[checkListId][qgId] = this.questionData[checkListId][qgId].filter(q => {
        return q != qId
      })
    }
    console.log(this.questionData)
  }


  addAllByQuestionGroup(e, checkListId, qgId) {
    let questions = this.configureData[checkListId][qgId]
    console.log(questions)
    questions.data.forEach(q => {
      this.addQuestion(e, checkListId, qgId, q.questionId)
    })

    console.log(this.questionData)
  }


  saveLoad: boolean = false
  saveConfiguration() {
    let configureData = []
    this.saveLoad = true
    for (let checklist in this.questionData) {
      for (let qg in this.questionData[checklist]) {
        let questionIds = this.questionData[checklist][qg]
        questionIds.forEach(qId => {
          let data = {
            pkTradeId: Number(this.SelTrade),
            pkSubgroupId: Number(this.SelSubgroup),
            checklistId: Number(checklist),
            schemeId: Number(this.projectId),
            pkQuestionGroupId: Number(qg),
            pkQuestionId: Number(qId)
          }

          configureData.push(data)
        })
      }
    }

    console.log(configureData)
    // return
    this.clientService.projectChecklistAlloaction(configureData)
      .subscribe(
        data => {
          console.log('checklist Aloocated-->', data)
          this.saveLoad = false
          this.snackBar.showSuccess('Checklist configure successfully')

        },
        err => {
          console.log(err)
          this.saveLoad = false
          this.snackBar.showSnackError()
        })
    // console.log(configureData)
  }

}

