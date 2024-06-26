import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quality-observation-report',
  templateUrl: './quality-observation-report.component.html',
  styleUrls: ['./quality-observation-report.component.css']
})
export class QualityObservationReportComponent implements OnInit {

  isLoading:boolean = false
  reportId:Number

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reportId = this.route.snapshot.params['id']
  }

}
