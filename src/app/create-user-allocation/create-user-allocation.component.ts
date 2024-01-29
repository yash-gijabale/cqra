import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientServiceService } from "../service/client-service.service";
import { CommonService } from "../common.service";
import { ProjectData, ProjectView } from "../project/project.component";
import { ClientData } from "../client/client.component";
import { data } from "jquery";
import { Trade } from "../trade/trade.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { UserView } from "../user-log/user-log.component";
import { CheckListView } from "../edit-non-conf/edit-non-conf.component";
import { UserService } from "../service/user.service";
import { first } from "rxjs/operators";

export class UseAllocationData {
  constructor(
    public userAllocationId: number,
    public userId: number,
    public projectId: number,
    public structureId: number,
    public stageId: number,
    public unitId: number,
    public subunitId: number,
    public tradeId: number,
    public status: boolean
  ) { }
}

@Component({
  selector: "app-create-user-allocation",
  templateUrl: "./create-user-allocation.component.html",
  styleUrls: ["./create-user-allocation.component.css"],
})
export class CreateUserAllocationComponent implements OnInit {
  userAllocationForm: FormGroup;
  submitted = false;
  SelUser: string = "0";
  SelProject: string = "0";
  SelStructure: string = "0";
  SelChecklist: string = "0";
  SelClientId: string = "0";
  SelStage: string = "0";
  structures: any;
  stages: any;
  SelTrade: string = "0";

  clients: ClientData[]
  trades: Trade
  users: UserView[]
  projects: ProjectView[];
  checklists: any

  allocationId: number


  isbtnLoading = false
  // allocatedCheckList: Array<number> = []
  // allocatedStages: Array<number> = []

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commanService: CommonService,
    private tradeMaintance: TradeMaintanceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.allocationId = this.route.snapshot.params['id']
    if (this.allocationId != -1) {
      let allocationData;
      this.userService.retriveAllocation(this.allocationId)
        .pipe(first())
        .subscribe(data => {
          console.log('data->', data)
          allocationData = data;

          // this.commanService.getClientProject(allocationData.clientId).subscribe(data => this.projects = data)

          this.commanService.getStructureByProjectId(allocationData.projectId).subscribe(data => this.structures = data)

          this.tradeMaintance.getProjectTrades(allocationData.projectId).subscribe(data => this.trades = data, err => console.log(err))

          this.commanService.getStagesByStructureId(allocationData.structureId).subscribe(data => this.stages = data)

          this.commanService.getChecklistsByTrade(allocationData.tradeId).subscribe(data => this.checklists = data)

          this.userAllocationForm.patchValue(data)
        })
    }

    this.commanService.getAllUsers()
      .subscribe(data => {
        this.users = data
      })

    this.clientServiceService.getAllProject()
      .subscribe(data => {
        console.log('projects ==>', data)
        this.projects = data;
      })


    this.userAllocationForm = this.formBuilder.group({
      userId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      stageId: ['', Validators.required],
      tradeId: ['', Validators.required],
      checklistId: ['', Validators.required]
    })

  }
  get f() {
    return this.userAllocationForm.controls;
  }

  onSubmit() {
    console.log("Id==");
    console.log(this.userAllocationForm.value)

    let formData = this.userAllocationForm.value
    let AllocationData = []
    let checklistIds = this.userAllocationForm.value.checklistId
    let stageId = this.userAllocationForm.value.stageId
    checklistIds.forEach((id) => {
      stageId.forEach((stageId) => {
        let data = {
          userId: this.userAllocationForm.value.userId,
          projectId: this.userAllocationForm.value.projectId,
          structureId: this.userAllocationForm.value.structureId,
          tradeId: this.userAllocationForm.value.tradeId,
          stageId: stageId,
          checklistId: id
        }
        AllocationData.push(data)
      })
    })

    let finalAllocationData = {
      userChecklist: AllocationData,
      userAllocation: AllocationData
    }

    console.log(finalAllocationData)
    // return
    this.isbtnLoading = true


    if (this.allocationId != -1) {
      //   let finalAllocationDataUpdate = {
      //     userChecklists: AllocationData,
      //     userAllocation: AllocationData
      // }
      // console.log(finalAllocationDataUpdate)
      this.userService.updateUserAllocation(finalAllocationData)
        .subscribe(data => {
          console.log('updated allocation-->', data)
          this.isbtnLoading = false
        })
    } else {

      this.userService.updateUserAllocation(finalAllocationData)
        .subscribe(data => {
          console.log('allocated -->', data)
          this.isbtnLoading = false

        })
    }
  }

  // getProjects() {
  //   console.log(this.SelClientId)
  //   this.commanService.getClientProject(this.SelClientId)
  //     .subscribe(
  //       (data) => {
  //         console.log('Project Data==', data)
  //         this.projects = data;

  //       }, (err) => {
  //         console.log('-----> err', err);
  //       })
  // }

  getStructure() {
    console.log(this.SelProject)
    this.commanService.getStructureByProjectId(this.SelProject)
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

  getStages() {
    console.log(this.userAllocationForm.value.tradeId)
    this.commanService.getStagesByStructureId(this.SelStructure)
      .subscribe(
        (data) => {
          console.log('stage Data==', data)
          this.stages = data;

        }, (err) => {
          console.log('-----> err', err);
        })
  }

  getChecklist() {
    console.log(this.SelTrade)
    this.commanService.getChecklistsByTrade(this.SelTrade)
      .subscribe(
        data => {
          console.log('checklist-->', data)
          this.checklists = data
        }
      )

    let stageMap = {}
    let checkListMap = {}
    let allocatedData
    this.commanService.getUserAllocationData(this.SelProject, this.SelStructure, this.SelTrade, this.SelUser)
      .subscribe(data => {
        allocatedData = data
        console.log('allocation data-->', data)
        allocatedData.forEach(item => {
          stageMap[item.stageId] = true
          checkListMap[item.fkChecklistId] = true
        })

        let allocatedCheckList: Array<number> = []
        let allocatedStages: Array<Number> = []

        for (const key in checkListMap) {
          allocatedCheckList.push(Number(key))
        }
        for (const key in stageMap) {
          allocatedStages.push(Number(key))
        }

        console.log(allocatedCheckList, allocatedStages)

        this.userAllocationForm.patchValue({ stageId: allocatedStages })
        this.userAllocationForm.patchValue({ checklistId: allocatedCheckList })

      })
  }

}
