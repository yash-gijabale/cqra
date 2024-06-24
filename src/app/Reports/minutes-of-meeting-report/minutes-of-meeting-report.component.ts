import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/service/report.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/common.service';

export class SchemeMomReportView {
  constructor(
    public schemeMomId: Number,
    public typeOfMeeting: String,
    public dateOfMom: String,
    public meetingLocation: String,
    public otherText: String,
    public momNo: String,
    public cqraPerson: String,
    public contractorName: String,
    public clientStaff: String,
    public consultant: String,
    public note: String,
    public clientName: String,
    public projectName: String


  ) { }
}

@Component({
  selector: 'app-minutes-of-meeting-report',
  templateUrl: './minutes-of-meeting-report.component.html',
  styleUrls: ['./minutes-of-meeting-report.component.css']
})
export class MinutesOfMeetingReportComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SchemeMomReportView> = new Subject()


  momReports: SchemeMomReportView

  constructor(
    private reportService: ReportService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.reportService.getAllSchemeMomReport()
      .subscribe(data => {
        console.log('mon->', data)
        this.momReports = data
        this.dtTrigger.next()
      }, err => {
        console.log(err)
      })
  }


  reportLoad = {}
  generateReport(id) {
    this.reportLoad[id] = {
      load: true,
      url: '',
      error: false
    }
    this.commonService.downloadSchemeMomReport(id)
      .subscribe((data: any) => {
        console.log(data.url)
        this.reportLoad[id].load = false
        this.reportLoad[id].url = data.url
      },err =>{
        this.reportLoad[id].load = false
        this.reportLoad[id].error = true
      })
  }
}
