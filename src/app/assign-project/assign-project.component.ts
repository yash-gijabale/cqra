import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

export class AssignedProjectData {
  constructor(
    public userProjectId: number,
    public clientId: number,
    public projectId: number,
    public userId: number
  ) { }
}
@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.css']
})
export class AssignProjectComponent implements OnInit {
  title = "datatable";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ProjectData> = new Subject<ProjectData>();
  projects: ProjectData[]

  projectIds: object = {}

  userId: number

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId']

    // let projects = {}
    this.userService.getAssignedProjectByUserId(this.userId)
      .subscribe(data => {
        console.log(data)
        data.forEach(item => {
          this.projectIds[item.projectId] = true
        });
        console.log(this.projectIds)
      })


    console.log(this.userId)
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };
    this.commonService.getAllProject()
      .subscribe(data => {
        console.log(data)
        this.projects = data
        this.dtTrigger.next()
      })
  }

  assignProject(event, id: any, clientId: any) {
    let assignData = {
      clientId: clientId,
      projectId: id,
      userId: this.userId,
      isActive: 1
    }
    if (!event.target.checked) {
      let isDeactivet = confirm('Are you sure want to deactivate ?')
      if (!isDeactivet) {
        event.target.checked = true
        return
      }
      console.log(event.target.checked)
      console.log(id)
    } else {

      this.userService.assignProject(assignData)
        .subscribe(data => console.log('project assied-->', data))
      console.log(event.target.checked)
      console.log(id)
    }
  }

}
