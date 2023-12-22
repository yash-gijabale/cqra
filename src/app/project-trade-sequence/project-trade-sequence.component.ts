import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Trade } from '../trade/trade.component';
import { TradeMaintanceService } from '../trade-maintance.service';

@Component({
  selector: 'app-project-trade-sequence',
  templateUrl: './project-trade-sequence.component.html',
  styleUrls: ['./project-trade-sequence.component.css'],
})
export class ProjectTradeSequenceComponent implements OnInit {

  projectId: number
  trades: any
  submitted: boolean =false
  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeMaintanceService) { }

  ngOnInit() {
    // this.trades = ['test', 'test2', 'test3', 'test4', 'test5']
    this.projectId = this.route.snapshot.params['id']
    this.tradeService.getProjectTrades(this.projectId)
      .subscribe(
        data => {
          console.log(data)
          this.trades = data
        }
      )
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.trades, event.previousIndex, event.currentIndex);
  }

  onSubimt() {
    console.log(this.trades)
  }

}
