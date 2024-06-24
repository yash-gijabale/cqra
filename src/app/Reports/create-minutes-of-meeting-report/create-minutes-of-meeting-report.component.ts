import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';
import { ReportService } from 'src/app/service/report.service';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';
import { ActivatedRoute } from '@angular/router';

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

  momId: Number

  constructor(
    private formbuilder: FormBuilder,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private reportService: ReportService,
    private snackBar: SnackBarComponent,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    this.momId = this.route.snapshot.params['id']

    if (this.momId !== -1) {
      this.reportService.getMomReportById(this.momId)
        .subscribe((data:any) => {
          console.log(data)
          this.commonService.getClientProject(data.clientId).subscribe(data => { this.projects = data })
          this.momForm.patchValue(data)
        })
    }

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.momForm = this.formbuilder.group({
      clientId: ['', Validators.required],
      schemeId: ['', Validators.required],
      typeOfMeeting: ['', Validators.required],
      dateOfMom: ['', Validators.required],
      meetingLocation: ['', Validators.required],
      clientStaff: ['', Validators.required],
      contractorName: ['', Validators.required],
      cqraPerson: ['', Validators.required],
      otherText: ['', Validators.required],
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



  loadBtn: boolean = false
  onSubmit() {
    this.loadBtn = true

    if (this.momId == -1) {
      this.reportService.createSchemeMomReport(this.momForm.value)
        .subscribe(data => {
          console.log('added', data)
          this.loadBtn = false
          this.snackBar.showSuccess('Minute Of Meeting Added')
        }, err => {
          console.log('err-->', err)
          this.loadBtn = false
          this.snackBar.showSnackError()

        })
    } else {
      this.reportService.updateSchemeMom(this.momId, this.momForm.value)
        .subscribe(data => {
          console.log('updated', data)
          this.loadBtn = false
          this.snackBar.showSuccess('Minute Of Meeting Updated')
        }, err => {
          console.log('err-->', err)
          this.loadBtn = false
          this.snackBar.showSnackError()

        })
    }

  }

}
