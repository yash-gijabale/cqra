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
    this.clientFeedBackLoad = this.myequipmentFormLoad = this.teamInspectionForm = this.internalReviewMeetingForm = this.openingClosingForm = this.supervisionForm = this.performanceFormload = {
      load: false,
      error: false,
      url: ''
    }

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
  masterDataLoad: boolean = false
  getMasterDetails(e) {
    this.masterDataLoad = true
    console.log(e.target.value)
    this.currentMasterId = e.target.value
    // this.masterID = e.target.value
    if (this.updateTeamFlag) { //FOR UPDATING LOADER ACTIVTE
      this.updateTeamLoad = true
    }

    this.inspectionTraining.getMasterDetails(e.target.value, this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterData = data[0]

        this.getTeamUser()//for updation

        this.getAllFormDataForCheck(this.currentMasterId)

        // this.commonService.setMasterData(this.masterData) //setting master data for sampling sheet
        localStorage.setItem('mData', JSON.stringify(this.masterData))//setting master data for sampling sheet

        this.masterData.fromDate = this.masterData.fromDate ? new Date(this.masterData.fromDate).toISOString().substring(0, 10) : ''
        this.masterData.toDate = this.masterData.toDate ? new Date(this.masterData.toDate).toISOString().substring(0, 10) : ''
        this.isLeader = this.masterData.leader ? true : false
        this.masterDataLoad = false

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

    if (this.updateTeamFlag) {
      // console.log(formData)
      this.inspectionTraining.updateInspectionTeamComposition(this.currentMasterId, formData)
        .subscribe(data => {
          console.log('updated team', data)
          this.submitFormLoad = false

        })
    } else {
      this.inspectionTraining.addInspectionTeamComposition(formData)
        .subscribe(data => {
          console.log('team added', data)
          this.submitFormLoad = false
        })
    }

  }

  updateTeamFlag: boolean = false
  updateTeamLoad: boolean = false
  isUpdateTeam(e) {
    if (e.target.checked) {
      this.updateTeamFlag = true
    } else {
      this.updateTeamFlag = false
    }

  }


  rowOpeningClosingCount = 1
  addOpeningClosingRow() {

    this.rowOpeningClosingCount++
    // this
    let filed = `<tr id="removeOpeningRow${this.rowOpeningClosingCount}">
                <td class='text-center p-1 border border-secondary'>${this.rowOpeningClosingCount}</td>
                <td><input type="text" class='opening_username form-control' id='${this.rowOpeningClosingCount}'></td>
                <td><input type="text" id='opening_organization_${this.rowOpeningClosingCount}' class='form-control'></td>
                <td><input type="text" id='designation_${this.rowOpeningClosingCount}' class='form-control'></td>
                <td class='text-center p-1 border border-secondary'>
                  <button class="btn btn-sm btn-danger" id="${this.rowOpeningClosingCount}" >Remove</button>
                </td>

              </tr>`
    let areaFiled = <HTMLTableElement>document.querySelector('#openingClosingFormTable')
    console.log(areaFiled)
    areaFiled.insertAdjacentHTML('beforeend', filed)

    let removeRow = <HTMLTableElement>document.querySelector(`#removeOpeningRow-${this.rowCount}`)
    removeRow.addEventListener('click', (ev: Event) => this.removeOpeningClosingRow(ev))
  }

  removeOpeningClosingRow(e) {
    let row = document.querySelector(`#removeOpeningRow${e.target.id}`) as HTMLTableElement
    row.remove()
  }

  isOpeningClosingData = false
  openingClosingPreData = {}
  getopeningClosingForm() {
    this.inspectionTraining.getOpeningClosingForm(this.currentMasterId)
      .subscribe(data => {
        if (data[0]) {
          this.isOpeningClosingData = true
          this.openingClosingPreData['data'] = data[0]
          let srNo = 0
          this.openingClosingPreData['users'] = data[1].map(d => {
            srNo += 1
            return { srNo: srNo, ...d }
          })
          this.rowOpeningClosingCount = data[1].length
          console.log(this.openingClosingPreData)
          console.log(this.rowOpeningClosingCount)
          console.log(this.isOpeningClosingData)
        }
      })
  }

  // SubmitClientFeedback() {
  //   let meetinglocation = document.querySelector('#meeting_Location') as HTMLInputElement
  //   let openingcloprofessionally = document.querySelector('#openingCloProfessionally') as HTMLInputElement
  //   let nonconfirmitiesdiscussed = document.querySelector('#nonConfirmitiesDiscussed') as HTMLInputElement
  //   let qualityOfnonconfirmative = document.querySelector('#qualityOfNonConfirmative') as HTMLInputElement
  //   let qualityOfWork = document.querySelector('input[name="quality"]:checked') as HTMLInputElement

  //   let suggestdifferently = document.querySelector('#suggestDifferently') as HTMLInputElement
  //   let feedback = document.querySelector('#Feedback') as HTMLInputElement
  //   let othercomments = document.querySelector('#otherComments') as HTMLInputElement

  //   let feedbackform = {
  //     masterId: this.currentMasterId,
  //     // clientId:this.clientId,
  //     meeting_Location: meetinglocation.value,
  //     openingCloProfessionally: openingcloprofessionally.value,
  //     nonConfirmitiesDiscussed: nonconfirmitiesdiscussed.value,
  //     qualityOfNonConfirmative: qualityOfnonconfirmative.value,
  //     workQuality: qualityOfWork.value,

  //     suggestDifferently: suggestdifferently.value,
  //     Feedback: feedback.value,
  //     otherComments: othercomments.value
  //   }

  //   console.log(feedbackform);

  //   //   this.inspectionTraining.addClientFeedbackForm(feedbackform)
  //   //   .subscribe(data => {
  //   //     console.log('daa added', data)
  //   //   // this.supervisorFormSubmitLoad = false
  //   // })
  // }




  submitOpeningCloseLoad: boolean = false
  submitOpeningClosingMeetingFrom() {
    this.submitOpeningCloseLoad = true
    let meetingLocation = document.querySelector('#meeting_location') as HTMLInputElement
    let meetingAgenda = document.querySelector('#meeting_agenda') as HTMLInputElement
    let openingMeetingdate = document.querySelector('#opening_meeting_date') as HTMLInputElement
    let closingMeetingdate = document.querySelector('#closing_meeting_date') as HTMLInputElement
    let openingStartTime = document.querySelector('#opening_meeting_startTime') as HTMLInputElement
    let openingEndTime = document.querySelector('#opening_meeting_endTime') as HTMLInputElement
    let closingStartTime = document.querySelector('#closing_meeting_startTime') as HTMLInputElement
    let closingEndTime = document.querySelector('#closing_meeting_endTime') as HTMLInputElement

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
        username_id: userData.value,
        organization: organixation.value,
        designation: designation.value
      }

      userList.push(data)
    })


    let formData = [
      {
        oCMeetingAttandance,
        oCMeetingAttendanceUser: userList
      }
    ]

    console.log(formData)

    let openingFile = document.querySelector('#opening_image') as HTMLInputElement
    let closingFile = document.querySelector('#closing_image') as HTMLInputElement

    let Imgdata = {
      openingImg: openingFile.files[0],
      closingImg: closingFile.files[0]
    }


    if (this.isOpeningClosingData) {
      this.inspectionTraining.updateOpeningClosingFrom(this.currentMasterId, formData)
        .subscribe(data => {
          console.log('opening cloding upadted', data)
          this.submitOpeningCloseLoad = false
          if (openingFile.files[0] || closingFile.files[0]) {
            this.inspectionTraining.uploadOpeningClosingImage(this.currentMasterId, Imgdata)
              .subscribe(img => {
                console.log('opning image uploade', img)
              })
          }

        })

    } else {
      this.inspectionTraining.addOpeningClosingForm(formData)
        .subscribe(data => {
          console.log('opening meeting form aded', data)
          this.submitOpeningCloseLoad = false
          if (openingFile.files[0] || closingFile.files[0]) {
            this.inspectionTraining.uploadOpeningClosingImage(this.currentMasterId, Imgdata)
              .subscribe(img => {
                console.log('opning image uploade', img)
              })
          }
        })
    }

  }


  inspectionTeam = []
  inspectionTeamLoad: boolean = false
  getTeamUser() {
    this.inspectionTeamLoad = true
    this.inspectionTraining.getComposedTeamByMasterId(this.currentMasterId)
      .subscribe(data => {
        let srNo = 0
        this.inspectionTeam = data.map(d => {
          return {
            srNo: srNo += 1,
            ...d
          }
        })
        this.inspectionTeamLoad = false
        console.log(this.inspectionTeam)
        //FOR UPDATE TEAM ONLY
        if (this.updateTeamFlag) {
          console.log(this.masterData)
          this.rowCount = this.inspectionTeam.length
          this.selClientId = this.masterData.clientId
          this.selProjectId = this.masterData.projectId
          this.selCycleId = this.masterData.cycleId
          this.fromDate = this.masterData.fromDate
          this.toDate = this.masterData.toDate

          this.getProjects()

          this.inspectionTeam.forEach(team => {
            if (team.leader) {
              this.leaderData[String(team.userId)] = true
            }
          })

          this.updateTeamLoad = false
        }
      })
  }

  supervisorPreData = {}
  isSupervisroPreData: boolean = false
  supervisorFormGet() {
    this.getTeamUser()
    this.inspectionTraining.getSupervisroFormData(this.currentMasterId)
      .subscribe(data => {
        if (data.length) {
          this.isSupervisroPreData = true
          data.forEach(d => {
            this.supervisorPreData[d.userId] = d
          })
        }
        console.log(this.supervisorPreData)
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


    if (this.isSupervisroPreData) {
      this.inspectionTraining.updateSupervisorFrom(this.currentMasterId, fromData)
        .subscribe(data => {
          console.log('supervisor updated', data)
          this.supervisorFormSubmitLoad = false

        })
    } else {

      this.inspectionTraining.addSupervisorL1L2Data(fromData)
        .subscribe(data => {
          console.log('dara added', data)
          this.supervisorFormSubmitLoad = false

        })
    }
  }


  onsitePreFormData = {}
  onsitePerformance() {
    this.getTeamUser()
    this.inspectionTraining.getOnsitePerformanceFormData(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        if (data.length) {
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
    if (this.onsitePreFormData != null) {
      this.inspectionTraining.updateInspectionOnsitePerformance(this.currentMasterId, formData)
        .subscribe(data => {
          console.log('onsite per upadetd', data)
          this.onsiteFormLoad = false

        })
    } else {

      this.inspectionTraining.addInspectorOnsitePerformance(formData)
        .subscribe(data => {
          this.onsiteFormLoad = false
          console.log('onsite added', data)
        })
    }
  }



  isInternalReviewFormData: boolean = false
  internalReviewMasterData = {}
  internalReviewFacility = {}
  internalReviewMeeting() {
    this.getTeamUser()
    this.inspectionTraining.getInternalReviewForm(this.currentMasterId)
      .subscribe(data => {
        console.log("all data of internal review", data)
        if (data[0] || data[1].length) {
          this.isInternalReviewFormData = true
          this.internalReviewMasterData = data[0]
          data[1].forEach(d => {
            this.internalReviewFacility[d.facilities] = d
          })

        }

        console.log(this.internalReviewFacility)
      })
  }

  interReviewMeetingLoad: boolean = false
  submitInternalReviewMeeting() {


    this.interReviewMeetingLoad = true

    let meetinglocation = document.querySelector('#meetingLocation') as HTMLInputElement
    let meetingDate = document.querySelector('#internalreview_date') as HTMLInputElement

    let outdatedCalibration = document.querySelector('#outdatedCalibration') as HTMLInputElement
    let anyOtherDiffFaced = document.querySelector('#anyOtherDiffFaced') as HTMLInputElement
    let anyGoodPracticesObserved = document.querySelector('#anyGoodPracticesObserved') as HTMLInputElement
    let intimidation = document.querySelector('#intimidation') as HTMLInputElement
    let startTime = document.querySelector('#startTime') as HTMLInputElement
    let endTime = document.querySelector('#endTime') as HTMLInputElement
    let suggestionsForImprovement = document.querySelector('#suggestionsForImprovement') as HTMLInputElement

    let intRevMeetAtProSite = []
    let facilitiesArray = ['ppe', 'infrastructure', 'manpower', 'transport']

    facilitiesArray.forEach((facility, ind) => {
      let facilityData = document.querySelector(`input[name='${facility}']:checked`) as HTMLInputElement
      let remark = document.querySelector(`#${facility}_remark`) as HTMLInputElement
      console.log(facilityData.value)
      let data = {
        masterId: this.currentMasterId,
        facilities: ind + 1,
        adequate: facilityData.value == '1' ? 1 : 0,
        inAdeq: facilityData.value == '0' ? 1 : 0,
        location: meetinglocation.value,
        remark: remark.value,
        meetng_date: meetingDate.value
      }
      intRevMeetAtProSite.push(data)
    })

    let intRevMeetAtProSiteMaster = {
      masterId: this.currentMasterId,
      outdatedCalibration: outdatedCalibration.value,
      anyOtherDiffFaced: anyOtherDiffFaced.value,
      anyGoodPracticesObserved: anyGoodPracticesObserved.value,
      intimidation: intimidation.value,
      startTime: startTime.value,
      endTime: endTime.value,
      suggestionsForImprovement: suggestionsForImprovement.value
    }


    let formData = {
      intRevMeetAtProSiteMaster,
      intRevMeetAtProSite
    }

    console.log("final obj", formData)
    if (this.isInternalReviewFormData) {
      this.inspectionTraining.updateInternalReviewForm(this.currentMasterId, formData)
        .subscribe(data => {
          console.log('updted internal', data)
          this.interReviewMeetingLoad = false

        })
    } else {

      this.inspectionTraining.addInternalReviewForm(formData)
        .subscribe(data => {
          console.log('inter revirew added', data)
          this.interReviewMeetingLoad = false

        })
    }
  }

  SubmitClientFeedback() {
    let meetinglocationv = document.querySelector('#meeting_Location') as HTMLInputElement

    let openingCloProfessionallyv = document.querySelector('#openingcloprofessionally') as HTMLInputElement
    let nonConfirmitiesDiscussedv = document.querySelector('#nonconfirmitiesdiscussed') as HTMLInputElement
    let qualityOfNonConfirmativev = document.querySelector('#qualityofnonconfirmative') as HTMLInputElement
    let qualityOfWorkv = document.querySelector('input[name="quality"]:checked') as HTMLInputElement

    let suggestDifferentlyv = document.querySelector('#suggestdifferently') as HTMLInputElement
    let feedbackv = document.querySelector('#feedback') as HTMLInputElement
    let otherCommentsv = document.querySelector('#othercomments') as HTMLInputElement


    let feedbackform = {
      masterId: this.currentMasterId,
      clientId: this.masterData.clientId,
      projectId: this.masterData.projectId,
      location: meetinglocationv.value,

      openingCloProfessionally: openingCloProfessionallyv.value,
      nonConfirmitiesDiscussed: nonConfirmitiesDiscussedv.value,
      qualityOfNonConfirmative: qualityOfNonConfirmativev.value,
      qualityOfWork: qualityOfWorkv.value,

      suggestDifferently: suggestDifferentlyv.value,
      feedback: feedbackv.value,
      otherComments: otherCommentsv.value
    }

    console.log(feedbackform);
    // let formData ={
    //   feedbackform
    // }
    // console.log(formData);

    this.inspectionTraining.addClientFeedbackForm(feedbackform)
      .subscribe(data => {
        console.log('Feedback form Submited', data);
      })

  }



  uploadEuipmentForm() {
    let imageData = document.querySelector('#equipmentForm') as HTMLInputElement
    let equipmentImge: File = imageData.files[0]
    // console.log(equipmentImge)
    this.inspectionTraining.uploadEquipmentMaintainenceForm(this.currentMasterId, equipmentImge)
      .subscribe(data => {
        console.log('equipment upload', data)
      })
  }

  uploadOpeningClosing() {
    let imageData = document.querySelector('#openingClosingForm') as HTMLInputElement
    let equipmentImge: File = imageData.files[0]
    // console.log(equipmentImge)
    this.inspectionTraining.uploadOpeningClosingForm(this.currentMasterId, equipmentImge)
      .subscribe(data => {
        console.log('OC form upload', data)
      })
  }

  uploadInternalReviewForm() {
    let imageData = document.querySelector('#internalReviewFrom') as HTMLInputElement
    let Imge: File = imageData.files[0]
    // console.log(equipmentImge)
    this.inspectionTraining.uploadInternalReviewForm(this.currentMasterId, Imge)
      .subscribe(data => {
        console.log('internal review form upload', data)
      })
  }

  uploadSupervisorFrom() {
    let imageData = document.querySelector('#supervisorForm') as HTMLInputElement
    let Imge: File = imageData.files[0]
    // console.log(equipmentImge)
    this.inspectionTraining.uploadSuperVisorL1L2form(this.currentMasterId, Imge)
      .subscribe(data => {
        console.log('supervisor l1 form upload', data)
      })
  }

  uploadPerformanceForm() {
    let imageData = document.querySelector('#performanceForm') as HTMLInputElement
    let Imge: File = imageData.files[0]
    // console.log(equipmentImge)
    this.inspectionTraining.uploadPerformanceForm(this.currentMasterId, Imge)
      .subscribe(data => {
        console.log('performance from form upload', data)
      })
  }


  formStatus: any = {}
  getAllFormDataForCheck(masterId) {
    this.inspectionTraining.getAllFormStatus(masterId, this.userId)
      .subscribe(data => {
        console.log(data)
        this.formStatus = data
      })
  }



  masterViewData = []
  getMasterDataForDownload() {
    this.inspectionTraining.getAllMasterDataView(this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterViewData = data.map(d => {
          d.fromDate = new Date(d.fromDate).toISOString().substring(0, 10)
          d.toDate = new Date(d.toDate).toISOString().substring(0, 10)
          return d
        })

      }, err => {
        console.log(err)
      })

  }

  genLoad = {

  }
  downloadSampling(data) {
    let mData = data
    this.genLoad[mData.masterId] = {}
    this.genLoad[mData.masterId]['load'] = true
    this.genLoad[mData.masterId]['error'] = false
    this.genLoad[mData.masterId]['url'] = ''
    console.log(mData)
    this.clientService.generateSamplingFinalReport(mData.clientId, mData.projectId, mData.fromDate, mData.cycleId, mData.toDate, 'pune')
      .subscribe(data => {
        console.log('report geneated', data)
        this.genLoad[mData.masterId].load = false
        this.genLoad[mData.masterId].error = false
        this.genLoad[mData.masterId]['url'] = 'hello'
      }, err => {
        console.log('err')
        this.genLoad[mData.masterId].load = false
        this.genLoad[mData.masterId].error = true
      })
  }

  performanceFormload = {
    load: false,
    error: false,
    url: ''
  }
  downloadPerformanceForm() {
    this.performanceFormload.load = true
    this.inspectionTraining.downloadOnsitePerformanceForm(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        this.performanceFormload.load = false
        this.performanceFormload.url = data.url

      }, err => {
        console.log(err)
        this.performanceFormload.load = false
        this.performanceFormload.error = false

      })
  }

  supervisionForm = {
    load: false,
    error: false,
    url: ''
  }
  downloadUpervisionL1L2() {
    this.supervisionForm.load = true
    this.inspectionTraining.downloadSupervisionL1L2(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        this.supervisionForm.load = false
        this.supervisionForm.url = data.url

      }, err => {
        console.log(err)
        this.supervisionForm.load = false
        this.supervisionForm.error = false

      })
  }

  openingClosingForm = {
    load: false,
    error: false,
    url: ''
  }
  downloadOpeningClosingForm() {
    this.openingClosingForm.load = true
    this.inspectionTraining.downloadOpeningClosingMeeting(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        this.openingClosingForm.load = false
        this.openingClosingForm.url = data.url

      }, err => {
        console.log(err)
        this.openingClosingForm.load = false
        this.openingClosingForm.error = false

      })
  }
  internalReviewMeetingForm = {
    load: false,
    error: false,
    url: ''
  }
  downloadInternalReviewMeeting() {
    this.internalReviewMeetingForm.load = true
    this.inspectionTraining.downloadInternelReviewMeeting(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        this.internalReviewMeetingForm.load = false
        this.internalReviewMeetingForm.url = data.url

      }, err => {
        console.log(err)
        this.internalReviewMeetingForm.load = false
        this.internalReviewMeetingForm.error = false

      })
  }

  teamInspectionForm = {
    load: false,
    error: false,
    url: ''
  }
  downloadTeamInspectionForm() {
    this.teamInspectionForm.load = true
    this.inspectionTraining.downloadTeamInspectionForm(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        this.teamInspectionForm.load = false
        this.teamInspectionForm.url = data.url

      }, err => {
        console.log(err)
        this.teamInspectionForm.load = false
        this.teamInspectionForm.error = false

      })
  }

  myequipmentFormLoad = {
    load: false,
    error: false,
    url: ''
  }
  downloadEquipmentForm() {
    console.log('generating')
    this.myequipmentFormLoad.load = true
    this.inspectionTraining.downloadEquipmentForm(this.currentMasterId, this.userId)
      .subscribe(data => {
        console.log(data)
        this.myequipmentFormLoad.load = false
        this.myequipmentFormLoad.url = data.url

      }, err => {
        console.log(err)
        this.myequipmentFormLoad.load = false
        this.myequipmentFormLoad.error = false

      })
  }


  clientFeedBackLoad = {
    load: false,
    error: false,
    url: ''
  }
  downloadClientFeedback() {
    console.log('generating')
    this.clientFeedBackLoad.load = true
    this.inspectionTraining.downloadClientFeedbackForm(this.currentMasterId)
      .subscribe(data => {
        console.log(data)
        this.clientFeedBackLoad.load = false
        this.clientFeedBackLoad.url = data.url

      }, err => {
        console.log(err)
        this.clientFeedBackLoad.load = false
        this.clientFeedBackLoad.error = false

      })
  }

}





