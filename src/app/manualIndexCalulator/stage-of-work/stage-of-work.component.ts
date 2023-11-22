import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

export class StageOfWork{
  constructor(
    public stageOfWorkId: number,
    public stageOfWork: string
  ){}
}

@Component({
  selector: 'app-stage-of-work',
  templateUrl: './stage-of-work.component.html',
  styleUrls: ['./stage-of-work.component.css']
})
export class StageOfWorkComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<StageOfWork> = new Subject();

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };
  }

}
