import { Component, OnInit, ViewChild, destroyPlatform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";

export class MisDecisionForm {
  constructor(
    public fkMisId: Number,
    public item: string,
    public recommendation: String,
    public active: Number
  ) { }
}


export class MisDecisionData {
  constructor(
    public itemId: Number,
    public fkMisId: Number,
    public item: string,
    public recommendation: String,
    public active: Number
  ) { }
}
@Component({
  selector: 'app-mis-decision',
  templateUrl: './mis-decision.component.html',
  styleUrls: ['./mis-decision.component.css']
})


export class MisDecisionComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MisDecisionData> = new Subject<MisDecisionData>();
  decisionForm: FormGroup
  misId: number
  isLoading = false
  submitted = false
  isUpdate = false

  decisions: MisDecisionData
  decisionId: Number

  constructor(
    private formBulider: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };
    this.misId = this.route.snapshot.params['id']

    this.decisionForm = this.formBulider.group({
      item: ['', Validators.required],
      recommendation: ['', Validators.required],
    })


    this.commonService.getAllMisDecision(this.misId)
      .subscribe(data => {
        console.log(data)
        this.decisions = data
        this.dtTrigger.next()
      })
  }

  get f() {
    return this.decisionForm.controls
  }

  onSubmit() {
    console.log(this.decisionForm.value)
    let formData = {
      fkMisId: Number(this.misId),
      item: this.decisionForm.value.item,
      recommendation: this.decisionForm.value.recommendation,
      active: 1
    }

    if (this.isUpdate) {
      this.commonService.updateMisDecision(formData, this.decisionId )
      .subscribe(data => {
        console.log('dtat updated', data)
        this.isUpdate = false
      })

    } else {

      console.log(formData)
      this.commonService.addMisDesicion(formData)
        .subscribe(data => {
          console.log('decision added', data)
          this.decisionForm.reset()
        })
    }
  }

  editDecision(id) {
    this.isUpdate = true
    this.commonService.retriveDecision(id)
      .subscribe(data => {
        console.log(data)
        this.decisionId = data.itemId
        this.decisionForm.patchValue(data)
      })
  }

}
