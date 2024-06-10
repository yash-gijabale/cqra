import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';

@Component({
  selector: 'app-minutes-of-meeting-log',
  templateUrl: './minutes-of-meeting-log.component.html',
  styleUrls: ['./minutes-of-meeting-log.component.css']
})
export class MinutesOfMeetingLogComponent implements OnInit {
  momlogForm: FormGroup
  QC: any
  M: any
  QR: any

  SelClient: any
  SelProject: any
  SelMeeting: any

  clients: ClientData[] = []
  projects: ProjectData[] = []


  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.momlogForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      meetingType: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
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
      momLogReport: {
        ...this.momlogForm.value,
      }
    }
    console.log(formData)

  }

}
