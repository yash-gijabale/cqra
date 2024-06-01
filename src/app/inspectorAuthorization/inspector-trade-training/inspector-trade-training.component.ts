import { Component, OnInit, ViewChild } from '@angular/core';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { Trade } from 'src/app/trade/trade.component';
import { UserService } from 'src/app/service/user.service';
import { UserView } from 'src/app/user-log/user-log.component';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { CommonService } from 'src/app/common.service';
import { saveAs } from 'file-saver';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { data } from 'jquery';
import { Key } from 'protractor';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';

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

  dtElement2: DataTableDirective;
  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject<any>();

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
    private commonService: CommonService,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };

    this.dtOptions2 = {
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

    // this.userService.getAllUsers()
    //   .subscribe(data => { this.users = data })

    this.userService.getUserDataByRepresentative(1)
      .subscribe(data => { this.users = data })


    this.getUserTraningData()

  }

  loadData: boolean = false
  getUserTraningData() {
    this.loadData = true
    this.inspectionTraining.getAllUserTradeTraining()
      .subscribe(data => {
        console.log(data)
        this.userTradeTrainingData = this.generateDataFromTradeUserList(data)
        this.dtTrigger.next()
        this.loadData = false
      })
  }

  allocatedtrade = {}

  generateDataFromTradeUserList(data) {
    let ListArray = {}
    let srNo = 1
    let srNo2 = 1
    data.forEach(item => {
      if (item.userId != 0) {
        if (ListArray[item.userId]) {
          ListArray[item.userId].trades.push({
            srNo: srNo2,
            tradeId: item.tradeId,
            tradeName: item.tradeName,
            marks: item.marks,
            qStatus: item.status ? item.status : 0,
            passorfail: item.passorfail,
            trainingAttachment: item.trainingAttachment,
            userApprover: item.userApprover,
            status: item.status

          })
          srNo2++
        } else {
          let userData = {
            srNo: srNo,
            userId: item.userId,
            userName: item.username,
            email: item.email,
            mobile: item.mobile,
            trainingAttachment: item.trainingAttachment ? item.trainingAttachment : false,
            trainingData: new Date(item.trainingDate).toISOString().slice(0, 10),
            trades: []
          }
          userData.trades.push({
            srNo: srNo2,
            tradeId: item.tradeId,
            tradeName: item.tradeName,
            marks: item.marks,
            qStatus: item.status ? item.status : 0,
            passorfail: item.passorfail,
            trainingAttachment: item.trainingAttachment

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
      }
    });

    console.log(this.allocatedtrade)
    console.log(ListArray)
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

  newTradeLoad: boolean = false
  saveNewTradeTraining(userId = false) {
    this.newTradeLoad = true
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
        this.newTradeLoad = false
      }, err => {
        this.newTradeLoad = false
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
        this.dtTrigger2.next()

      })
  }

  uploadTraingLoad = {}
  getFile(tradeId) {
    this.uploadTraingLoad = {}
    this.uploadTraingLoad[tradeId] = {
      load: true,
      url: '',
      error: false
    }
    let imageData = document.querySelector(`#inputField${tradeId}`) as HTMLInputElement
    let file: File = imageData.files[0]
    // console.log(e)
    // let file: File = e.target.files[0]
    console.log(file)

    this.inspectionTraining.uploadTrainingAttachment(this.usertradeDetailsData.userId,tradeId, file)
      .subscribe(data => {
        console.log(data, 'uploaded')
        this.uploadTraingLoad[tradeId] = {
          load: false,
          url: data,
          error: false
        }
        this.snackBar.showSuccess('Training File Updated')
      },
        err => {
          console.log('file error-->', err)
          this.uploadTraingLoad[tradeId] = {
            load: false,
            url: '',
            error: true
          }
          this.snackBar.showSnackError()

        })
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
    // this.inspectionTraining.updateTrainingMark(userId, tradeId, this.inputMark)
    //   .subscribe(data => {
    //     console.log('mark', data)
    //     this.markLoader = false
    //   })

  }


  questionData = []
  questionLoad: boolean = false
  currentSelectedTrade: Number
  subgroupWiseData = {}
  subgroupName = {}
  questiongroupName = {}
  headingName = {}

  getQuestionByTrade(tradeId) {
    this.questionData = []
    this.pickedQuestion = [] //TO clear previewd selection
    this.questionLoad = true
    this.currentSelectedTrade = tradeId

    this.subgroupName = this.questiongroupName = this.headingName = {}
    this.commonService.getQuestionByTradeId(tradeId)
      .subscribe(data => {
        console.log(data)
        this.questionData = data
        let subgroupWise = {}
        data.forEach(question => {
          if (subgroupWise[question.subgroupId]) {
            if (subgroupWise[question.subgroupId][question.question_group_id]) {
              // subgroupWise[question.subgroupId][question.questionGroupId] = {}
              if (subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id]) {
                subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id].push(question)
              } else {
                subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id] = []
                subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id].push(question)
              }
            } else {
              subgroupWise[question.subgroupId][question.question_group_id] = {}
              if (subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id]) {
                subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id].push(question)
              } else {
                subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id] = []
                subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id].push(question)
              }
            }
            // subgroupWise[question.subgroupId][question.questionGroupId][question.questionHeadingId].push(question)

          } else {
            subgroupWise[question.subgroupId] = {}
            subgroupWise[question.subgroupId][question.question_group_id] = {}
            subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id] = []
            subgroupWise[question.subgroupId][question.question_group_id][question.question_heading_id].push(question)

          }


          this.subgroupName[question.subgroupId] = question.subgroupName
          this.questiongroupName[question.question_group_id] = question.questionGroupText
          this.headingName[question.question_heading_id] = question.questionHeadingText
        })
        console.log(subgroupWise)
        this.subgroupWiseData = subgroupWise
        // this.questionData = data
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
    console.log(questionData)

    this.inspectionTraining.addTrainingQuestions(this.usertradeDetailsData.userId, this.currentSelectedTrade, questionData)
      .subscribe(data => {
        console.log('question added', data)
      })
  }

  questionAnsLoad: boolean = false
  questionResult = {}
  questionAnsData = []
  totalQuestionsAns = 0
  getUserSubmittedAns(userId, tradeId) {
    this.questionAnsLoad = true
    this.usertradeDetailsData.tradeId = tradeId
    console.log(userId, tradeId)
    this.totalQuestionsAns = 0
    this.rigthAns = 0
    this.wrongAns = 0
    this.inspectionTraining.getUserQuestionAnswer(userId, tradeId)
      .subscribe(data => {
        this.questionAnsLoad = false
        this.questionAnsData = data

        data.forEach(item => {
          this.questionResult[item.instradeAnswerId] = undefined
        })

        this.totalQuestionsAns = data.length
        console.log(data)

      })
  }

  rigthAns = 0
  wrongAns = 0
  addAnswer(answerId, e, type) {
    console.log(e.target.value)
    if (!this.questionResult[answerId]) {
      this.questionResult[answerId] = {}
      this.questionResult[answerId][type] = Number(e.target.value)
    } else {
      this.questionResult[answerId][type] = Number(e.target.value)
    }

    this.rigthAns = this.calculateRigthAndWrongQuestion(this.questionResult).rigthQuestions
    this.wrongAns = this.calculateRigthAndWrongQuestion(this.questionResult).wrongQuestions
    console.log(this.questionResult)
    console.log(this.rigthAns)
    console.log(this.wrongAns)
  }

  calculateRigthAndWrongQuestion(data) {
    let rigthQuestions = 0
    let wrongQuestions = 0
    for (const key in data) {
      for (const subQ in data[key]) {
        if (data[key][subQ] === 1) {
          rigthQuestions += 1
        }
        if (data[key][subQ] === 0) {
          wrongQuestions += 1
        }
      }
    }

    return {
      rigthQuestions,
      wrongQuestions
    }
  }

  submitQuestionPaperResult(userId, tradeId) {
    console.log(this.questionResult)


    let result = this.calculateMarks(this.questionResult)
    let marks = result.totalMarks
    console.log(marks)
    console.log(result.questionWiseResult)
    let finalResult = []
    for (const resultAns in result.questionWiseResult) {
      let data = {
        'inspectTradeAnswerId': resultAns,
        'ansstatus': result.questionWiseResult[resultAns] == 0 ? 0 : 1
      }

      finalResult.push(data)
    }
    let passOrFail = this.checkPassOrFali((this.totalQuestionsAns * 3), marks)

    console.log(passOrFail)
    console.log(finalResult)

    // return
    this.inspectionTraining.submitUserExamResult(finalResult)
      .subscribe(data => {
        console.log('Exam result added-->', data)
      })

    console.log('pass or fail-->', passOrFail)
    this.inspectionTraining.updateTrainingMark(userId, tradeId, marks, passOrFail)
      .subscribe(data => {
        console.log('mark updated-->', data)
      },
        err => console.log(err))
  }

  calculateMarks(resultData) {
    let totalQuestion = Object.keys(resultData).length
    let totalMarks = 0
    let questionWiseResult = {}

    for (const result in resultData) {
      questionWiseResult[result] = 0
      for (const subQ in resultData[result]) {
        questionWiseResult[result] += resultData[result][subQ]
        if (resultData[result][subQ]) {
          totalMarks += 1
        }
      }
    }
    return {
      totalQuestion,
      totalMarks,
      questionWiseResult
    }
  }

  checkPassOrFali(totalQuestion, marks) {
    let minMarks = Math.round(totalQuestion * 35 / 100)
    if (marks >= minMarks) {
      return 1
    } else {
      return 0
    }
  }


  statusLoad = {}
  updateTradeStatus(userId, tradeId, status) {
    this.statusLoad[tradeId] = {
      load: true,
      error: false
    }
    let isConfirm;
    if (status == 0) {
      isConfirm = confirm('Are you sure want to deactivate this trade !')
    }
    if (status == 1) {
      isConfirm = confirm('Are you sure want to activate this trade !')
    }

    console.log(userId, tradeId, status)
    this.inspectionTraining.updateUserTradeStatus(userId, tradeId, status)
      .subscribe(data => {
        this.statusLoad[tradeId].load = false
        console.log('status updated', data)
      }, err => {
        this.statusLoad[tradeId].error = true
      })
  }


}
