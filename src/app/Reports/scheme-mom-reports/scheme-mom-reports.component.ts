import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/service/report.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';
export class MomReportPointView {
  constructor(
    public schemeMomReportId: Number,
    public schemeMomId: Number,
    public reference: String,
    public discussionPoint: String,
    public planAction: String,
    public responsiblePerson: String,
    public createOn: String,
    public targetDate: String
  ) { }
}

@Component({
  selector: 'app-scheme-mom-reports',
  templateUrl: './scheme-mom-reports.component.html',
  styleUrls: ['./scheme-mom-reports.component.css']
})
export class SchemeMomReportsComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MomReportPointView> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private snackBar: SnackBarComponent
  ) { }

  momId: Number

  momPoints: MomReportPointView

  ngOnInit() {
    this.momId = this.route.snapshot.params['momId']
    this.reportService.getMomPointsByMomId(this.momId)
      .subscribe(data => {
        console.log('points', data)
        this.momPoints = data
        this.dtTrigger.next()
      })


  }

  momReportData: MomReportPointView

  momReportCache = {}

  modalLoad: boolean = false
  modalError: boolean = false
  getMomReportData(id) {
    this.modalLoad = true
    this.modalError = false

    if (this.momReportCache[id]) {
      this.momReportData = this.momReportCache[id]
      this.modalLoad = false

    } else {
      this.reportService.getMomReportById(id)
        .subscribe(data => {
          console.log(data)
          this.momReportCache[String(data.schemeMomReportId)] = data
          this.momReportData = data
          this.modalLoad = false

        }, err => {
          this.modalLoad = false
          this.modalError = true
          this.snackBar.showSnackError()

        })
    }
  }

}
