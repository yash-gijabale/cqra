import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-project-trade-sequence',
  templateUrl: './project-trade-sequence.component.html',
  styleUrls: ['./project-trade-sequence.component.css'],
})
export class ProjectTradeSequenceComponent implements OnInit {

  trades: Array<String>
  constructor() { }

  ngOnInit() {
    this.trades = ['test', 'test2', 'test3', 'test4', 'test5']
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.trades, event.previousIndex, event.currentIndex);
  }

  onSubimt()
  {
    console.log(this.trades)
  }

}
