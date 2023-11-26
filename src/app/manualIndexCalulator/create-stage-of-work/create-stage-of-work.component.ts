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
  submitted:boolean = true;
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

    this.clientService.retirveStageOfWork(this.stageWorkID)
    .pipe(first())
    .subscribe(data => {
      console.log(data)
      this.stageOfWorkFrom.patchValue(data)
    })

  }

  get f()
  {
    return this.stageOfWorkFrom.controls
  }

  onSubmit()
  {
    if(this.stageWorkID != -1)
    {
      let fromData = {
        snapAuditId: this.snapAuditId,
        qualityRecommandationText: this.stageOfWorkFrom.value.qualityRecommandationText
      }

      this.clientService.updateStageOfWork(fromData ,this.stageWorkID)
      .subscribe(data => {
        console.log('updated')
      })
    }
  }

}
