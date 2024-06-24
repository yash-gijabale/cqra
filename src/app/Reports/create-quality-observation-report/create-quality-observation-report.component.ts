import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quality-observation-report',
  templateUrl: './create-quality-observation-report.component.html',
  styleUrls: ['./create-quality-observation-report.component.css']
})
export class CreateQualityObservationReportComponent implements OnInit {
  qualityObservationReportForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.qualityObservationReportForm = this.formBuilder.group({
      observation: ['', Validators.required],
      remark: ['', Validators.required],
      location: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
    })
  }

  onSubmit() {
    let formdata = {
      qualityObservationReport: {
        ...this.qualityObservationReportForm.value
      }
    }
    console.log(formdata)
  }

}
