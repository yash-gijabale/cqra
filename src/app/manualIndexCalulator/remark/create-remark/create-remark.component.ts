import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-create-remark',
  templateUrl: './create-remark.component.html',
  styleUrls: ['./create-remark.component.css']
})
export class CreateRemarkComponent implements OnInit {

  snapAuditId: number
  remarkId: number
  remarkFrom: FormGroup
  submitted:boolean = true;
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


    this.clinetService.retirveRemark(this.remarkId)
    .pipe(first())
    .subscribe(data => {
      this.remarkFrom.patchValue(data)
    })


  }

  get f()
  {
    return this.remarkFrom.controls
  }

  onSubmit()
  {
    if(this.remarkId != -1)
    {
      let formData = 
      {
        snapAuditId: this.snapAuditId,
        lastMoteText: this.remarkFrom.value.lastMoteText
      }

      this.clinetService.updateRemark(formData, this.remarkId)
      .subscribe(data => {
        console.log('updated')
      })
    }
  }

}
