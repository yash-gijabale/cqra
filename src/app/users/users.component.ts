import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';
import { TradeMaintanceService } from '../trade-maintance.service';

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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTriggerCqra: Subject<UserView> = new Subject();
  dtTriggerClinet: Subject<UserView> = new Subject();
  dtTriggerContractor: Subject<UserView> = new Subject();
  dtTriggerPmc: Subject<UserView> = new Subject();

  projects: UserData[];
  users: UserView[];
  clientUers: UserView[];
  contractorUsers: UserView[];
  pmcUsers: UserView[];
  isLoading = false

  activeTab: String = 'cqra'
  userLoad: boolean = false

  SelUser: string = "0";
  userMenu: any = {}
  constructor(
    private userService: UserService,
    private router: Router,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50]
    };

    // this.userLoad = true
    this.userService.getUserDataByRepresentative(1)
      .subscribe((data) => {
        this.users = data;
        // this.userLoad = false
        console.log("CQRA users", data)
        this.dtTriggerCqra.next()
      })
    this.userService.getUserDataByRepresentative(2)
      .subscribe((data) => {
        this.clientUers = data;
        console.log("CQRA users", data)
        this.dtTriggerClinet.next()
      })
    this.userService.getUserDataByRepresentative(3)
      .subscribe((data) => {
        this.contractorUsers = data;
        console.log("CQRA users", data)
        this.dtTriggerContractor.next()
      })
    this.userService.getUserDataByRepresentative(4)
      .subscribe((data) => {
        this.pmcUsers = data;
        console.log("CQRA users", data)
        this.dtTriggerPmc.next()
      })

  }

  // tabload: boolean = false
  changePannel(tab) {
    // this.tabload = true
    this.activeTab = tab

    // this.dtTrigger.unsubscribe()
    // this.userService.getUserDataByRepresentative(id)
    //   .subscribe((data) => {
    //     this.users = data;
    //     console.log("Data", data)
    //     this.tabload = false

    //     this.dtTrigger.next()

    //   })
  }


  editUser(id) {
    this.router.navigate(['createUser', id])
  }

  deactivateUser(id) {
    let idDeactivate = confirm('Are you sure want to deactivate ?')
    if (idDeactivate) {
      this.userService.deactivateUser(id)
        .subscribe(data => console.log('deactivated...', data))
    }
  }

  traningTrades = []
  isTradeLoad: boolean = false
  getTraningTrade(userId) {
    this.isTradeLoad = true
    this.userService.getAssignedProjectByUserId(userId)
      .subscribe(data => {
        console.log(data)
        data.forEach(project => {
          let projectTrade = {
            project: project.projectId,
            trades: []
          }
          this.tradeService.getProjectTradesScheme(project.projectId)
            .subscribe(trade => {
              projectTrade.trades = trade
            })

          this.traningTrades.push(projectTrade)
        })

        console.log(this.traningTrades)
        this.isTradeLoad = false
      })
  }

  getUserAccess(id) {
    this.userService.getUserAccess(id)
      .subscribe(data => {
        console.log("Accsess To",data)
        this.userMenu = data
      })
  }

}
