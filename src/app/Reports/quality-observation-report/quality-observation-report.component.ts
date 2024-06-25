import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quality-observation-report',
  templateUrl: './quality-observation-report.component.html',
  styleUrls: ['./quality-observation-report.component.css']
})
export class QualityObservationReportComponent implements OnInit {

  isLoading:boolean = false
  dtOptions:any
  dtTrigger:any
  constructor() { }

  ngOnInit() {
  }

}
