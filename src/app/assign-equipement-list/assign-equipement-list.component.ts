import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentView } from '../add-equipment/add-equipment.component';

@Component({
  selector: 'app-assign-equipement-list',
  templateUrl: './assign-equipement-list.component.html',
  styleUrls: ['./assign-equipement-list.component.css']
})
export class AssignEquipementListComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<EquipmentView> = new Subject<EquipmentView>();

  assignEquipment: EquipmentView
  isLoading: boolean = false
  constructor(
    private userService: UserService,
    private router : Router
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
    this.userService.getAllAssignEquipment()
      .subscribe(data => {
        console.log(data)
        this.assignEquipment = data
        this.dtTrigger.next()
        this.isLoading = false
      })
  }

  editEquipment(id){
    this.router.navigate(['addEquipment', id])
  }

  deActivate(id){
    let isDelete = confirm('Are you sure want to delete ?')
    if(isDelete){
      this.userService.deleteAssignEqiopment(id)
      .subscribe(data => {
        console.log('delerted')
        location.reload()
      })

    }
  }
}
