import { Component, OnInit, ViewChild } from '@angular/core';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ProjectData, ProjectView } from 'src/app/project/project.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { forEach } from '@angular/router/src/utils/collection';

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

  SelUserId: String
  products: ProjectView[]
  isProjectLoad: boolean = false
  userList = []

  projectSearchData : ProjectView[]

  declarationUserList = []

  clientProjectObject = {}

  constructor(
    private inspectionTraining: InspectorTraning,
    private cleintService: ClientServiceService
  ) { }

  ngOnInit() {

    this.dtOptions = {
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

    this.inspectionTraining.getDeclarationUserList()
      .subscribe(data => {
        // this.declarationUserList = data
        let list = data.filter(item => {
          if (item != null) {
            return item
          }
        })
        this.declarationUserList = list
        console.log(this.declarationUserList)
        this.dtTrigger.next()
      })
  }


  searchProjcets(e){
    let filteredPprojcet = this.projectSearchData.filter(project =>{
        if(project.projectName.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())){
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


  saveAssignProjects() {
    let date = new Date().toISOString().slice(0, 10)
    let assignProjectData = []
    this.assignProjectList.forEach(projectId => {
      let data = {
        clientId: this.clientProjectObject[projectId],
        projectId: projectId,
        userId: Number(this.SelUserId),
        trainingDate: date
      }
      assignProjectData.push(data)
    })

    console.log(assignProjectData)
    console.log(Number(this.SelUserId))

    this.inspectionTraining.assignMultipleProject(assignProjectData)
      .subscribe(data => {
        console.log('project asigbed', data)

        this.inspectionTraining.sendMailDeclaration(Number(this.SelUserId))
          .subscribe(data => {
            console.log('email send', data)
          })
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
        console.log(data)
        this.userDeclaration = data
        this.userDetailsLoad = false
      })
  }

  approvedProjectData = {}
  addToApproveProject(projectId, status) {
    this.approvedProjectData[projectId] = status
    console.log(this.approvedProjectData)
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
      }else{
        return item
      }

      
    })
    console.log(newData)
    
    this.inspectionTraining.submitDeclarationForm(newData)
    .subscribe(data =>{
      console.log('declaration updated', data)
    })

  }

  
}
