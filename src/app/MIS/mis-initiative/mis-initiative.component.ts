import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';

export class MisInitiativeData {
  constructor(
    public itemId: Number,
    public fkMisId: Number,
    public item: string,
    public recommendation: String,
    public active: Number
  ) { }
}
@Component({
  selector: 'app-mis-initiative',
  templateUrl: './mis-initiative.component.html',
  styleUrls: ['./mis-initiative.component.css']
})
export class MisInitiativeComponent implements OnInit {

  initiativeFrom: FormGroup
  misId:Number
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.misId = this.route.snapshot.params['id']
    this.initiativeFrom = this.formBuilder.group({
      item: ['', Validators.required]
    })
  }

  get f(){
    return this.initiativeFrom.controls
  }

  onSubmit(){
    let formData = {
      fkMisId: Number(this.misId),
      item: this.initiativeFrom.value.item,
      active: 1
    }

    this.commonService.addMisInitiative(formData)
  }

}
