import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';

@Component({
  selector: 'app-create-kickoff',
  templateUrl: './create-kickoff.component.html',
  styleUrls: ['./create-kickoff.component.css']
})
export class CreateKickoffComponent implements OnInit {
  kickOfMeetingForm: FormGroup;
  submitted = false;
  SelProject: Number = 0;
  SelClient: Number = 0;;
  clients: ClientData[]
  projects: ProjectData[] = []

  clientdata = {}
  projectData = {}

  constructor(
    private formBuilder: FormBuilder,
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {
    this.clientServiceService.getAllClients().subscribe((data) => {
      this.clients = data;
      this.convertData(data)
    }, (err) => {
      console.log('-----> err', err);
    })

    //   {
    //     "clientName": "Client Name",
    //     "projectName": "Project Name",

    // }

    this.kickOfMeetingForm = this.formBuilder.group({

      authorizedManagementRepresentative: ['', Validators.required],
      authorizedProjectRepresentative: ['', Validators.required],
      kickoffMeetingDate: ['', Validators.required],
      clientCode: ['', Validators.required],
      projectCode: ['', Validators.required],
      dateof1stReviewmeetingeiththetopManagement: ['', Validators.required],
      tragetDateforfinalization: ['', Validators.required],
      Sscheduleofsite1stphasefrequency: ['', Validators.required],
      scheduleofsite1stphaseattendedby: ['', Validators.required],
      scheduleofsite2ndphasefrequency: ['', Validators.required],
      scheduleofsitephaseattendedby: ['', Validators.required],
      qualityreviewmeetingastphasefrequency: ['', Validators.required],
      qualityreviewmeeting1stphaseattendedby: ['', Validators.required],
      qualityreviewmeeting2ndphasefrequency: ['', Validators.required],
      qualityreviewmeeting2ndphaseAttendedby: ['', Validators.required],
      qualitycirclemeeting1stphasefrequency: ['', Validators.required],
      qualitycirclemeeting1stphaseattendedby: ['', Validators.required],
      qualitycirclemeeting2ndphasefrequeny: ['', Validators.required],
      qualitycirclemeeting2ndphaseattendedby: ['', Validators.required],
      targetdatefor1sttraining: ['', Validators.required],
      targetdateoforientationmeetingforsitestaff: ['', Validators.required],
      targetdateforfinalizationof1sttradeforqualityinspectionparameters: ['', Validators.required],
      targetdateforapprovalof1stmockup: ['', Validators.required],
      qualityupdatereportfrequency: ['', Validators.required],
      qualityupdatereportaddressedto: ['', Validators.required],
      qualityupdatereportccto: ['', Validators.required],
      qualityreviewreportsfrequency: ['', Validators.required],
      qualityreviewreportsaddreddedto: ['', Validators.required],
      qualityreviewreportsccto: ['', Validators.required],
      qualityindexreportfrequency: ['', Validators.required],
      qualityindexreportaddressedto: ['', Validators.required],
      qualityindexreportccto: ['', Validators.required],
      misreportfrequency: ['', Validators.required],
      misreportaddressedto: ['', Validators.required],
      misreportccto: ['', Validators.required],
      othercqradeliverabletoclient: ['', Validators.required],
      authorityToTakePhotographsofNCS: ['', Validators.required],
      authorityToStopWorkInCaseOfSeriousnonconformities: ['', Validators.required],
      methodofapprovalofcqrabill: ['', Validators.required],
      redAlertAddressto: ['', Validators.required],
      greenRedcardissue: ['', Validators.required],
      allocationOfTableSpaceandShelfSpace: ['', Validators.required],
      telephoneFacilityfordailyReporting: ['', Validators.required],
      permissionOfCqraDressCode: ['', Validators.required],
      clientRepresentative: ['', Validators.required],
      cqraRepresentative: ['', Validators.required],
    })

  }
  get f() { return this.kickOfMeetingForm.controls; }

  convertData(data) {
    data.forEach(d => {
      if (!this.clientdata[d.clientId]) {
        this.clientdata[d.clientId] = d.clientName
      }
    })
  }

  convertProjectData(data) {
    data.forEach(d => {
      if (!this.projectData[d.projectId]) {
        this.projectData[d.projectId] = d.projectName
      }
    })
  }

  load: boolean = false
  url: String = ''
  onSubmit() {
    this.load = true
    console.log("Id==");
    let formData = {
      clientName: this.clientdata[String(this.SelClient)],
      projectName: this.projectData[String(this.SelProject)],
      ...this.kickOfMeetingForm.value
    }
    console.log(formData)
    this.commonService.downloadKickoffReport(this.SelProject, this.SelClient, formData)
      .subscribe(data => {
        console.log(data)
        let d:any = data
        this.load = false,
        this.url =  d.url
      }, err =>{
        this.load = false
        this.snackBar.showSnackError()
      })

  }

  getProject(e) {
    let id = Number(e.target.value)
    this.SelClient = id
    this.commonService.getClientProject(id).subscribe(data => {
      this.projects = data
      console.log(data)
      this.convertProjectData(data)
    })
  }

  setProject(e) {
    let id = Number(e.target.value)
    this.SelProject = id
  }



}