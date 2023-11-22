import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

export class AssessorName{
  constructor(
    public assessorId: number,
    public assessorName: string
  ){}
}

@Component({
  selector: 'app-accessor-name',
  templateUrl: './accessor-name.component.html',
  styleUrls: ['./accessor-name.component.css']
})
export class AccessorNameComponent implements OnInit {

  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<AssessorName> = new Subject();

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };
  }

}
