import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-nc-count-report-list',
  templateUrl: './nc-count-report-list.component.html',
  styleUrls: ['./nc-count-report-list.component.css']
})
export class NcCountReportListComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.commonService
  }

}
