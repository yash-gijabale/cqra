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

  projectData: ProjectData[]
  clientData: any = {}

  selClientId: String
  selProjectId: String
  selCycleId: String
  fromDate: String
  toDate: String

  masterIds: Array<any>
  userId: number = Number(localStorage.getItem('id'))
  roleId = localStorage.getItem('role')

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private inspectionTraining: InspectorTraning
  ) { }

  ngOnInit() {
    // this.snapAuditId = this.route.snapshot.params['id']

    this.inspectionTraining.getMasterIdsByUserId(this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterIds = data

      })

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

  masterData: any = []
  currentMasterId: String = ''
  isLeader: boolean
  getMasterDetails(e) {
    // this.loadDeclaration = true
    console.log(e.target.value)
    this.currentMasterId = e.target.value
    // this.masterID = e.target.value
    this.inspectionTraining.getMasterDetails(e.target.value, this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterData = data[0]

        // this.commonService.setMasterData(this.masterData) //setting master data for sampling sheet
        localStorage.setItem('mData', JSON.stringify(this.masterData))//setting master data for sampling sheet

        this.masterData.fromDate = new Date(this.masterData.fromDate).toISOString().substring(0, 10)
        this.masterData.toDate = new Date(this.masterData.toDate).toISOString().substring(0, 10)
        this.isLeader = this.masterData.leader ? true : false
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



  rowOpeningClosingCount = 1
  addOpeningClosingRow() {
    this.rowOpeningClosingCount++
    this
    let filed = `<tr id="">
                <td class='text-center p-1 border border-secondary'>${this.rowOpeningClosingCount}</td>
                <td><input type="text" class='opening_username' id='${this.rowOpeningClosingCount}' form-control'></td>
                <td><input type="text" id='opening_organization_${this.rowOpeningClosingCount}' class='form-control'></td>
                <td><input type="text" id='designation_${this.rowOpeningClosingCount}' class='form-control'></td>
                <td class='text-center p-1 border border-secondary'>
                  <span class="badge badge-secondary" role="button">upload</span>
                </td>
                <td class='text-center p-1 border border-secondary'>
                  <span class="badge badge-secondary" role="button">upload</span>
                </td>
                <td class='text-center p-1 border border-secondary'>
                  <button class="btn btn-sm btn-danger">Remove</button>
                </td>
              </tr>`
    let areaFiled = <HTMLTableElement>document.querySelector('#openingClosingForm')
    areaFiled.insertAdjacentHTML('beforeend', filed)
  }


  submitOpeningClosingMeetingFrom() {
    let meetingLocation = document.querySelector('#meeting_location') as HTMLInputElement
    let meetingAgenda = document.querySelector('#meeting_agenda') as HTMLInputElement
    let openingMeetingdate = document.querySelector('#opening_meeting_date') as HTMLInputElement
    let closingMeetingdate = document.querySelector('#closing_meeting_date') as HTMLInputElement
    let openingStartTime = document.querySelector('#opening_meeting_startTime') as HTMLInputElement
    let openingEndTime = document.querySelector('#opening_meeting_endTime') as HTMLInputElement
    let closingStartTime = document.querySelector('#closing_meeting_startTime') as HTMLInputElement
    let closingEndTime = document.querySelector('#opening_meeting_endTime') as HTMLInputElement

    let oCMeetingAttandance = {
      masterId: this.currentMasterId,
      location: meetingLocation.value,
      agenda: meetingAgenda.value,
      oDate: openingMeetingdate.value,
      oStartTime: openingStartTime.value,
      oEndTime: openingEndTime.value,
      cDate: closingMeetingdate.value,
      cStartTime: closingStartTime.value,
      cEndTime: closingEndTime.value,

    }

    let userRowData = document.querySelectorAll('.opening_username')

    let userList = []
    console.log(userRowData)
    userRowData.forEach(userRow => {
      let userData = userRow as HTMLInputElement
      let organixation = document.querySelector(`#opening_organization_${userData.id}`) as HTMLInputElement
      let designation = document.querySelector(`#designation_${userData.id}`) as HTMLInputElement
      let data = {
        masterId: this.currentMasterId,
        usernameId: userData.value,
        organization: organixation.value,
        designation: designation.value
      }

      userList.push(data)
    })
    console.log(oCMeetingAttandance)
    console.log(userList)

    let formData = [
      {
        oCMeetingAttandance,
        oCMeetingAttendanceUser: userList
      }
    ]

    this.inspectionTraining.addOpeningClosingForm(formData)
      .subscribe(data => {
        console.log('opening meeting form aded', data)
      })

  }


  inspectionTeam = []
  inspectionTeamLoad: boolean = false
  getTeamUser() {
    this.inspectionTeamLoad = true
    this.inspectionTraining.getComposedTeamByMasterId(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        this.inspectionTeam = data
        this.inspectionTeamLoad = false
      })
  }


  supervisorFormSubmitLoad: boolean = false
  submitSupervisorForm() {
    this.supervisorFormSubmitLoad = true
    let fromData = []
    this.inspectionTeam.forEach(team => {
      let witnessLocation = document.querySelector(`#witnessLocation_${team.userId}`) as HTMLInputElement
      let witnessActivity = document.querySelector(`#witnessActivity_${team.userId}`) as HTMLInputElement
      let satsfactory = document.querySelector(`input[name='satisfactory${team.userId}']:checked`) as HTMLInputElement
      let remark = document.querySelector(`#remark_${team.userId}`) as HTMLInputElement

      // console.log(satsfactory.value)

      let data = {
        masterId: this.currentMasterId,
        userId: team.userId,
        witnessedArea: witnessLocation.value,
        witnessedActiv: witnessActivity.value,
        remark: remark.value,
        satisfactory: satsfactory.value
      }

      fromData.push(data)
    })

    console.log(fromData)

    this.inspectionTraining.addSupervisorL1L2Data(fromData)
      .subscribe(data => {
        console.log('dara added', data)
        this.supervisorFormSubmitLoad = false

      })
  }


  onsitePreFormData = null
  onsitePerformance() {
    this.getTeamUser()
    this.inspectionTraining.getOnsitePerformanceFormData(this.currentMasterId)
    .subscribe(data =>{
      console.log(data)
      if(data.length){
        this.onsitePreFormData = {}
        data.forEach(d => {
          this.onsitePreFormData[d.userId] = d
        })
      }

      console.log(this.onsitePreFormData)

    })

  }
  onsiteFormLoad: boolean = false
  submitOnsitePerformanceForm() {
    this.onsiteFormLoad = true
    let formData = []
    this.inspectionTeam.forEach(team => {
      let activityMonitor = document.querySelector(`#activity_monitored_${team.userId}`) as HTMLInputElement
      let qualityObs = document.querySelector(`#qualityObservation_${team.userId}`) as HTMLSelectElement
      let timelyCopmletion = document.querySelector(`#timelyComplition_${team.userId}`) as HTMLSelectElement
      let behavior = document.querySelector(`#behavior_${team.userId}`) as HTMLSelectElement
      let interaction = document.querySelector(`#interaction_${team.userId}`) as HTMLSelectElement
      let tech = document.querySelector(`#techKnowledge${team.userId}`) as HTMLSelectElement
      let nabc = document.querySelector(`#nabc_${team.userId}`) as HTMLSelectElement
      let remark = document.querySelector(`#ratingRemark_${team.userId}`) as HTMLSelectElement

      let data = {
        masterId: this.currentMasterId,
        userId: team.userId,
        activitiesMon: activityMonitor.value,
        qualityOfObservation: qualityObs.value,
        timelyCompletion: timelyCopmletion.value,
        behaviourDiscipline: behavior.value,
        interactionWithClients: interaction.value,
        technicalKnowledge: tech.value,
        reqOfNabcb: nabc.value,
        remark: remark.value,
        // trainingReq: 2,
        // comment: "Some comment",
        // proposedAction: "Take corrective action"
      }

      formData.push(data)
    })

    console.log(formData)
    if(this.onsitePreFormData != null){
      this.inspectionTraining.updateInspectionOnsitePerformance(this.currentMasterId, formData)
      .subscribe(data =>{
        console.log('onsite per upadetd', data)
        this.onsiteFormLoad = false

      })
    }else{

      this.inspectionTraining.addInspectorOnsitePerformance(formData)
        .subscribe(data => {
          this.onsiteFormLoad = false
          console.log('onsite added', data)
        })
    }
  }

}





