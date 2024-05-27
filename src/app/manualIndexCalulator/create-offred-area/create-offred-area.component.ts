import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from "rxjs/operators";
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';


export class offerdAreaData {
  constructor(
    public snapAuditId: number,
    public offeredAreaName: string

  ) { }
}

@Component({
  selector: 'app-create-offred-area',
  templateUrl: './create-offred-area.component.html',
  styleUrls: ['./create-offred-area.component.css']
})
export class CreateOffredAreaComponent implements OnInit {
  snapAuditId: number
  offredId: number
  offerdForm: FormGroup
  submitted: boolean = false;
  isLoading = false
  constructor(
    private clientService: ClientServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']
    this.offredId = this.route.snapshot.params['id2']

    if (this.offredId != -1) {
      this.isLoading = true
      this.clientService.retriveOfferedArea(this.offredId)
        .pipe(first())
        .subscribe(data => {
          console.log(data)
          this.offerdForm.patchValue(data)
          this.isLoading = false
        })
    }

    this.offerdForm = this.formBuilder.group({
      offeredAreaName: ['', Validators.required]
    })
  }

  get f() {
    return this.offerdForm.controls;
  }

  load: boolean = false
  onSubmit() {
    this.submitted = true
    if (this.offerdForm.invalid) {
      return
    }
    this.load = true
    let formData = {
      snapAuditId: this.snapAuditId,
      offeredAreaName: this.offerdForm.value.offeredAreaName
    }
    console.log(formData)

    if (this.offredId != -1) {
      this.clientService.updateOfferedArea(formData, this.offredId)
        .subscribe(data => {
          console.log('updated')
          this.load = false
          this.snackBar.showSuccess('Offered area updated')
        }, err => {
          this.load = false
          this.snackBar.showSnackError()
        })
    } else {
      this, this.clientService.createOffredArea(formData)
        .subscribe(
          data => {
            console.log('created--->', data)
            this.load = false
            this.snackBar.showSuccess('Offered area created')
          },
          err => {
            console.log(err)
            this.load = false
            this.snackBar.showSnackError()
          }
        )
    }
  }
}
