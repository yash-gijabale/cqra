import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';

@Component({
  selector: 'app-inspector-declaration-view',
  templateUrl: './inspector-declaration-view.component.html',
  styleUrls: ['./inspector-declaration-view.component.css']
})
export class InspectorDeclarationViewComponent implements OnInit {

  constructor(
    private inspectorService: InspectorTraning
  ) { }

  userId = localStorage.getItem('id')
  userDetails = []
  ngOnInit() {
    this.inspectorService.getUserDeclarationDetails(this.userId)
      .subscribe(data => {
        console.log(data)
        this.userDetails = data
      })

  }


  commentAndStatus = {}
  toggleComment(projectId, type, e) {
    if (e.target.title) {
      this.commentAndStatus[projectId] = {
        status: e.target.title
      }
    }
    let commentBox = document.querySelector(`.comment-box-${projectId}`) as HTMLDivElement
    console.log(commentBox)

    if (type === 'show') {
      commentBox.classList.remove('comment-box-hide')
    } else if (type === 'hide') {
      commentBox.classList.add('comment-box-hide')
    }

    let comment = document.querySelector(`.comment-${projectId}`) as HTMLInputElement

    console.log(this.commentAndStatus)

  }

  userDeclaration = []
  userDetailsLoad: boolean = false
  getUserDetails(userId) {
    this.userDetailsLoad = true
    this.inspectorService.getUserDeclarationDetails(userId)
      .subscribe(data => {
        console.log(data)
        this.userDeclaration = data
        this.userDetailsLoad = false
      })
  }


  submitDeclarationFromInspector() {
    let newData = this.userDetails.map(item => {
      let comment = document.querySelector(`.comment-${item.projectId}`) as HTMLInputElement
      let data = {
        clientId: item.clientId,
        comment: comment.value,
        dtmStatus: item.dtmStatus,
        isActive: item.isActive,
        projectId: item.projectId,
        trainingDate: item.trainingDate,
        userId: item.userId,
        userStatus: Number(this.commentAndStatus[item.projectId].status),
        userProjectId: item.userProjectId
      }

      return data
    })

    console.log(newData)

    this.inspectorService.submitDeclarationForm(newData)
    .subscribe(data =>{
      console.log('declaration updated', data)
    })
  }
}

