import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-observation-tracker-report',
  templateUrl: './observation-tracker-report.component.html',
  styleUrls: ['./observation-tracker-report.component.css']
})
export class ObservationTrackerReportComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      scrollX: true
     
    };
  }

}
