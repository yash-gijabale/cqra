import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
export class MisAppriciateForm {
  constructor(
    public fkMisId: Number,
    public item: String,
    public active: Number
  ) { }
}

export class MisAppriciateData {
  constructor(
    public itemId: Number,
    public fkMisId: Number,
    public item: String,
    public active: Number
  ) { }
}

@Component({
  selector: 'app-mis-appriciation',
  templateUrl: './mis-appriciation.component.html',
  styleUrls: ['./mis-appriciation.component.css']
})


export class MisAppriciationComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MisAppriciateData> = new Subject<MisAppriciateData>();
  appriciationForm: FormGroup
  misId: number

  misData: MisAppriciateData[]

  appriciationId: number

  isUpdate = false
  isLoading = false

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
    this.commonService.misGetAllAppriceiate(this.misId)
      .subscribe(data => {
        console.log(data)
        this.misData = data
        this.dtTrigger.next()
      })
    this.appriciationForm = this.formBulider.group({
      item: ['', Validators.required]
    })

  }

  get f() {
    return this.appriciationForm.controls
  }

  onSubmit() {
    console.log(this.appriciationForm.value)
    let formData = {
      fkMisId: Number(this.misId),
      item: this.appriciationForm.value.item,
      active: 1
    }

    if (this.isUpdate) {
      this.commonService.updateMisAppriciation(formData, this.appriciationId)
        .subscribe(data => console.log('updated-->', data))
    } else {
      this.commonService.misAddAppriciate(formData)
        .subscribe(data => {
          console.log('Appriciated added-->', data)
          this.commonService.misGetAllAppriceiate(this.misId)
            .subscribe(data => {
              this.misData = data
              this.dtTrigger.next()
            })
        })
    }
  }

  editNote(id) {
    this.isUpdate = true;
    this.commonService.retreiveMisAppriciation(id)
      .subscribe(data => {
        console.log(data)
        this.appriciationId = Number(data.itemId)
        console.log(this.appriciationId)
        this.appriciationForm.patchValue({ item: data.item })
      })
  }
}
