import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-download-reports',
  templateUrl: './download-reports.component.html',
  styleUrls: ['./download-reports.component.css']
})
export class DownloadReportsComponent implements OnInit {
  downloadReportForm: FormGroup

  SelClient: any
  SelProject:any

  clients: ClientData[] = []
  projects: ProjectData[] = []

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      console.log(data);
      this.clients = data
    })


    this.downloadReportForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      reportFrom: ['', Validators.required],
      reportTo: ['', Validators.required],
      reportType: ['', Validators.required],
      reportNumber: ['', Validators.required],

    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => [
      this.projects = data
    ])
  }

  onSubmit() {
    let formData = {
      downloadReport: {
        ...this.downloadReportForm.value
      }
    }
    console.log(formData)
  }

}
