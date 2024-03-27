import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { EquipmentView } from '../add-equipment/add-equipment.component';
import { UserView } from '../user-equipment/user-equipment.component';

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

  assignEquipment: Array<EquipmentView>
  isLoading: boolean = false
  users: UserView[]

  activeTab: String = 'activate'

  eqload: boolean = false

  constructor(
    private userService: UserService,
    private router: Router
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

    this.eqload = true
    this.getAllEquipment()


    this.userService.getAllUsers()
      .subscribe(data => {
        this.users = data
      })
  }

  activateEquipment = []
  deActivateEquipment = []
  separateActivateAndDeactivateEquip(data) {
    data.forEach(eq => {
      if (eq.status) {
        this.activateEquipment.push(eq)
      } else {
        this.deActivateEquipment.push(eq)
      }
    })

    console.log(this.activateEquipment)
    console.log(this.deActivateEquipment)
  }

  getAllEquipment() {
    this.userService.getAllAssignEquipment()
      .subscribe(data => {
        console.log(data)
        this.assignEquipment = data
        this.dtTrigger.next()
        this.isLoading = false
        this.separateActivateAndDeactivateEquip(data)
        this.eqload = false
      })
  }

  editEquipment(id) {
    this.router.navigate(['addEquipment', id])
  }

  deActivateLoad: boolean = false
  deActivate(id) {
    this.deActivateLoad = true
    // let isDelete = confirm('Are you sure want to delete ?')
    let remark = document.querySelector(`#deactivateRemark${id}`) as HTMLInputElement
    this.userService.deleteAssignEqiopment(id, false, { remark: remark.value })
      .subscribe(data => {
        console.log('delerted', data)
        this.deActivateLoad = false
        // location.reload()
        this.getAllEquipment()

      })
  }

  // newAssignUser:number
  assignEqLoad: boolean = false
  assignNewUser(equipmentId) {
    this.assignEqLoad = true
    let userId = document.querySelector(`#newUserSelect_${equipmentId}`) as HTMLInputElement
    let date = document.querySelector(`#newUserDate_${equipmentId}`) as HTMLInputElement
    console.log(userId.value)
    let data = {
      // dateOfAssign: new Date().toISOString().split('T')[0],
      dateOfAssign: date.value,
      status: true,
      assignedBy: Number(localStorage.getItem('id'))
    }
    console.log(data)
    this.userService.assignNewUserToEquipment(equipmentId, userId.value, data)
      .subscribe(data => {
        console.log('added', data)
        this.assignEqLoad = false
        this.getAllEquipment()

      })
  }

  sendPolicyLoad: boolean = false
  sendPolicy() {
    this.sendPolicyLoad = true
    let userId = document.querySelector('#policyMailSelect') as HTMLInputElement
    this.userService.sendPolicyMain(userId.value)
      .subscribe(data => {
        console.log(data)
        if (data) {
          this.showSnackBar('Email send successfully')
        } else {
          this.showSnackBar('Something wrong')
        }
        this.sendPolicyLoad = false
      })

  }

  showSnack: boolean = false
  snackTitle: String
  showSnackBar(title) {
    this.snackTitle = title
    console.log('snack show')
    this.showSnack = true
    setTimeout(() => {
      this.showSnack = false
    }, 2000);
  }


  returnLoad: boolean = false
  submitReturnEquipment(equipmentId, assignTo) {
    this.returnLoad = true
    let reason = document.querySelector(`#returnReason${equipmentId}`) as HTMLSelectElement
    let remark = document.querySelector(`#returnRemark${equipmentId}`) as HTMLInputElement
    let date = document.querySelector(`#returnDate${equipmentId}`) as HTMLInputElement

    let data = {
      equipmentId: equipmentId,
      userId: assignTo,
      reason: Number(reason.value),
      submissionDate: date.value,
      remark: remark.value
    }

    console.log(data)

    this.userService.returnEquipment(data)
      .subscribe(data => {
        console.log('returned', data)
        this.returnLoad = false
        this.getAllEquipment()
      }, err => {
        console.log(err)
        this.returnLoad = false
      })
  }

  changePannel(tab) {
    this.activeTab = tab
    // if(tab == 'activate'){
    //   this.assignEquipment = this.activateEquipment
    // }else{
    //   this.assignEquipment = this.deActivateEquipment
    // }

  }
}
