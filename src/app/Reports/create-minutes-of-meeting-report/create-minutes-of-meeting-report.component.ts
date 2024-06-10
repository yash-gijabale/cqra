import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';

@Component({
  selector: 'app-create-minutes-of-meeting-report',
  templateUrl: './create-minutes-of-meeting-report.component.html',
  styleUrls: ['./create-minutes-of-meeting-report.component.css']
})
export class CreateMinutesOfMeetingReportComponent implements OnInit {
  momForm: FormGroup
  QC: any;
  M: any;
  QR: any;

  SelClient: any
  SelProject: any
  SelMeeting: any

  clients: ClientData[] = []
  projects: ProjectData[] = []

  constructor(
    private formbuilder: FormBuilder,
    private commonService: CommonService,
    private clientService: ClientServiceService,

  ) { }

  ngOnInit() {
    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.momForm = this.formbuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      meetingType: ['', Validators.required],
      meetingDate: ['', Validators.required],
      location: ['', Validators.required],
      clientPerson: ['', Validators.required],
      contractor: ['', Validators.required],
      cqraPerson: ['', Validators.required],
      otherPerson: ['', Validators.required],
      consultant: ['', Validators.required],
      note: ['', Validators.required],
    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe(data => {
      // console.log('client projects-->', data)
      this.projects = data
    })
  }




  onSubmit() {
    let formData = {
      momReport: {
        ...this.momForm.value,
      }
    }
    console.log(formData)

  }

}
