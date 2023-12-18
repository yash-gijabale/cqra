import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-remark',
  templateUrl: './create-remark.component.html',
  styleUrls: ['./create-remark.component.css']
})
export class CreateRemarkComponent implements OnInit {

  snapAuditId: number
  remarkId: number
  remarkFrom: FormGroup
  submitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private clinetService: ClientServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']
    this.remarkId = this.route.snapshot.params['id2']

    this.remarkFrom = this.formBuilder.group({
      lastMoteText: ['', Validators.required]
    })

    if (this.remarkId != -1) {
      this.clinetService.retirveRemark(this.remarkId)
        .pipe(first())
        .subscribe(data => {
          this.remarkFrom.patchValue(data)
        })
    }


  }

  get f() {
    return this.remarkFrom.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.remarkFrom.invalid) {
      return
    }
    let formData ={
      snapAuditId: this.snapAuditId,
      lastMoteText: this.remarkFrom.value.lastMoteText
    }
    if (this.remarkId != -1) {

      this.clinetService.updateRemark(formData, this.remarkId)
        .subscribe(data => {
          console.log('updated')
        })
    }else{
      this.clinetService.createRemakr(formData)
      .subscribe(
        data => console.log('created -->', data),
        err =>  console.log(err)
      )
    }
  }

}
