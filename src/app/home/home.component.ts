import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  desc1: String = "Q/S Assure is a modern technology system for onsite management of quality assurance and quality control. Q/S Assure aligns all quality assurance measures like work procedures, method statements, mock ups, trainings and work authorizations with the actual flow of work.Once the activities are in progress, the quality control function enables our team to capture the data along with photographs.Q / S Assure automatically generates NCs from the site data based on the preset rules considering the severity and frequency of observation.It also tracks closure of NCs with corrective actions.Through this software, the report generation is automated leading to better implementation of QA / QC processes."
  desc2:String = "Q/S Assure is a modern technology system for onsite management of quality assurance and quality control."

  desc3:String = "Q Control helps monitor the quality of supervision of the contractor's staff and client’s engineers. It makes the process of site supervision paper less with all checklists /pour cards uploaded on the cloud. Authorised persons from the contractor's side (makers) download the relevant checklist/pour card on their smart phones and raise inspection requests to the client’s engineers (checker). The checker inspects the work and uploads the filled out checklists along with supporting photographs. If there are pending rectifications, the checklists go back to the maker. The entire transactions between makers and checkers can be monitored online from anywhere on a real time basis. The technology ensures diligent on ground checking with evidence of photograph and brings in accountability to the supervising team."
  desc4:String = "Q Control helps monitor the quality of supervision of the contractor's staff and client’s engineers."
  ngOnInit() {
    
  }


  launchLoad: boolean = false
  getUserMenu() {
    this.launchLoad = true
    let userId = localStorage.getItem('id')
    this.userService.getUserAccess(userId)
      .subscribe(data => {
        console.log(data)
        localStorage.setItem('userMenu', JSON.stringify(data))
        this.launchLoad = false
        this.router.navigate(['dashboard'])

      })

  }

  show:boolean = true
  showMore(type){
    if(type === 1){
      this.desc2 = this.desc1
    }else if(type === 2){
      this.desc4 = this.desc3
    }
  }
}
