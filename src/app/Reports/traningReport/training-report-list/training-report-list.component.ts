import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/common.service';

export class TrainingReportData {
  constructor(
    public id: Number,
    public name: String
  ) { }
}

@Component({
  selector: 'app-training-report-list',
  templateUrl: './training-report-list.component.html',
  styleUrls: ['./training-report-list.component.css']
})
export class TrainingReportListComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<TrainingReportData> = new Subject();

  trainingData: TrainingReportData[]

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.loadData = {}
    this.trainingData = [{ id: 8, name: 'jdb' }]
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50]
    };
    this.commonService.getAllTraningReport()
      .subscribe(data => {
        console.log(data)
        this.trainingData = data
        this.dtTrigger.next()
      })
  }

  loadData: any = {

  }
  download(id) {
    this.loadData[id] = {
      load: true,
      url: ''
    }
    this.commonService.downloadTrainingReport(id)
      .subscribe(data => {
        console.log(data)
        this.loadData[id].load = false
        this.loadData[id].url = data.url
      })
  }

}
