import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from "rxjs/operators";
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';


export class AssessorNameData {
  constructor(
    public snapAuditId: number,
    public assessordName: string
  ) { }
}

@Component({
  selector: 'app-create-accessor-name',
  templateUrl: './create-accessor-name.component.html',
  styleUrls: ['./create-accessor-name.component.css']
})
export class CreateAccessorNameComponent implements OnInit {

  snapAuditId: number
  assessorId: number
  assessorForm: FormGroup
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cleintService: ClientServiceService,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {

    this.snapAuditId = this.route.snapshot.params['id']
    this.assessorId = this.route.snapshot.params['id2']

    if (this.assessorId != -1) {
      this.cleintService.retirveAssessor(this.assessorId)
        .pipe(first())
        .subscribe(data => {
          this.assessorForm.patchValue(data)
        })
    }

    this.assessorForm = this.formBuilder.group({
      assessordName: ['', Validators.required]
    })


  }
  get f() {
    return this.assessorForm.controls;
  }

  isLoad: boolean = false
  onSubmit() {
    this.submitted = true
    if (this.assessorForm.invalid) {
      return
    }
    this.isLoad = true
    let formData = {
      snapAuditId: this.snapAuditId,
      assessordName: this.assessorForm.value.assessordName
    }
    console.log(formData)

    if (this.assessorId != -1) {
      this.cleintService.updateAssessorName(formData, this.assessorId)
        .subscribe(data => {
          console.log('updates')
          this.isLoad = false
          this.snackBar.showSuccess('Assessor updated')
        }, err => {
          this.isLoad = false
          this.snackBar.showSnackError()
        })
    } else {
      this.cleintService.createAssessor(formData)
        .subscribe(
          data => {
            console.log('creared--->', data)
            this.isLoad = false
            this.snackBar.showSuccess('Assessor created')
          },
          err => {
            console.log(err)
            this.isLoad = false
            this.snackBar.showSnackError()

          }
        )
    }
  }
}
