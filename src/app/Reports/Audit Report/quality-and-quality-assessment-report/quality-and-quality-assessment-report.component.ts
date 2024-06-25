import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { ProjectData } from 'src/app/project/project.component';

@Component({
  selector: 'app-quality-and-quality-assessment-report',
  templateUrl: './quality-and-quality-assessment-report.component.html',
  styleUrls: ['./quality-and-quality-assessment-report.component.css']
})
export class QualityAndQualityAssessmentReportComponent implements OnInit {
  projects: ProjectData[] = []

  dtOptions:any
  dtTrigger:any

  isLoading: boolean = false
  SelProject:any
  constructor(
    private commonservice: CommonService
  ) { }

  ngOnInit() {
    this.commonservice.getAllProject().subscribe((data) => {
      this.projects = data
      console.log(data)
    })
  }

  getdata() {
    console.log('data for project....')
  }
}
