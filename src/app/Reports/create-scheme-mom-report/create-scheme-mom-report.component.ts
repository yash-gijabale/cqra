import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-scheme-mom-report',
  templateUrl: './create-scheme-mom-report.component.html',
  styleUrls: ['./create-scheme-mom-report.component.css']
})
export class CreateSchemeMomReportComponent implements OnInit {
  momschemeForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.momschemeForm = this.formBuilder.group({
      reference: ['', Validators.required],
      dissPoint: ['', Validators.required],
      planAction: ['', Validators.required],
      resPerson: ['', Validators.required],
      tergetDate: ['', Validators.required],
    })
  }

  onSubmit() {
    let formData = {
      momSchemeReport: {
        ...this.momschemeForm.value
      }
    }
    console.log(formData)
  }

}
