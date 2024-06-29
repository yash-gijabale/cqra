import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-create-quality-observation-report',
  templateUrl: './create-quality-observation-report.component.html',
  styleUrls: ['./create-quality-observation-report.component.css']
})
export class CreateQualityObservationReportComponent implements OnInit {
  qualityObservationReportForm: FormGroup
  reportId: Number
  recordId: Number

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private snackBar: SnackBarComponent,
    private router: Router
  ) { }

  ngOnInit() {

    this.reportId = Number(this.route.snapshot.params['reportId'])
    this.recordId = Number(this.route.snapshot.params['id'])

    this.qualityObservationReportForm = this.formBuilder.group({
      observation: ['', Validators.required],
      remark: ['', Validators.required],
      location: ['', Validators.required],
      image1: ['', Validators.nullValidator],
      image2: ['', Validators.nullValidator],
    })
  }

  activeBtn: Number
  btnLoad: boolean = false
  onSubmit(btnType) {
    this.btnLoad = true
    this.activeBtn = btnType
    let formdata = {
      qualityObservationId: this.reportId,
      ...this.qualityObservationReportForm.value

    }
    console.log(formdata)
    this.reportService.addObservationToQualityReport(formdata)
      .subscribe(data => {
        console.log(data)
        this.btnLoad = false
        this.snackBar.showSuccess('Observation Added')
        if (btnType === 0) {
          this.router.navigate(['manage-quality-observation-report', this.reportId])
        }
      }, err => {
        console.log(err)
        this.btnLoad = false
        this.snackBar.showSnackError()
      })
  }

}
