import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-create-scheme-mom-report',
  templateUrl: './create-scheme-mom-report.component.html',
  styleUrls: ['./create-scheme-mom-report.component.css']
})
export class CreateSchemeMomReportComponent implements OnInit {
  momschemeForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private snackBar: SnackBarComponent
  ) { }

  momId: Number
  momReportId: Number

  ngOnInit() {

    this.momId = this.route.snapshot.params['momId']
    this.momReportId = this.route.snapshot.params['id']

    if (this.momReportId != -1) {
      this.reportService.getMomReportById(this.momReportId)
        .subscribe(data => {
          console.log(data)
          this.momschemeForm.patchValue(data)
        })
    }

    console.log(this.momId, this.momReportId)
    this.momschemeForm = this.formBuilder.group({
      reference: ['', Validators.required],
      discussionPoint: ['', Validators.required],
      planAction: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      targetDate: ['', Validators.required],
    })
  }

  load: boolean = false
  onSubmit() {
    this.load = true
    let formData = {
      schemeMomId: Number(this.momId),
      ...this.momschemeForm.value
    }
    if (this.momReportId == -1) {
      this.reportService.addMomReportPoints(formData)
        .subscribe(data => {
          console.log('added point', data)
          this.load = false
          this.snackBar.showSuccess('Meeting Point Added')
        }, err => {
          this.load = false
          this.snackBar.showSnackError()
        })
    } else {
      this.reportService.updateMomReportPoint(this.momReportId, formData)
      .subscribe(data =>{
        console.log('added point', data)
          this.load = false
          this.snackBar.showSuccess('Meeting Point Updated')
      }, err => {
        this.load = false
        this.snackBar.showSnackError()
      })
    }
    console.log(formData)
  }

}
