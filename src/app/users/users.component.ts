import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';
import { TradeMaintanceService } from '../trade-maintance.service';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';

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
  userRole: Number
  SelUser: string = "0";
  userMenu: any = {}
  constructor(
    private userService: UserService,
    private router: Router,
    private tradeService: TradeMaintanceService,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {

    this.userRole = Number(localStorage.getItem('roleId'))
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

  deleteLoad: boolean = false
  deactivateUser(id) {
    let idDeactivate = confirm('Are you sure want to deactivate ?')
    if (idDeactivate) {
      this.deleteLoad = true
      this.userService.deactivateUser(id, false)
        .subscribe(data => {
          console.log('deactivated...', data)
          this.deleteLoad = false
          location.reload()
        })
    }
  }

  activateUser(id){
    let activate = confirm('Are you sure want to activate this user ?')
    if (activate) {
      this.deleteLoad = true
      this.userService.deactivateUser(id, true)
        .subscribe(data => {
          console.log('deactivated...', data)
          this.deleteLoad = false
          location.reload()
        })
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
        console.log("Accsess To", data)
        this.userMenu = data
      })
  }

  resetPassUser: any = {
    userId: 0,
    userName: ''
  }
  setResetUser(user) {
    this.resetPassUser.userId = user.id
    this.resetPassUser.userName = user.userFullName
  }
  passEror: boolean = false
  isLoad: boolean = false
  resetPassword() {
    if (this.resetPassUser.userId) {
      let newPassword = document.getElementById('newPassword') as HTMLInputElement
      let confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement
      let form = document.getElementById('resetForm') as HTMLFormElement
      if (newPassword.value !== confirmPassword.value) {
        this.passEror = true
        setTimeout(() => {
          this.passEror = false
        }, 3000)
        return
      }

      if (confirmPassword.value == '') {
        return
      }
      this.isLoad = true
      this.userService.resetPassword(this.resetPassUser.userId, { password: newPassword.value })
        .subscribe(data => {
          console.log(data)
          this.isLoad = false
          this.snackBar.showSuccess('Password updated')
          form.reset()

        }, err => {
          this.isLoad = false

          this.snackBar.showSnackError()
        })
    }

  }

  goToAccess(id){
    this.router.navigate(['createUserAccess',id])
  }

}
