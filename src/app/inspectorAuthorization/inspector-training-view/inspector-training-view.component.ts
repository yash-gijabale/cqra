import { Component, OnInit, ViewChild } from '@angular/core';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
@Component({
  selector: 'app-inspector-training-view',
  templateUrl: './inspector-training-view.component.html',
  styleUrls: ['./inspector-training-view.component.css']
})
export class InspectorTrainingViewComponent implements OnInit {

  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private inspectorService: InspectorTraning,
  ) { }

  currentUser = localStorage.getItem('id')
  testUserId = 226

  userTradeData: any

  loadUserData:boolean = false

  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
    };

    this.loadUserData = true
    this.inspectorService.getUserTrainingData(this.currentUser)
      .subscribe(data => {
        console.log(data)
        // let generatedData = this.inspectorTradeComponent.generateDataFromTradeUserList(data)
        this.userTradeData = this.generateData(data)
        console.log(this.userTradeData)
        this.dtTrigger.next()
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
        this.questionPaper = data
        this.questionLoad = false
      })
  }


  answerSubmitted: boolean = false
  ansSubmitLoad:boolean = false

  submitQuestionPaper() {
    let ansData = document.querySelectorAll('.question-ans')

    this.ansSubmitLoad = true
    let ansFinalData = []
    ansData.forEach(ans => {
      let data = {
        userId: this.currentUser,
        tradeId: this.currentTrade,
        questionId: (<HTMLTextAreaElement>ans).id,
        answer: (<HTMLTextAreaElement>ans).value,
        answeredDate: new Date().toISOString().slice(0, 10)
      }
      ansFinalData.push(data)
    })

    console.log(ansFinalData)
    this.inspectorService.submitTradeAnswer(this.currentUser, this.currentTrade, ansFinalData)
      .subscribe(data => {
        console.log('Question submitted-->', data)
        this.answerSubmitted = true
        this.ansSubmitLoad = false
      })
  }
}
