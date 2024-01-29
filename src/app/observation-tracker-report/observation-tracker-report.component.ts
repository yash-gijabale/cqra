import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

export class OtrData{
  constructor(
    public id: Number,
    public clientId: Number,
    public projectId: Number,
    public structureId: Number,
    public stageId: String,
    public tradeId: String,
    public fromDate: String,
    public toDate: String,
    public clientRep: String,
    public cqraRep: String,
    public otherPerson: String,
    public note: String,
    public reportName: String,
    public projectName: String,
    public ClientName: String,
    public StructureName: String
  ){}
}

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
  dtTrigger: Subject<OtrData> = new Subject<OtrData>();

  OTRdata: OtrData
  isLoading = false

  constructor(
    private commonService: CommonService,
    private router: Router

  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      scrollX: true
     
    };

    this.isLoading = true
    this.commonService.getAllOtrReport()
    .subscribe(data => {
      console.log(data)
      this.OTRdata = data
      this.dtTrigger.next()
      this.isLoading = false
    })
  }

  edit(id){
    this.router.navigate(['createOTR', id, 1])
  }

}
