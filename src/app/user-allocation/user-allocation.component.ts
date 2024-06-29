import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';
import { CommonService } from '../common.service';
import { ClientServiceService } from '../service/client-service.service';
import { ProjectView } from '../project/project.component';
import { StructureData } from '../wbs/wbs.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { TradeData } from '../create-tarde/create-tarde.component';

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

  projects: ProjectView[];
  users: UserView[];
  structures:StructureData[]
  trades:TradeData
  userAllocation: UserAllocationView
  SelProject:Number = 0
  SelTrade:Number = 0
  SelStructure:number = 0
  SelUser:Number = 0
  constructor(
    private commonService: CommonService,
    private clientService:ClientServiceService,
    private tradeMaintance : TradeMaintanceService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50]
    };

    this.commonService.getAllUsers()
      .subscribe(data => {
        this.users = data
        console.log('users', data)
      })


    this.clientService.getAllProject()
      .subscribe(data => {
        console.log('projects ==>', data)
        this.projects = data;
      })

  }

  getStructure() {
    console.log(this.SelProject)
    this.commonService.getStructureByProjectId(this.SelProject)
      .subscribe(
        (data) => {
          console.log('Structure Data==', data)
          this.structures = data;

        }, (err) => {
          console.log('-----> err', err);
        })

    this.tradeMaintance.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

  }


}
