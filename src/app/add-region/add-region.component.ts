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

  onSubmit() {
    console.log(this.regionForm.value)
    this.regionForm.value.displayName = ""
    this.userService.AddRegion(this.regionForm.value)
      .subscribe(data => {
        console.log('added -->', data)
        this.userService.getAllRegions().subscribe(data => {
          this.regions = data
        })
      })
  }

}
