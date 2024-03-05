import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { first } from 'rxjs/operators';
import { data } from 'jquery';

export class RegionView {
  constructor(
    public regionId: number,
    public regionName: string,
    public displayName: string
  ) {

  }
}

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css']
})
export class AddRegionComponent implements OnInit {
  regionForm: FormGroup
  // roles:
  regions: RegionView
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<RegionView> = new Subject<RegionView>();

  isLoading: boolean = false
  isUpdate: boolean = false
  isbtnLoading = false
  regionId: number = 0
  submitted: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };

    this.userService.getAllRegions()
      .subscribe(data => {
        this.isLoading = false
        console.log(data)
        this.regions = data
        this.dtTrigger.next()
      })

    this.regionForm = this.formBuilder.group({
      regionName: ['', Validators.required]
    })


  }

  get f() {
    return this.regionForm.controls
  }

  onSubmit() {
    this.submitted = true
    console.log(this.regionForm.value)
    this.isbtnLoading = true
    this.regionForm.value.displayName = ""
    if (this.isUpdate) {
      this.userService.updateRegion(this.regionForm.value, this.regionId)
        .subscribe(data => {
          console.log('Region Updated-->', data)
          this.regionForm.reset()
          this.isbtnLoading = false
          this.getRegions()

        })

    } else {
      this.userService.AddRegion(this.regionForm.value)
        .subscribe(data => {
          console.log('added -->', data)
          this.regionForm.reset()
          this.isbtnLoading = false
          this.getRegions()
        })
    }
  }

  getRegions() {
    this.userService.getAllRegions().subscribe(data => {
      this.regions = data
    })
  }

  getRegion(id) {
    this.isUpdate = true
    this.regionId = id
    this.isLoading = true
    this.userService.getRegion(id)
      .pipe(first())
      .subscribe(data => {
        this.regionForm.patchValue(data)
        this.isLoading = false
      })

  }

  deactiveRegion(id) {
    let isDeactive = confirm('Are Sure sure to deactive ?')
    if (isDeactive) {
      this.userService.deactiveRegion(id)
        .subscribe(data => location.reload())
    }
  }

}
