import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { MisTopPerformanceData } from '../mis-top-performance/mis-top-performance.component';


export class MisBelowPerformanceFrom {
  constructor(
    public fkMisId: Number,
    public personName: Number,
    public designation: Number,
    public active: Number
  ) { }
}


export class MisBelowPerformanceData {
  constructor(
    public personId: Number,
    public fkMisId: Number,
    public personName: Number,
    public designation: Number,
    public active: Number
  ) { }
}
@Component({
  selector: 'app-mis-below-person',
  templateUrl: './mis-below-person.component.html',
  styleUrls: ['./mis-below-person.component.css']
})
export class MisBelowPersonComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MisBelowPerformanceData> = new Subject<MisBelowPerformanceData>();
  belowPerformanceForm: FormGroup
  misId: Number
  belowPerformance: MisBelowPerformanceData
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
    this.belowPerformanceForm = this.fromBuilder.group({
      personName: ['', Validators.required],
      designation: ['', Validators.required]
    })

    this.commonService.getAllMisBelowPerformance(this.misId)
      .subscribe(data => {
        this.belowPerformance = data
        this.dtTrigger.next()
        this.isLoading = false
      })
  }

  get f() {
    return this.belowPerformanceForm.controls
  }

  onSubmit() {
    this.submitted = true
    console.log(this.belowPerformanceForm.value)
    let formData = {
      fkMisId: this.misId,
      personName: this.belowPerformanceForm.value.personName,
      designation: this.belowPerformanceForm.value.designation,
      active: 1
    }

    if (this.isUpdate) {
      this.commonService.updateMisBelowPerformance(formData, this.misId)
      .subscribe(data =>{
        console.log('updataed', data)
      })
    } else {


      this.commonService.createMisBelowPerformance(formData)
        .subscribe(data => {
          console.log('crrated-->', data)
        })
    }
  }

  editMis(id) {
    this.isUpdate = true
    this.commonService.getMisBelowPerformance(id)
      .subscribe(data => {
        this.belowPerformanceForm.patchValue(data)
      })
  }

}
