import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { data } from 'jquery';

export class MisTopPerformanceFrom {
  constructor(
    public fkMisId: Number,
    public personName: Number,
    public designation: Number,
    public active: Number
  ) { }
}


export class MisTopPerformanceData {
  constructor(
    public personId: Number,
    public fkMisId: Number,
    public personName: Number,
    public designation: Number,
    public active: Number
  ) { }
}
@Component({
  selector: 'app-mis-top-performance',
  templateUrl: './mis-top-performance.component.html',
  styleUrls: ['./mis-top-performance.component.css']
})
export class MisTopPerformanceComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MisTopPerformanceData> = new Subject<MisTopPerformanceData>();
  topPerformanceForm: FormGroup
  misId: Number
  topPerformance: MisTopPerformanceData
  submitted = false
  isLoading = false
  isUpdate = false
  constructor(
    private fromBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true

    this.misId = this.route.snapshot.params['id']
    this.topPerformanceForm = this.fromBuilder.group({
      personName: ['', Validators.required],
      designation: ['', Validators.required]
    })

    this.commonService.getAllMisTopPerformance(this.misId)
      .subscribe(data => {
        this.topPerformance = data
        this.dtTrigger.next()
        this.isLoading = false
      })
  }

  get f() {
    return this.topPerformanceForm.controls
  }

  onSubmit() {
    this.submitted = true
    console.log(this.topPerformanceForm.value)
    let formData = {
      fkMisId: this.misId,
      personName: this.topPerformanceForm.value.personName,
      designation: this.topPerformanceForm.value.designation,
      active: 1
    }

    if (this.isUpdate) {
      this.commonService.updateMisTopPerformance(formData, this.misId)
      .subscribe(data =>{
        console.log('updataed', data)
      })
    } else {


      this.commonService.createMisTopPerformance(formData)
        .subscribe(data => {
          console.log('crrated-->', data)
        })
    }
  }

  editMis(id) {
    this.isUpdate = true
    this.commonService.getMisTopPerformance(id)
      .subscribe(data => {
        this.topPerformanceForm.patchValue(data)
      })
  }

}
