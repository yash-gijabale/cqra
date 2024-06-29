import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { EquipmentView } from '../add-equipment/add-equipment.component';
import { UserView } from '../user-equipment/user-equipment.component';
import { forEach } from '@angular/router/src/utils/collection';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';

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
  dtTrigger: Subject<any> = new Subject<any>();

  assignEquipment: Array<EquipmentView>
  isLoading: boolean = false
  users: UserView[]

  activeTab: String = 'activate'

  eqload: boolean = false

  loggedUser = Number(localStorage.getItem('id'))

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: SnackBarComponent
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
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy()
          this.dtTrigger.next()
        });
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
    this.userService.assignNewUserToEquipment(equipmentId, userId.value, this.loggedUser, data)
      .subscribe(data => {
        console.log('added', data)
        this.assignEqLoad = false
        this.snackBar.showSuccess('Equipment Assigned')
        this.dtTrigger;
        this.getAllEquipment()
      }, err => {
        this.assignEqLoad = false
        this.snackBar.showSnackError()
      })
  }

  // sendPolicyLoad: boolean = false
  // sendPolicy() {
  //   this.sendPolicyLoad = true
  //   let userId = document.querySelector('#policyMailSelect') as HTMLInputElement
  //   this.userService.sendPolicyMain(userId.value)
  //     .subscribe(data => {
  //       console.log(data)
  //       if (data) {
  //         this.showSnackBar('Email send successfully')
  //       } else {
  //         this.showSnackBar('Something wrong')
  //       }
  //       this.sendPolicyLoad = false
  //     })

  // }

  sendPolicyLoad: boolean = false
  sendPolicy() {
    this.sendPolicyLoad = true
    let userId = document.querySelector('#policyMailSelect') as HTMLInputElement
    let email = document.querySelector('#email') as HTMLInputElement
    let cc_mail = document.querySelector('#cc_mail') as HTMLInputElement
    let email_body = document.querySelector('#email_body') as HTMLInputElement
    console.log(userId)
    let data = {
      Email: email.value,
      CC_mail: cc_mail.value,
      Email_body: email_body.value
    }
    console.log(data)
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

    this.userService.returnEquipment(data, this.loggedUser)
      .subscribe(data => {
        console.log('returned', data)
        this.returnLoad = false
        this.getAllEquipment()
        this.snackBar.showSuccess('Equipment Returned Successfully')
      }, err => {
        console.log(err)
        this.returnLoad = false
        this.snackBar.showSnackError()
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

  restore(equipmentId) {
    const confirmed = confirm("Are You sure to Restore this equipment?");
    this.deActivateEquipment
    if (confirmed) {
      const equipmentToRestore = this.deActivateEquipment.find(eq => eq.equipmentId === equipmentId);
      if (equipmentToRestore) {
        equipmentToRestore.status = true;
        //   console.log(`Equipment with ID ${equipmentId} restored.`);
        // } else {
        //   console.log(`Equipment with ID ${equipmentId} not found in deActivateEquipment.`);
        // }
        // let remark = document.querySelector(`#deactivateRemark${equipmentId}`) as HTMLInputElement
        this.userService.deleteAssignEqiopment(equipmentId, true, { remark: '' })
          .subscribe(data => {
            console.log('Equipment Restored', data)
            // location.reload()
            this.getAllEquipment()
          })
      }
    }
  }

  policyLoad = {

  }
  downloadPolicy(eqId, userId) {
    this.policyLoad[eqId] = {
      load: true,
      url: '',
      error: false
    }
    this.userService.donloadToolkitPolicy(eqId, userId)
      .subscribe(data => {
        this.policyLoad[eqId].load = false
        this.policyLoad[eqId].url = data.url
      }, err => {
        this.policyLoad[eqId].error = true

      })
  }
}


