import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";

export class MisReport{
  constructor(
    public misId: Number,
    public clientId: Number,
    public schemeId: Number,
    public reportNo: string,
    public month: string,
    public value: Number,
    public qualityOfWork: string,
    public topPerformers: string,
    public createdOn: string,
    public updatedOn: string,
    public createdBy: Number,
    public image2: string,
    public monthIndex: string,
    public misNo: Number,
    public type: Number,
    public appStatus: Number,
    public image1: string
  ){}
}

@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.css']
})
export class MisReportComponent implements OnInit {
 
  misReports: MisReport

  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MisReport> = new Subject<MisReport>();


  constructor(
    private commonService : CommonService
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };

    this.commonService.getAllMisReport()
    .subscribe(data =>{
      this.misReports = data
      this.dtTrigger.next();

    }, err => console.log(err))
  }
 
}
