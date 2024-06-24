import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { ProjectData } from 'src/app/project/project.component';

@Component({
  selector: 'app-client-supervisor-engineer-changed',
  templateUrl: './client-supervisor-engineer-changed.component.html',
  styleUrls: ['./client-supervisor-engineer-changed.component.css']
})
export class ClientSupervisorEngineerChangedComponent implements OnInit {

  projects: ProjectData[] = []

  constructor(
    private commonService: CommonService,
  ) { }

  status = [
    {
      id: 'p',
      value: 'Pending'
    },
    {
      id: 'ns',
      value: 'Mail not send'
    },
    {
      id: 's',
      value: 'Sent'
    },
    {
      id: 'c',
      value: 'Close'
    }
  ]

  ngOnInit() {
    this.commonService.getAllProject().subscribe((data) => {
      this.projects = data
    })
  }

  load: boolean = false
  search() {
    this.load = true
  }

}
