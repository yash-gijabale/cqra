import { Component, OnInit } from '@angular/core';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { Trade } from 'src/app/trade/trade.component';
import { UserService } from 'src/app/service/user.service';
import { UserView } from 'src/app/user-log/user-log.component';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';



@Component({
  selector: 'app-inspector-trade-training',
  templateUrl: './inspector-trade-training.component.html',
  styleUrls: ['./inspector-trade-training.component.css']
})
export class InspectorTradeTrainingComponent implements OnInit {

  tradeData: Trade[]
  users: UserView[]

  SelUserId: String = '0'

  isTradeLoad: boolean = false

  constructor(
    private tradeService: TradeMaintanceService,
    private userService: UserService,
    private inspectionTraining: InspectorTraning
  ) { }

  ngOnInit() {

    this.isTradeLoad = true
    this.tradeService.getAllTrades()
      .subscribe(data => {
        console.log(data)
        this.tradeData = data
        this.isTradeLoad = false
      })

    this.userService.getAllUsers()
      .subscribe(data => { this.users = data })
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

  saveNewTradeTraining() {
    let todayDate = new Date().toISOString().slice(0, 10);
    let formData = {
      inspectorTradeTraining: {
        userId: this.SelUserId,
        trainingDate: todayDate
      },
      inspectorTradeTrainingsTrade: this.newUserTrainingTrde
    }

    this.inspectionTraining.newUserTradeTraining(formData)
    .subscribe(data => {
      console.log('trade traning added', data)
    })
    console.log(formData)
  }

}
