import { Component, OnInit, ViewChild } from '@angular/core';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { Trade } from 'src/app/trade/trade.component';
import { UserService } from 'src/app/service/user.service';
import { UserView } from 'src/app/user-log/user-log.component';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";

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

  usertradeDetailsData = {} //this data is form full screen modal according to user

  constructor(
    private tradeService: TradeMaintanceService,
    private userService: UserService,
    private inspectionTraining: InspectorTraning
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
    data.forEach(item => {
      if (ListArray[item.userId]) {
        ListArray[item.userId].trades.push({
          tradeId: item.tradeId,
          tradeName: item.tradeName
        })
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
          tradeId: item.tradeId,
          tradeName: item.tradeName
        })

        ListArray[item.userId] = userData
        srNo++
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

  getUserTradeDetails(userId) {
    this.usertradeDetailsData = this.userTradeTrainingData[userId]
    console.log(this.usertradeDetailsData)
  }

  getFile(e) {
    console.log(e)
    let file: File = e.target.files[0]
    const formData = new FormData();
    let data = {
      file: file
    }
    console.log(data)
  }

}
