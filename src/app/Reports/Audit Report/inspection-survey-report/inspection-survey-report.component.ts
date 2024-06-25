import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inspection-survey-report',
  templateUrl: './inspection-survey-report.component.html',
  styleUrls: ['./inspection-survey-report.component.css']
})
export class InspectionSurveyReportComponent implements OnInit {

  isLoading: boolean = false
  dtOptions:any
  dtTrigger:any
  constructor() { }

  ngOnInit() {
  }

}
