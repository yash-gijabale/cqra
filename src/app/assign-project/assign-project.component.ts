import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas'

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


  @ViewChild('content') el!: ElementRef

  projectIds: object = {}

  userId: number
  userFullName: String

  isLoading = false

  toggelSendmailBtn: boolean = false

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {

    console.log('sessionid', sessionStorage.getItem('id'))
    this.userId = this.route.snapshot.params['userId']



    // this.userService.retriveUser(this.userId)
    // .subscribe(data => {
    //   let user = data
    //   console.log(data)
    //   this.userFullName = data.userFullName
    // })

    // let projects = {}
    this.isLoading = true

    this.getAllAssignedProjects()
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
        this.isLoading = false
      })
  }

  getAllAssignedProjects() {
    this.userService.getAssignedProjectByUserId(this.userId)
      .subscribe(data => {
        console.log(data)
        this.projectIds = {}
        data.forEach(item => {
          this.projectIds[item.projectId] = true
        });
        console.log(this.projectIds)
        this.setToggelEmailBtn()
      })
  }

  checkIsProjectisAssigned() {
    let projectsIds = Object.keys(this.projectIds)
    console.log(projectsIds)
    return projectsIds.length > 0 ? true : false
  }

  setToggelEmailBtn() {
    let isAnyProject = this.checkIsProjectisAssigned()
    console.log(isAnyProject)
    if (isAnyProject) {
      this.toggelSendmailBtn = true
    } else {
      this.toggelSendmailBtn = false
    }
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

      } else {
        this.isLoading = true
        this.userService.removeUserProject(id, this.userId)
          .subscribe(data => {
            console.log('project removed-->', data)
            this.isLoading = false
            this.getAllAssignedProjects()
          })
      }
      console.log(event.target.checked)
      console.log(id)
    } else {

      this.isLoading = true
      this.userService.assignProject(assignData)
        .subscribe(data => {
          console.log('project assied-->', data)
          this.isLoading = false
          this.getAllAssignedProjects()


        })
      console.log(event.target.checked)
      console.log(id)
    }
  }


  generatePdf() {
    // let table = document.querySelector('#table') as HTMLElement;
    // let data = document.getElementById('table') as HTMLElement;
    // html2canvas(data).then(canvas => {
    //   var imgWidth = 208;
    //   // var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   canvas.style.border = '1px solid black'
    //   // var heightLeft = imgHeight;
    //   const contentDataURL = canvas.toDataURL('image/png')
    //   console.log(contentDataURL)
    //   let pdf = new jsPDF('p', 'mm', 'a4');
    //   var position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdf.save('Filename.pdf');
    // });

  }


  sendMail() {
   
  }

  localUrl: any
  getFile(event) {
    console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;

      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(this.localUrl)
    }
  }
}
