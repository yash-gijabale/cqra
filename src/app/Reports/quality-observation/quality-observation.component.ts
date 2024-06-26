import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ClientData } from 'src/app/client/client.component';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ReportService } from 'src/app/service/report.service';

export class QualityObservationReportView {
  constructor(
    public qualityObservationId: Number,
    public qualityObservationSchemasId: Number,
    public qualityObservationResponsiblePerson: String,
    public qualityObservationCqraRepresentative: String,
    public qualityObservationClientId: Number,
    public qualityObservationDateObservation: String,
    public qualityObservationReportNo: Number,
    public qualityObservationContractorReprentative: String,
    public qualityObservationReportName: String,
    public qualityObservationStatus: Number,
    public qualityObservationReportHeader: String
  ) { }
}

@Component({
  selector: 'app-quality-observation',
  templateUrl: './quality-observation.component.html',
  styleUrls: ['./quality-observation.component.css']
})
export class QualityObservationComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<QualityObservationReportView> = new Subject();
  clients: ClientData[] = []
  selClientId: Number
  constructor(
    private clientService: ClientServiceService,
    private reportService: ReportService,
    private snackBar: SnackBarComponent
  ) { }

  reports: QualityObservationReportView

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      console.log(data)
      this.clients = data
    })
  }


  filterLoad: boolean = false
  getReportsByClientId() {
    this.filterLoad = true
    this.reportService.getQaulityObservationByClientId(this.selClientId)
      .subscribe(data => {
        console.log(data)
        this.reports = data
        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy()
            this.dtTrigger.next()
          });
        } else {
          this.dtTrigger.next()

        }
        this.filterLoad = false
      }, err => {
        this.filterLoad = false
        this.snackBar.showSnackError()
      })
  }

}
