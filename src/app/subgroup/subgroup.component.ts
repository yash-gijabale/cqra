import { Component, ViewChild, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TradeMaintanceService } from '../trade-maintance.service';

export class Subgroup {
  constructor(
    public tardeId: number,
    public tradegroupId: number,
    public subgroupId: number,
    public subgroupName: string,
    public status: boolean

  ) {

  }
}

export class SubgroupView {
  constructor(
    public subgroupId: string,
    public subgroupName: string,
    public tradeName: string,


  ) {

  }
}

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css']
})
export class SubgroupComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SubgroupView> = new Subject();
  subgroups: Subgroup[];
  subgroupsView: SubgroupView[];
  isLoading: boolean
  constructor(private router: Router, private tradeMaintanceService: TradeMaintanceService) { }

  ngOnInit() {

    this.isLoading = true
    this.tradeMaintanceService.getAllSubgroups().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.subgroupsView = data;
      this.dtTrigger.next();
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    })
  }

  editSubgroup(id) {
    this.router.navigate(['createSubgroup', id])
  }

  // deActive(id) {
  //   let isDelete = confirm('Are you sure want to delete ?')
  //   if (isDelete) {
  //     this.tradeMaintanceService.deActivateSubgroup(id)
  //       .subscribe(data => {
  //         console.log('Deactivated')
  //         location.reload()
  //       })
  //   }
  // }

  deactivateSubgroup(id) {
    let deactive = confirm('Are you sure want to deactivate ?')
    if (deactive) {
      this.tradeMaintanceService.deActivateSubgroup(id, false)
        .subscribe(data => {
          console.log('Deactivated', data)
          location.reload()
        })
    }
  }

  activateSubgroup(id) {
    let active = confirm('Are you sure want to activate ?')
    if (active) {
      this.tradeMaintanceService.deActivateSubgroup(id, true)
        .subscribe(data => {
          console.log('activated', data)
          location.reload()
        })
    }
  }

}
