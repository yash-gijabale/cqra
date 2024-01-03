import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';

export class UserData {
  constructor(
    public clientId: number,
    public projectName: string,
    public projectCode: string,
    public projectAddress: string,
    public projectCity: string,
    public projectKValue: string,
    public projectRegionalManagerId: string,
    public projectStartDate: string,
    public projectEndDate: string,
    public projectMisNCs: string,
    public projectNCOpen: string,
    public projectRedalert: string,
    public projectCCmails: string,
    public projectAutoNCOpen: string,
    public projectAutoNCOpenWithEmail: string
  ) {

  }
}

export class UserView {
  constructor(
    public userId: number,
    public userName: string,
    public userFullName: string,
    public email: string,

  ) {

  }
}

export class UserAllocationView {
  constructor(
    public projectId: number,
    public projectName: string,
    public stageId: number,
    public stageName: string,
    public status: string,
    public structureId: number,
    public structureName: string,
    public tradeId: number,
    public tradeName: string,
    public userAllocationId: number,
    public userFullName: string,
    public userId: number,
    public username: string,
  ) { }
}

@Component({
  selector: 'app-user-allocation',
  templateUrl: './user-allocation.component.html',
  styleUrls: ['./user-allocation.component.css']
})
export class UserAllocationComponent implements OnInit {


  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<UserView> = new Subject();

  projects: UserData[];
  users: UserView[];
  userAllocation: UserAllocationView
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50]
    };

    this.userService.getUserAllocation().subscribe((data) => {
      console.log('userAllocation', data);
      //this.users= data;
      this.userAllocation = data

      // ADD THIS
      this.dtTrigger.next();

    }, (err) => {
      console.log('-----> err', err);
    });

  }


}
