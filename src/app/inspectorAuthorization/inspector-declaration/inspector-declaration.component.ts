import { Component, OnInit, ViewChild } from '@angular/core';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ProjectData, ProjectView } from 'src/app/project/project.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { forEach } from '@angular/router/src/utils/collection';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';

@Component({
  selector: 'app-inspector-declaration',
  templateUrl: './inspector-declaration.component.html',
  styleUrls: ['./inspector-declaration.component.css']
})
export class InspectorDeclarationComponent implements OnInit {

  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  dtElement2: DataTableDirective;
  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject<any>();

  SelUserId: String
  products: ProjectView[]
  isProjectLoad: boolean = false
  userList = []

  projectSearchData: ProjectView[]

  declarationUserList = []

  clientProjectObject = {}

  logUser = Number(localStorage.getItem('id'))

  dtmuserLoad: boolean = false

  constructor(
    private inspectionTraining: InspectorTraning,
    private cleintService: ClientServiceService,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
    };

    this.dtOptions2 = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
    };

    this.inspectionTraining.getTrainingApprovedUser()
      .subscribe(data => {
        console.log(data)
        this.userList = data
      })

    this.isProjectLoad = true
    this.cleintService.getAllProject()
      .subscribe(data => {
        console.log(data)
        this.projectSearchData = data
        this.products = data
        this.isProjectLoad = false

        this.generateClientProjectObject(data)
      })

    this.dtmuserLoad = true
    this.inspectionTraining.getDeclarationUserList()
      .subscribe(data => {
        let useobjcheck = {}
        let list = data.filter(item => {
          if (item != null) {
            if (!useobjcheck[item.userId]) {
              useobjcheck[item.userId] = true
              return item
            }
          }
        })
     
        this.declarationUserList = list
        console.log(this.declarationUserList)
        this.dtmuserLoad = false
        this.dtTrigger.next()
      }, err =>{
        console.log(err)
      })
  }


  searchProjcets(e) {
    let filteredPprojcet = this.projectSearchData.filter(project => {
      if (project.projectName.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
        return project
      }
    })

    this.products = filteredPprojcet
  }

  generateClientProjectObject(data) {
    data.forEach(item => {
      this.clientProjectObject[item.projectId] = item.clientId
    })
  }

  assignProjectList = []
  addToProjectList(e) {
    if (e.target.checked) {
      this.assignProjectList.push(Number(e.target.value))
    } else {
      let updateTradeArray = this.assignProjectList.filter(trade => {
        if (trade != e.target.value) {
          return trade
        }
      })

      this.assignProjectList = updateTradeArray
    }

    console.log(this.assignProjectList)
  }


  assignLoad = false
  saveAssignProjects() {
    let date = new Date().toISOString().slice(0, 10)
    this.assignLoad = true
    let assignProjectData = []
    this.assignProjectList.forEach(projectId => {
      let data = {
        clientId: this.clientProjectObject[projectId],
        projectId: projectId,
        userId: Number(this.SelUserId),
        dtmId: this.logUser
        // trainingDate: date
      }
      assignProjectData.push(data)
    })

    console.log(assignProjectData)
    console.log(Number(this.SelUserId))
    // return

    this.inspectionTraining.assignMultipleProject(assignProjectData,this.logUser)
      .subscribe(data => {
        console.log('project asigbed', data)
        this.inspectionTraining.sendMailDeclaration(Number(this.SelUserId))
          .subscribe(data => {
            console.log('email send', data)
          })

        this.snackBar.showSuccess('Project Assign Successfuly !')
        this.assignLoad = false
      }, err => {
        console.log(err)
        this.snackBar.showSnackError()
      })
  }

  toggleComment(id, type) {
    let commentBox = document.querySelector(`.comment-box-${id}`) as HTMLDivElement
    console.log(commentBox)

    if (type === 'show') {
      commentBox.classList.remove('comment-box-hide')
    } else if (type === 'hide') {
      commentBox.classList.add('comment-box-hide')
    }

  }

  toggleDeclineComment(id, type) {
    let commentBox = document.querySelector(`.comment-decline-${id}`) as HTMLDivElement
    console.log(commentBox)

    if (type === 'show') {
      commentBox.classList.remove('comment-box-hide')
    } else if (type === 'hide') {
      commentBox.classList.add('comment-box-hide')
    }
  }

  userDeclaration = []
  userDetailsLoad: boolean = false
  getUserDetails(userId) {
    this.userDetailsLoad = true
    this.inspectionTraining.getUserDeclarationDetails(userId)
      .subscribe(data => {
        console.log(data);
        let srNo = 0
        this.userDeclaration = data.map(d => {
          srNo += 1
          return {
            ...d,
            srNo: srNo,
            trainingDate: d.trainingDate && new Date(d.trainingDate).toISOString().substring(0, 10),
          }
        })
        console.log(this.userDeclaration)
        this.userDetailsLoad = false
        this.dtTrigger2.next()
      })


    this.formLoad = {} //To remove load data

  }

  approvedProjectData = {}
  approveLoad: boolean = false
  declineLoad: boolean = false
  approveBtnLoad = {}
  addToApproveProject(projectId, status, userId) {
    let isComfirm;
    if (status === 1) {
      isComfirm = confirm('Are you sure want to approve this project')
      if (isComfirm) {
        this.approveLoad = true
        this.approveBtnLoad[projectId] = {
          load: true
        }
      }
    } else if (status === 2) {
      isComfirm = confirm('Are you sure want to decline this project')
      if (isComfirm) {
        this.declineLoad = true
        this.approveBtnLoad[projectId] = {
          load: true
        }
      }

    }
    if (isComfirm) {
      this.approvedProjectData[projectId] = status
      console.log(this.approvedProjectData)
      let data = {
        dtmStatus: Number(status)
      }

      this.inspectionTraining.updateDtmStatus(projectId, userId, this.logUser, data)
        .subscribe(data => {
          console.log('updated status', data)
          this.declineLoad = false
          this.approveLoad = false
          this.approveBtnLoad[projectId] = {
            load: false
          }
          this.getUserDetails(userId)

        })

    }
  }

  submitDTMStatus() {
    let newData = this.userDeclaration.map(item => {
      if (this.approvedProjectData[item.projectId]) {

        let data = {
          clientId: item.clientId,
          comment: item.comment,
          dtmStatus: this.approvedProjectData[item.projectId] == 2 ? 0 : this.approvedProjectData[item.projectId],
          isActive: item.isActive,
          projectId: item.projectId,
          trainingDate: item.trainingDate,
          userId: item.userId,
          userStatus: item.userStatus,
          userProjectId: item.userProjectId
        }

        return data
      } else {
        return item
      }


    })
    console.log(newData)

    this.inspectionTraining.submitDeclarationForm(newData, this.logUser)
      .subscribe(data => {
        console.log('declaration updated', data)
      })

  }

  preAllocatedProjects = {}
  getUSerProjects() {
    this.inspectionTraining.getUserDeclarationDetails(this.SelUserId)
      .subscribe(data => {
        console.log(data)
        data.forEach(d => {
          this.preAllocatedProjects[d.projectId] = true
        })
      })

  }


  formLoad = {}
  downloadDeclarationForm(userId, projectId) {
    console.log(this.formLoad)
    this.formLoad[projectId] = {
      load: true,
      url: '',
      error: false
    }
    this.inspectionTraining.downloadDeclarationFrom(userId, projectId)
      .subscribe(data => {
        console.log('report gen', data)
        this.formLoad[projectId].load = false
        this.formLoad[projectId].url = data.url
      }, err => {
        this.formLoad[projectId].error = true

      })
  }

}
