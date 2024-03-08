import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserView } from 'src/app/user-equipment/user-equipment.component';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ClientData } from 'src/app/client/client.component';
import { CycleOfInspection } from 'src/app/ncclosure-sa/ncclosure-sa.component';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { ProjectData } from 'src/app/project/project.component';
@Component({
  selector: 'app-pre-snapaudit-froms',
  templateUrl: './pre-snapaudit-froms.component.html',
  styleUrls: ['./pre-snapaudit-froms.component.css']
})
export class PreSnapauditFromsComponent implements OnInit {

  rating: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  users: UserView[]
  clients: ClientData[]
  cycles: CycleOfInspection[]
  snapAuditId: any;

  reportToDate: String
  reportFromDate: String
  cycleOfInspection: number

  projectData:ProjectData[]
  clientData: any = {}

  selClientId: String
  selProjectId: String
  selCycleId: String
  fromDate: String
  toDate: String

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private inspectionTraining: InspectorTraning
  ) { }

  ngOnInit() {

    this.snapAuditId = this.route.snapshot.params['id']

    // this.commonService.retriveInspectionReport(this.snapAuditId)
    //   .subscribe(data => {
    //     // console.log(data)
    //     let report: any = data
    //     console.log(report)
    //     this.reportToDate = new Date(report.snapAudit.toDate).toISOString().substring(0, 10)
    //     this.reportFromDate = new Date(report.snapAudit.fromDate).toISOString().substring(0, 10)
    //     this.cycleOfInspection = report.snapAudit.cycleId

    //     this.clientService.retrieveProject(report.snapAudit.schemeId)
    //       .subscribe(data => {
    //         this.projectData = data

    //       })

    //     this.clientService.retrieveClient(report.snapAudit.clientId)
    //       .subscribe(data => {
    //         this.clientData = data
    //       })
    //   })

    this.clientService.getAllClients()
      .subscribe(data => {
        this.clients = data
        console.log(data)
      })

    this.userService.getAllUsers()
      .subscribe(data => {
        this.users = data
      })

    this.commonService.getAllCycleOfInspection()
      .subscribe(data => {
        this.cycles = data
      })

  }

  getProjects() {
    this.commonService.getClientProject(Number(this.selClientId))
      .subscribe(data => {
        // console.log(data)
        this.projectData = data
      })
  }

  //   inspectorRowCount = 1
  //   addInspectorRow() {
  //   this.inspectorRowCount++
  //   let filed = `
  //                 <tr>
  //                 <td>${this.inspectorRowCount}</td>
  //                 <td><select [(ngModel)]="SelClientId" formControlName="clientId" class="form-control">
  //                 <option [value]="0">Please Select</option>
  //                 <option [value]="1">CQRA</option>
  //               </select></td>
  //             <td></td>
  //             <td><button type="button" class="btn btn-danger" (click)="addInspectorRow()">Add Row</button></td>
  //               </tr>`
  //   let areaFiled = <HTMLTableElement>document.querySelector('#inspectorTable')
  //   areaFiled.insertAdjacentHTML('beforeend', filed)
  // }


  rowCount = 1
  addRow() {
    this.rowCount++
    let filed = `<tr _ngcontent-c1 id='teamRow-${this.rowCount}' >
                <td class='text-center p-1 border border-secondary'>${this.rowCount}</td>

                <td class='p-1 border border-secondary'>
                  <select class="form-control inspectorTeamUser" id='userlist-${this.rowCount}' title='${this.rowCount}'>
                  </select>
                </td>

                <td id='userLevel-${this.rowCount}' class='text-center p-1 border border-secondary'></td>

                <td  class='text-center p-1 border border-secondary'>
                <input class="form-check-input p-2" type="checkbox" value="" id='userLeader-${this.rowCount}'>
                </td>

                <td class='text-center p-1 border border-secondary'>
                  <span class="badge badge-danger" id='removeRow-${this.rowCount}' title="${this.rowCount}" role="button">Remove</span>
                </td>
              </tr>`
    let areaFiled = <HTMLTableElement>document.querySelector('#inspectionTeamFrom')
    areaFiled.insertAdjacentHTML('beforeend', filed)

    let userlist = <HTMLSelectElement>document.querySelector(`#userlist-${this.rowCount}`)
    this.users.forEach(user => {
      let option = `<option value='${user.userId}'>${user.userFullName}</option>`
      userlist.insertAdjacentHTML('beforeend', option)
    })
    userlist.addEventListener('change', (ev: Event) => this.getUser(ev))


    //ADD EVENT LISTERNER FOR ADD LEADER
    let userLeader = <HTMLTableElement>document.querySelector(`#userLeader-${this.rowCount}`)
    userLeader.addEventListener('change', (ev: Event) => this.addLeader(ev))

    let removeRow = <HTMLTableElement>document.querySelector(`#removeRow-${this.rowCount}`)
    removeRow.addEventListener('click', (ev: Event) => this.removeRow(ev))

  }

  removeRow(e) {
    let row = document.querySelector(`#teamRow-${e.target.title}`) as HTMLTableElement
    row.remove()
  }

  currentSelectedUser: Number

  getUser(e) {
    let loader = `<div class="spinner-border text-warning" role="status"></div>`
    let td = document.querySelector(`#userLevel-${e.target.title}`) as HTMLTableElement
    td.innerHTML = loader
    this.currentSelectedUser = Number(e.target.value)
    this.userService.retriveUser(e.target.value)
      .subscribe(data => {
        let user: any = data
        if (user.l0) {
          td.innerHTML = `<span class='badge badge-light'>L0</span>`
        } else if (user.l1) {
          td.innerHTML = `<span class='badge badge-light'>L1</span>`
        } else if (user.l2) {
          td.innerHTML = `<span class='badge badge-light'>L2</span>`
        } else if (user.l3) {
          td.innerHTML = `<span class='badge badge-light'>L3</span>`
        } else {
          td.innerHTML = `<span class='badge badge-light'>Not Specified</span>`

        }

      })

    //To add user id for leader checkbox
    let userLeaderCheck = document.querySelector('#userLeader-' + e.target.title) as HTMLInputElement
    userLeaderCheck.value = e.target.value
  }

  leaderData = {}

  addLeader(e) {
    console.log(e)
    if (e.target.checked) {
      this.leaderData[String(e.target.value)] = true
    } else {
      delete this.leaderData[String(e.target.value)]
    }

    console.log(this.leaderData)
  }

  submitFormLoad: boolean = false
  submitInspectionTeamComposition() {
    this.submitFormLoad = true
    let userListRow = document.querySelectorAll('.inspectorTeamUser')
    console.log(userListRow)

    // let formData = []
    let formData = {}

    formData['inspectionTeamMaster'] = {
      projectId: Number(this.selProjectId),
      clientId: Number(this.selClientId),
      fromDate: this.fromDate,
      toDate: this.toDate,
      cycleId: Number(this.selCycleId),
      formCreatedDate: new Date().toISOString().substring(0, 10)
    }

    formData['inspectorTeamUser'] = []

    userListRow.forEach(user => {
      let data = {
        userId: (<HTMLSelectElement>user).value,
        leader: this.leaderData[(<HTMLSelectElement>user).value] ? 1 : 0
      }
      formData['inspectorTeamUser'].push(data)

    })

    console.log(formData)

    this.inspectionTraining.addInspectionTeamComposition(formData)
      .subscribe(data => {
        console.log('team added', data)
        this.submitFormLoad = false
      })

  }

}





