import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";


export class Remarks{
  constructor(
    public remarkId: number,
    public remark: string
  ){}
}

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.css']
})
export class RemarkComponent implements OnInit {
  title:"datatables";
  @ViewChild(DataTableDirective)
  dtElement:DataTableDirective;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<Remarks> = new Subject();

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };
  }

}
