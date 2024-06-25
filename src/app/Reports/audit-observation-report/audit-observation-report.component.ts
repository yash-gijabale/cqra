import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-observation-report',
  templateUrl: './audit-observation-report.component.html',
  styleUrls: ['./audit-observation-report.component.css'] 
})
export class AuditObservationReportComponent implements OnInit {
  isLoading:boolean = false
  dtOptions:any
  dtTrigger:any

  constructor() { }

  ngOnInit() {
  }

}
