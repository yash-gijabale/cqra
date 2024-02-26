import { Component, OnInit, ViewChild } from '@angular/core';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { Trade } from 'src/app/trade/trade.component';
import { UserService } from 'src/app/service/user.service';
import { UserView } from 'src/app/user-log/user-log.component';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { CommonService } from 'src/app/common.service';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { data } from 'jquery';

@Component({
  selector: 'app-inspector-trade-training',
  templateUrl: './inspector-trade-training.component.html',
  styleUrls: ['./inspector-trade-training.component.css']
})
export class InspectorTradeTrainingComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  tradeData: Trade[] = []
  searchTradeData = []
  users: UserView[]

  SelUserId: String = '0'

  isTradeLoad: boolean = false

  userTradeTrainingData = {}

  usertradeDetailsData: any = {} //this data is form full screen modal according to user

  constructor(
    private tradeService: TradeMaintanceService,
    private userService: UserService,
    private inspectionTraining: InspectorTraning,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };

    this.isTradeLoad = true
    this.tradeService.getAllTrades()
      .subscribe(data => {
        console.log(data)
        this.tradeData = data
        this.searchTradeData = this.tradeData

        this.isTradeLoad = false
      })

    this.userService.getAllUsers()
      .subscribe(data => { this.users = data })


    this.getUserTraningData()

  }

  getUserTraningData() {
    this.inspectionTraining.getAllUserTradeTraining()
      .subscribe(data => {
        console.log(data)
        this.userTradeTrainingData = this.generateDataFromTradeUserList(data)
        this.dtTrigger.next()
      })
  }

  allocatedtrade = {}

  generateDataFromTradeUserList(data) {
    let ListArray = {}
    let srNo = 1
    let srNo2 = 1
    data.forEach(item => {
      if (ListArray[item.userId]) {
        ListArray[item.userId].trades.push({
          srNo: srNo2,
          tradeId: item.tradeId,
          tradeName: item.tradeName,
          marks: item.marks,
          qStatus: item.status ? item.status : 0
        })
        srNo2++
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
          srNo: srNo2,
          tradeId: item.tradeId,
          tradeName: item.tradeName,
          marks: item.marks,
          qStatus: item.status ? item.status : 0

        })

        ListArray[item.userId] = userData
        srNo++
        srNo2++
      }

      if (this.allocatedtrade[item.userId]) {
        this.allocatedtrade[item.userId].push(item.tradeId)

      } else {
        this.allocatedtrade[item.userId] = []
        this.allocatedtrade[item.userId].push(item.tradeId)
      }

    });

    console.log(this.allocatedtrade)
    return ListArray
  }


  newUserTrainingTrde = []
  addToNewUserTraining(e) {
    if (e.target.checked) {
      this.newUserTrainingTrde.push(Number(e.target.value))
    } else {
      let updateTradeArray = this.newUserTrainingTrde.filter(trade => {
        if (trade != e.target.value) {
          return trade
        }
      })

      this.newUserTrainingTrde = updateTradeArray
    }

    console.log(this.newUserTrainingTrde)
  }

  saveNewTradeTraining(userId = false) {
    let todayDate = new Date().toISOString().slice(0, 10);
    let formData = {
      inspectorTradeTraining: {
        userId: Number(this.SelUserId) ? this.SelUserId : userId,
        trainingDate: todayDate
      },
      inspectorTradeTrainingsTrade: this.newUserTrainingTrde
    }

    this.inspectionTraining.newUserTradeTraining(formData)
      .subscribe(data => {
        console.log('trade traning added', data)
        this.getUserTraningData()
      })
    console.log(formData)

  }


  searchTrade(e) {
    let filteredTrade = this.tradeData.filter(trade => {
      if (trade.tradeName.toLowerCase().includes(e.target.value.toLowerCase())) {
        return trade
      }
    })

    console.log(filteredTrade)
    this.searchTradeData = filteredTrade
  }

  userDetailsLoad: boolean = false
  getUserTradeDetails(userId) {
    // this.usertradeDetailsData = this.userTradeTrainingData[userId]
    this.usertradeDetailsData = {}
    this.userDetailsLoad = true
    this.inspectionTraining.getUserTrainingData(userId)
      .subscribe(data => {
        console.log(data)
        let generatedData = this.generateDataFromTradeUserList(data)
        this.usertradeDetailsData = generatedData[userId]
        console.log(this.usertradeDetailsData)
        this.userDetailsLoad = false

      })
  }

  getFile(e) {
    console.log(e)
    let file: File = e.target.files[0]
    const formData = new FormData();

    let data = {
      file: file
    }
    this.inspectionTraining.uploadTrainingAttachment(this.usertradeDetailsData.userId, data)
      .subscribe(data => {
        console.log('File uploaded', data)
      },
        err => console.log('file error-->', err))
    // console.log(data)
  }

  inputMark: Number
  markLoader: boolean = false
  getMark(e) {
    this.inputMark = Number(e.target.value)
  }

  updateMark(userId, tradeId) {
    this.markLoader = true
    console.log(userId, tradeId, this.inputMark)
    this.inspectionTraining.updateTrainingMark(userId, tradeId, this.inputMark)
      .subscribe(data => {
        console.log('mark', data)
        this.markLoader = false
      })

  }


  questionData = []
  questionLoad: boolean = false
  currentSelectedTrade: Number

  getQuestionByTrade(tradeId) {
    this.questionData = []
    this.pickedQuestion = [] //TO clear previewd selection
    this.questionLoad = true
    this.currentSelectedTrade = tradeId
    this.commonService.getQuestionByTradeId(tradeId)
      .subscribe(data => {
        console.log(data)
        this.questionData = data
        this.questionLoad = false

      })
  }

  pickedQuestion = []

  pickQuestion(e) {
    if (e.target.checked) {
      this.pickedQuestion.push(Number(e.target.value))
    } else {
      let updateTradeArray = this.pickedQuestion.filter(trade => {
        if (trade != e.target.value) {
          return trade
        }
      })

      this.pickedQuestion = updateTradeArray
    }
    console.log(this.pickedQuestion)
  }

  randomQuestionCount: Number
  randomCount(e) {
    this.randomQuestionCount = Number(e.target.value)
  }

  pickRandomQuestion() {
    let questionId = {}
    this.questionData.forEach(q => {
      questionId[q.questionId] = q.questionId
    })

    let questionIdArr = Object.keys(questionId)
    if (this.randomQuestionCount == this.questionData.length) {
      this.pickedQuestion = questionIdArr
    }

    // const randomElement = array[Math.floor(Math.random() * array.length)];
    let tempRandomId = []
    while (Number(tempRandomId.length) < Number(this.randomQuestionCount)) {
      let tempQuestionId = Object.keys(questionId)

      let ramdom = tempQuestionId[Math.floor(Math.random() * tempQuestionId.length)]
      tempRandomId.push(Number(ramdom))
      delete questionId[ramdom]

    }

    // console.log(tempRandomId)
    this.pickedQuestion = tempRandomId
  }

  submitRandomQuestion() {
    let questionData = {
      inspectorTradeTrainingsTrade: this.pickedQuestion
    }

    console.log(this.pickedQuestion)
    console.log(this.usertradeDetailsData.userId)
    console.log(this.currentSelectedTrade)

    this.inspectionTraining.addTrainingQuestions(this.usertradeDetailsData.userId, this.currentSelectedTrade, questionData)
      .subscribe(data => {
        console.log('question added', data)
      })
  }

}
