import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';
import { CommonService } from '../common.service';

export class InspectionDocView {
  constructor(
    public clientName: string,
    public projectName: string,
    public reportName: string

  ) {

  }
}

@Component({
  selector: 'app-snagging-document',
  templateUrl: './snagging-document.component.html',
  styleUrls: ['./snagging-document.component.css']
})
export class SnaggingDocumentComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<InspectionDocView> = new Subject();

  reports: InspectionDocView[] = [];

  constructor(
    private router: Router,
    private tradeMaintanceService: TradeMaintanceService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 25]
    };


      this.tradeMaintanceService.getAllInspectionDocReports().subscribe((data) => {
        console.log('----> office service : get all data', data);
        this.reports = data;

        // ADD THIS
        this.dtTrigger.next();

      }, (err) => {
        console.log('-----> err', err);
      })

  }

  loader = {}
  errorInDownload = {}
  donwloadReport(id) {
    delete this.errorInDownload[id]
    this.loader[id] = true
    this.commonService.downloadSignOffReport(id)
      .subscribe(data => {
        console.log('report donloed')
        delete this.loader[id]

      },
        err => {
          console.log(err)
          this.errorInDownload[id] = true
          delete this.loader[id]

        })
  }
}


