import { Component, OnInit,ViewChild } from '@angular/core';
import { ReportService } from 'src/app/service/report.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

export class QualityProcedureView {
  constructor(
    public qualityProcedureAmendmentId: Number,
    public reportNumber: String,
    public clientId: Number,
    public schemeId: Number,
    public tradeId: Number,
    public updatedDate: String,
    public cqraRepresentative: String,
    public siteRepresentative: String
  ) { }
}

@Component({
  selector: 'app-quality-procedure-ammendment',
  templateUrl: './quality-procedure-ammendment.component.html',
  styleUrls: ['./quality-procedure-ammendment.component.css']
})
export class QualityProcedureAmmendmentComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<QualityProcedureView> = new Subject();

  reportList: QualityProcedureView

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 25]
    };


    this.reportService.getAllQualityProcedureAmmentment()
      .subscribe(data => {
        console.log(data)
        this.reportList = data
        this.dtTrigger.next()
      }, err => {
        console.log('err', err)
      })

  }



}
