import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-inspector-declaration-view',
  templateUrl: './inspector-declaration-view.component.html',
  styleUrls: ['./inspector-declaration-view.component.css']
})
export class InspectorDeclarationViewComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private inspectorService: InspectorTraning,
    private userService: UserService
  ) { }

  userId = localStorage.getItem('id')
  userDetails = []
  userData:any = {}
  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
    };

    this.inspectorService.getUserDeclarationDetails(this.userId)
      .subscribe(data => {
        let srNo = 0
        this.userDetails = data.map(d => {
          srNo += 1
          return {
            ...d,
            srNo: srNo,
            trainingDate: d.trainingDate && new Date(d.trainingDate).toISOString().substring(0, 10),
          }
        })
        console.log(this.userDetails)
        this.dtTrigger.next()
      })

    this.userService.retriveUser(this.userId)
    .subscribe(data =>{
      console.log(data)
      if(data.length){
        this.userData = data[0]
      }
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
  getUserDetails(userId, projectId) {
    this.userDetailsLoad = true
    this.inspectorService.getUserDeclarationByuserAndProject(userId, projectId)
      .subscribe(data => {
        console.log(data)

        this.userDeclaration = data.map(item => {
          item.trainingDate = new Date(item.trainingDate).toISOString().substring(0, 10)
          return item
        })
        this.userDetailsLoad = false
      })
  }


  declarationLoad: boolean = false
  submitDeclarationFromInspector() {
    this.declarationLoad = true
    let newData = this.userDeclaration.map(item => {
      let comment = document.querySelector(`.comment-${item.projectId}`) as HTMLInputElement
      let data = {
        ...item,
        comment: comment.value,
        userStatus: Number(this.commentAndStatus[item.projectId].status),
      }

      return data

    })

    console.log(newData)

    this.inspectorService.submitDeclarationForm(newData)
      .subscribe(data => {
        console.log('declaration updated', data)
        this.declarationLoad = false
      })
  }
}

