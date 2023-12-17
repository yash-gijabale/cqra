import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators'
import { from } from 'rxjs';
import { error } from 'console';
export class InspectionActivityData {
  constructor(
    public snapAuditId: number,
    public description: string
  ) { }
}

@Component({
  selector: 'app-create-inspection-activity',
  templateUrl: './create-inspection-activity.component.html',
  styleUrls: ['./create-inspection-activity.component.css']
})
export class CreateInspectionActivityComponent implements OnInit {

  snapAuditId: number
  inspectionActivityID: number
  inspectionActivityFrom: FormGroup
  submitted = false

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']
    this.inspectionActivityID = this.route.snapshot.params['id2']

    if (this.inspectionActivityID != -1) {
      this.clientService.retriveInspectionActivity(this.inspectionActivityID)
        .pipe(first())
        .subscribe(data => {
          this.inspectionActivityFrom.patchValue(data)
        })
    }

    this.inspectionActivityFrom = this.formBuilder.group({
      description: ['', Validators.required]
    })
  }

  get f() {
    return this.inspectionActivityFrom.controls;
  }

  onSubmit() {
    this.submitted = true
    if (this.inspectionActivityFrom.invalid) {
      return
    }
    let formData = {
      snapAuditId: this.snapAuditId,
      description: this.inspectionActivityFrom.value.description
    }
    console.log(formData)

    if (this.inspectionActivityID != -1) {

      this.clientService.updateInspectionActivity(formData, this.inspectionActivityID)
        .subscribe(data => {
          console.log('updated')
        }, (err) => {
          console.log(err)
        })
    }else{
      this.clientService.createInspectionActivity(formData)
      .subscribe(
        data => console.log('created-->', data),
        err =>  console.log(err)
      )
    }

  }

}
