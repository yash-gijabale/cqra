import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";

@Component({
  selector: 'app-my-equipments',
  templateUrl: './my-equipments.component.html',
  styleUrls: ['./my-equipments.component.css']
})
export class MyEquipmentsComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Array<any>> = new Subject<Array<any>>();

  activeTab: String = 'assiged'
  signPad: any

  eqload: boolean = false

  constructor(
    private userService: UserService
  ) { }

  userId = Number(localStorage.getItem('id'))
  equipments: Array<any>
  userData: any = {}
  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
    };

    this.eqload = true
    this.userService.getMyEquipments(this.userId)
      .subscribe(data => {
        console.log(data)
        // this.equipments = data
        this.separateDataByRecivedStatus(data)

        this.dtTrigger.next()
        this.eqload = false
      })


  }

  changePannel(tab) {
    this.activeTab = tab

  }



  getEquipmentDetails(eqId) {
    this.userService.getEqDetails(eqId)
      .subscribe(data => {
        console.log(data)
      })

  }

  accesptedEqs = []
  newEquipments = []
  separateDataByRecivedStatus(data) {
    data.forEach(item => {
      if (item.receivedStatus == 1) {
        this.accesptedEqs.push(item)
      } else {
        this.newEquipments.push(item)
      }
    })

    console.log(this.accesptedEqs)
    console.log(this.newEquipments)
    if (data.length) {
      this.userData['userName'] = data[0].username
      this.userData['userId'] = data[0].assignTo
    }

  }

  submitPolicyLoad: boolean = false
  acceptPolicy() {
    console.log('accepted')
    this.submitPolicyLoad = true
    let policydata = []
    this.newEquipments.forEach(item => {
      let data = {
        equipmentId: item.equipmentId,
        userId: this.userData.userId,
        receivedDate: new Date().toISOString().split('T')[0],
      }

      policydata.push(data)
    })

    console.log(policydata);
    this.userService.acceptPolisy(policydata)
      .subscribe(data => {
        console.log('accepted', data)
        this.submitPolicyLoad = false

      },
      err => {
        console.log(err)
        this.submitPolicyLoad = false
      }
      )
  }

  aggredStatus: boolean = false
  aggreStatus(e) {

    this.aggredStatus = e.target.checked

  }

}
