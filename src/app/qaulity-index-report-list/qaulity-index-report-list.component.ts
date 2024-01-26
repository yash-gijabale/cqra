import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { Router } from '@angular/router';



export class QualityIndexReportData {
  constructor(
    public qualityIndexId: Number,
    public clientId: Number,
    public projectId: Number,
    public structureId: Number,
    public tradeId: Number,
    public dateFrom: String,
    public dateTo: String,
    public approveBy: Number,
    public approveDesign: String,
    public reviewBy: Number,
    public reviewDesign: String,
    public reportHeader: String,
    public remark: String,
    public projectName: String,
    public clientName: String,
    public structureName: String
  ) {

  }
}

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
  dtTrigger: Subject<QualityIndexReportData> = new Subject<QualityIndexReportData>();
  ProjectViews: any
  qaulityIndexReports: QualityIndexReportData
  constructor(
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };

    this.commonService.getAllQualityIndexReport()
      .subscribe(data => {
        this.qaulityIndexReports = data
        console.log(data)
        this.dtTrigger.next()
      })
  }

  editReport(id) {
    this.router.navigate(['qualityIndexReport', id])
  }

}
