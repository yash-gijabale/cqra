import { Component, OnInit } from '@angular/core';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ProjectData, ProjectView } from 'src/app/project/project.component';

@Component({
  selector: 'app-inspector-declaration',
  templateUrl: './inspector-declaration.component.html',
  styleUrls: ['./inspector-declaration.component.css']
})
export class InspectorDeclarationComponent implements OnInit {

  SelUserId: String
  products: ProjectView[]
  isProjectLoad: boolean = false
  userList = []


  constructor(
    private inspectionTraining: InspectorTraning,
    private cleintService: ClientServiceService
  ) { }

  ngOnInit() {

    this.inspectionTraining.getTrainingApprovedUser()
      .subscribe(data => {
        console.log(data)
        this.userList = data
      })

    this.isProjectLoad = true
    this.cleintService.getAllProject()
      .subscribe(data => {
        console.log(data)
        this.products = data
        this.isProjectLoad = false
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


  saveAssignProjects(){
    let date = new Date().toISOString().slice(0, 10)
    let assignProjectData = []
    this.assignProjectList.forEach(projectId =>{
      let data = {
        projectId: projectId,
        userId: Number(this.SelUserId),
        trainingDate: date
      }
      assignProjectData.push(data)
    })

    console.log(assignProjectData)
    console.log(Number(this.SelUserId))

    this.inspectionTraining.assignMultipleProject(assignProjectData)
    .subscribe(data =>{
      console.log('project asigbed',data)

      this.inspectionTraining.sendMailDeclaration(Number(this.SelUserId))
      .subscribe(data => {
        console.log('email send', data)
      })
    })
  }
}
