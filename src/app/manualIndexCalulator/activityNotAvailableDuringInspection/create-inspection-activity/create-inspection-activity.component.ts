import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators'
import { from } from 'rxjs';
export class InspectionActivityData{
  constructor(
    public snapAuditId: number,
    public description: string
  ){}
}

@Component({
  selector: 'app-create-inspection-activity',
  templateUrl: './create-inspection-activity.component.html',
  styleUrls: ['./create-inspection-activity.component.css']
})
export class CreateInspectionActivityComponent implements OnInit {

  snapAuditId: number
  inspectionActivityID: number
  inspectionActivityFrom : FormGroup

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']
    this.inspectionActivityID = this.route.snapshot.params['id2']

    if(this.inspectionActivityID != -1)
    {
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
  
  onSubmit()
  {
    let formData = {
      snapAuditId : this.snapAuditId,
      description: this.inspectionActivityFrom.value.description
    }
    console.log(formData)
    this.clientService.updateInspectionActivity(formData, this.inspectionActivityID)
    .subscribe(data => {
      console.log('updated')
    }, (err) => {
      console.log(err)
    })
  }

}
