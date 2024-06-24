import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

export class InspectorViewData {
  constructor(

    public itttId: Number,
    public ittId: Number,
    public userId: Number,
    public trainingDate: String,
    public marks: any,
    public trainingAttachment: any,
    public questionAttachment: any,
    public userApprover: Number,
    public tradeId: Number,
    public tradeName: String,
    public username: String,
    public status: Number,
    public passorfail: any,
    public mobile: String,
    public email: String,
    public l0: any,
    public l1: Boolean,
    public l2: Boolean,
    public l3: Boolean,
    public mep: any,
    public infra: any,
    public fireSafety: any,
    public constructionSafety: any

  ) { }
}

@Component({
  selector: 'app-inspector-training-view',
  templateUrl: './inspector-training-view.component.html',
  styleUrls: ['./inspector-training-view.component.css']
})
export class InspectorTrainingViewComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<InspectorViewData> = new Subject<InspectorViewData>();

  constructor(
    private inspectorService: InspectorTraning,
  ) { }

  currentUser = localStorage.getItem('id')
  testUserId = 226

  userTradeDataRow:InspectorViewData
  userTradeData: any

  loadUserData: boolean = false

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      scrollX: true
     
    };

    this.loadUserData = true
    this.inspectorService.getUserTrainingData(this.currentUser)
      .subscribe(data => {
        console.log(data)
        this.userTradeDataRow = data
        this.dtTrigger.next()
        // let generatedData = this.inspectorTradeComponent.generateDataFromTradeUserList(data)
        this.userTradeData = this.generateData(this.userTradeDataRow)
        console.log(this.userTradeData)
        this.loadUserData = false

      })
  }



  generateData(data) {
    let ListArray = {}
    let srNo = 1
    data.forEach(item => {
      if (ListArray[item.userId]) {
        ListArray[item.userId].trades.push({
          srNo: srNo,
          tradeId: item.tradeId,
          tradeName: item.tradeName,
          marks: item.marks,
          qStatus: item.status ? item.status : 0,
          passorfail: item.passorfail

        })
        srNo++

      } else {
        let userData = {
          srNo: srNo,
          userId: item.userId,
          userName: item.username,
          trainingAttachment: item.trainingAttachment ? item.trainingAttachment : false,
          trainingData: new Date(item.trainingDate).toISOString().slice(0, 10),
          trades: []
        }
        userData.trades.push({
          srNo: srNo,
          tradeId: item.tradeId,
          tradeName: item.tradeName,
          marks: item.marks,
          qStatus: item.status ? item.status : 0,
          passorfail: item.passorfail

        })

        ListArray[item.userId] = userData
        srNo++
      }

    })
    return ListArray[this.currentUser]
  }



  questionLoad: boolean = false
  questionPaper = {}
  currentTrade: Number
  getQuestionPaper(tradeId) {
    this.currentTrade = tradeId
    this.questionLoad = true
    this.inspectorService.getUserTradeQuestion(this.currentUser, tradeId)
      .subscribe(data => {
        let srNo = 0
        let a = data
        this.questionPaper = data
        console.log(this.questionPaper)
        this.questionLoad = false
      })
  }


  answerSubmitted: boolean = false
  ansSubmitLoad: boolean = false

  submitQuestionPaper() {
    let ansData = document.querySelectorAll('.question-ans')

    this.ansSubmitLoad = true
    let ansFinalData = []
    for (const key in this.questionPaper) {
      let InstructionAns = document.querySelector(`#instruction${key}`) as HTMLInputElement
      let impactAns = document.querySelector(`#impact${key}`) as HTMLInputElement
      let rectificationAns = document.querySelector(`#rectification${key}`) as HTMLInputElement
      let data = {
        userId: this.currentUser,
        tradeId: this.currentTrade,
        questionId: key,
        answer: InstructionAns.value,
        answerImpact: impactAns.value,
        answerRectification: rectificationAns.value,
        answeredDate: new Date().toISOString().slice(0, 10)
      }
      ansFinalData.push(data)

    }

    console.log(ansFinalData)
    // return
    this.inspectorService.submitTradeAnswer(this.currentUser, this.currentTrade, ansFinalData)
      .subscribe(data => {
        console.log('Question submitted-->', data)
        this.answerSubmitted = true
        this.ansSubmitLoad = false
      })
  }
}
