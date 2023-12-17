import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from "rxjs/operators";


@Component({
  selector: 'app-create-stage-of-work',
  templateUrl: './create-stage-of-work.component.html',
  styleUrls: ['./create-stage-of-work.component.css']
})
export class CreateStageOfWorkComponent implements OnInit {

  snapAuditId: number
  stageWorkID: number
  stageOfWorkFrom: FormGroup
  submitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']
    this.stageWorkID = this.route.snapshot.params['id2']

    this.stageOfWorkFrom = this.formBuilder.group({
      qualityRecommandationText: ['', Validators.required]
    })

    if(this.stageWorkID != -1)
    {

      this.clientService.retirveStageOfWork(this.stageWorkID)
        .pipe(first())
        .subscribe(data => {
          console.log(data)
          this.stageOfWorkFrom.patchValue(data)
        })
    }

  }

  get f() {
    return this.stageOfWorkFrom.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.stageOfWorkFrom.invalid) {
      return
    }
    let fromData = {
      snapAuditId: this.snapAuditId,
      qualityRecommandationText: this.stageOfWorkFrom.value.qualityRecommandationText
    }
    if (this.stageWorkID != -1) {
      this.clientService.updateStageOfWork(fromData, this.stageWorkID)
        .subscribe(data => {
          console.log('updated')
        })
    } else {
      this.clientService.createStageOfWork(fromData)
        .subscribe(
          data => console.log(data),
          err => console.log(err)
        )
    }
  }

}
