import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Trade } from '../trade/trade.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-project-trade-sequence',
  templateUrl: './project-trade-sequence.component.html',
  styleUrls: ['./project-trade-sequence.component.css'],
})
export class ProjectTradeSequenceComponent implements OnInit {

  projectId: number
  trades: any
  submitted: boolean = false
  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService
    ) { }

  ngOnInit() {
    // this.trades = ['test', 'test2', 'test3', 'test4', 'test5']
    this.projectId = this.route.snapshot.params['id']
    this.tradeService.getProjectTradesScheme(this.projectId)
      .subscribe(
        data => {
          console.log(data)
          this.trades = data
        }
      )
    console.log(this.trades)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.trades, event.previousIndex, event.currentIndex);
  }

  onSubimt() {
    let tradeWithSquence = this.trades.map((item, key) => {
      return {
        projectId: this.projectId,
        tradeId: item.fkTradeId,
        seqNo: key + 1
      }
    })
    console.log(tradeWithSquence)
    this.clientService.projectTradeallocation(tradeWithSquence)
    .subscribe(data => console.log('Trade allocated -> ', data))
  }

}
