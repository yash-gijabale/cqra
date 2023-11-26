import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from "rxjs/operators";


export class AssessorNameData {
  constructor(
    public snapAuditId: number,
    public assessordName: string
  ){}
}

@Component({
  selector: 'app-create-accessor-name',
  templateUrl: './create-accessor-name.component.html',
  styleUrls: ['./create-accessor-name.component.css']
})
export class CreateAccessorNameComponent implements OnInit {

  snapAuditId: number
  assessorId:number
  assessorForm: FormGroup
  submitted:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cleintService: ClientServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.snapAuditId = this.route.snapshot.params['id']
    this.assessorId = this.route.snapshot.params['id2']

    this.cleintService.retirveAssessor(this.assessorId)
    .pipe(first())
    .subscribe(data => {
      this.assessorForm.patchValue(data)
    })

    this.assessorForm = this.formBuilder.group({
      assessordName: ['', Validators.required]
    })


  }
  get f() {
    return this.assessorForm.controls;
  }

  onSubmit()
  {
    let formData = {
      snapAuditId: this.snapAuditId,
      assessordName: this.assessorForm.value.assessordName
    }
    console.log(formData)

    this.cleintService.updateAssessorName(formData, this.assessorId)
    .subscribe(data => {
      console.log('updates')
    })
  }
}
