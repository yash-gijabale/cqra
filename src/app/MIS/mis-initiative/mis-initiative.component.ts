import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
export class MisInitiativeData {
  constructor(
    public itemId: Number,
    public fkMisId: Number,
    public item: string,
    public active: Number
  ) { }
}

export class MisInitiativeForm {
  constructor(
    public fkMisId: Number,
    public item: string,
    public active: Number
  ) { }
}
@Component({
  selector: 'app-mis-initiative',
  templateUrl: './mis-initiative.component.html',
  styleUrls: ['./mis-initiative.component.css']
})
export class MisInitiativeComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MisInitiativeData> = new Subject<MisInitiativeData>();
  initiativeFrom: FormGroup
  misId: Number
  initiatives: MisInitiativeData
  isUpdate = false
  initiativeId: Number


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute
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
    this.initiativeFrom = this.formBuilder.group({
      item: ['', Validators.required]
    })

    this.commonService.getAllMisInitiative(this.misId)
      .subscribe(data => {
        console.log(data)
        this.initiatives = data
        this.dtTrigger.next()
      })

  }

  get f() {
    return this.initiativeFrom.controls
  }

  onSubmit() {
    let formData = {
      fkMisId: Number(this.misId),
      item: this.initiativeFrom.value.item,
      active: 1
    }

    if (this.isUpdate) {
      this.commonService.updateMisInitiative(formData, this.initiativeId )
      .subscribe(data =>{
        console.log('updated', data)
      })
    } else {
      console.log(formData)
      this.commonService.addMisInitiative(formData)
        .subscribe(data => {
          console.log('added', data)
        })
    }
  }

  editMis(id) {
    this.isUpdate = true
    this.commonService.getMisInitiative(id)
      .subscribe(data => {
        this.initiativeId = data.itemId
        this.initiativeFrom.patchValue(data)
      })
  }

  deActivate(id){
    this.commonService.deleteMisInitiative(id).subscribe(
      data => {
        console.log('deleted')
        location.reload()
      }
    )
  }

}
