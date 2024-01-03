import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-qaulity-index-report-list',
  templateUrl: './qaulity-index-report-list.component.html',
  styleUrls: ['./qaulity-index-report-list.component.css']
})
export class QaulityIndexReportListComponent implements OnInit {
  isLoading: boolean = false
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  ProjectViews:any
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };
  }

}
