import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { first } from "rxjs/operators";
import { runInThisContext } from 'vm';
import { data } from 'jquery';


export class SampledAreaData {
  constructor(
    public sampledAreaId: number,
    public sampledAreaName: string
  ) { }
}

@Component({
  selector: 'app-create-sampled-area',
  templateUrl: './create-sampled-area.component.html',
  styleUrls: ['./create-sampled-area.component.css']
})
export class CreateSampledAreaComponent implements OnInit {
  snapAuditId: number;
  sampledAreaId: number
  sampledAreaForm: FormGroup
  submitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params["id"];
    this.sampledAreaId = this.route.snapshot.params["id2"];
    this.sampledAreaForm = this.formBuilder.group({
      sampledAreaName: ['', Validators.required]
    })

    if (this.sampledAreaId != -1) {
      this.clientService.retriveSampledArea(this.sampledAreaId)
        .pipe(first())
        .subscribe(data => {
          this.sampledAreaForm.patchValue(data)
        })
    }

  }
  get f() {
    return this.sampledAreaForm.controls;
  }

  onSubmit() {
    this.submitted = true
    if (this.sampledAreaForm.invalid) {
      return
    }

    let formData = {
      sampledAreaId: this.snapAuditId,
      sampledAreaName: this.sampledAreaForm.value.sampledAreaName
    }
    console.log(formData);

    if (this.sampledAreaId != -1) {
      this.clientService.updateSampledArea(formData, this.sampledAreaId)
        .subscribe(data => {
          console.log('updated')
        })
    }else{
      this.clientService.createSampledArea(formData)
      .subscribe(
        data => console.log('created--->', data),
        err => console.log(err)
      )
    }
  }

}
