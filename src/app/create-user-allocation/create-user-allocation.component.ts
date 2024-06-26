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
import { InspectorTraning } from "../service/inspectionTraining.service";
import { SnackBarComponent } from "../loader/snack-bar/snack-bar.component";

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

export class ApprovedTrade {
  constructor(
    public id: number,
    public passorfail: number,
    public projectId: number,
    public status: number,
    public tradeId: number,
    public tradeName: String,
    public userId: number,
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
  SelUser: String = "0";
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
  approvedTrades: Array<ApprovedTrade>
  users: UserView[]
  projects: any[];
  checklists: any

  allocationId: number

  stageLoad: boolean = false
  unitLoad: boolean = false
  subunitLoad: boolean = false



  isbtnLoading = false
  // allocatedCheckList: Array<number> = []
  // allocatedStages: Array<number> = []
  userList: Array<any>
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commanService: CommonService,
    private tradeMaintance: TradeMaintanceService,
    private userService: UserService,
    private inspectorTraining: InspectorTraning,
    private snackBar: SnackBarComponent
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
        console.log('users', data)
      })


    this.inspectorTraining.getTrainingApprovedUser()
      .subscribe(data => {
        console.log(data)
        this.userList = data
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

    // let data = {
    //   userId: this.userAllocationForm.value.userId,
    //   projectId: this.userAllocationForm.value.projectId,
    //   structureId: this.userAllocationForm.value.structureId,
    //   tradeId: this.userAllocationForm.value.tradeId,
    //   stageId: stageId,
    //   checklistId: id
    // }
    let allocationData = []
    for (const key in this.selectedData) {
      let data = {}
      if (Object.keys(this.selectedData[key]).length) {
        for (const unitId in this.selectedData[key]) {
          let data = {}

          if (this.selectedData[key][unitId].length) {

            this.selectedData[key][unitId].forEach(subunit => {
              let data = {}

              data['stageId'] = key
              data['unitId'] = unitId
              data['subunitId'] = subunit
              allocationData.push(data)

            })

          } else {
            data['stageId'] = key
            data['unitId'] = unitId
            allocationData.push(data)

          }

        }

      } else {
        data['stageId'] = key
        allocationData.push(data)
      }

    }



    let formData = []
    allocationData.forEach(aData => {
      this.checkListData.forEach(checklist => {
        let data = {
          ...aData,
          checklistId: checklist,
          userId: this.userAllocationForm.value.userId,
          projectId: this.userAllocationForm.value.projectId,
          structureId: this.userAllocationForm.value.structureId,
          tradeId: this.userAllocationForm.value.tradeId,
        }

        formData.push(data)
      })
    })

    console.log(formData)

    // return
    let finalAllocationData = {
      userChecklist: formData,
      userAllocation: formData
    }
    // return
    this.isbtnLoading = true


    if (this.allocationId != -1) {

      this.userService.updateUserAllocation(finalAllocationData)
        .subscribe(data => {
          console.log('updated allocation-->', data)
          this.isbtnLoading = false
          this.snackBar.showSuccess('Allocation updated')
        }, err => {
          this.isbtnLoading = false
          this.snackBar.showSnackError()
        })
    } else {

      this.userService.updateUserAllocation(finalAllocationData)
        .subscribe(data => {
          console.log('allocated -->', data)
          this.isbtnLoading = false
          this.snackBar.showSuccess('Allocation created')
        }, err => {
          this.isbtnLoading = false
          this.snackBar.showSnackError()
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

    this.inspectorTraining.getApprovedTradeByuserandProject(this.SelProject, this.SelUser)
      .subscribe(data => {
        console.log(data)
        this.approvedTrades = data
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
          this.stages = []
        })
  }

  checkListMap = {}
  tradeCheckListArray = [] //--> to avoid getting previous trade checklist  

  showStatus: boolean = false
  isFound: boolean = false
  getChecklist() {
    this.checkListMap = {}
    this.checkListData = []
    this.selectedData = {}
    this.tradeCheckListArray = []
    console.log(this.SelTrade)
    this.commanService.getChecklistsByTrade(this.SelTrade)
      .subscribe(
        data => {
          console.log('checklist-->', data)
          this.checklists = data
          this.checklists.forEach(checklist => {
            this.tradeCheckListArray.push(checklist.checkistIdChecklist)
          })
        }
      )

    let stageMap = {}
    let allocatedData
    this.commanService.getUserAllocationData(this.SelProject, this.SelStructure, this.SelTrade, this.SelUser)
      .subscribe(data => {
        allocatedData = data
        console.log('allocation data-->', data)
        this.showStatus = true
        this.isFound = true
        data.forEach(item => {
          if (this.selectedData[item.stageId]) {
            if (this.selectedData[item.stageId]) {
              if (this.selectedData[item.stageId][item.unitId]) {
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)
              } else {
                if (item.unitId) this.selectedData[item.stageId][item.unitId] = []
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)

              }
            } else {
              this.selectedData[item.stageId] = {}
              if (this.selectedData[item.stageId][item.unitId]) {
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)
              } else {
                if (item.unitId) this.selectedData[item.stageId][item.unitId] = []
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)

              }

            }
          } else {
            this.selectedData[item.stageId] = {}
            if (this.selectedData[item.stageId]) {
              if (this.selectedData[item.stageId][item.unitId]) {
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)
              } else {
                if (item.unitId) this.selectedData[item.stageId][item.unitId] = []
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)

              }
            } else {
              this.selectedData[item.stageId] = {}
              if (this.selectedData[item.stageId][item.unitId]) {
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)
              } else {
                if (item.unitId) this.selectedData[item.stageId][item.unitId] = []
                if (item.subunitId && !this.selectedData[item.stageId][item.unitId].includes(item.subunitId)) this.selectedData[item.stageId][item.unitId].push(item.subunitId)

              }

            }
          }

          if (this.tradeCheckListArray.includes(Number(item.checklistId))) {
            this.checkListMap[item.checklistId] = true
          }

        })
        console.log(this.selectedData)
        console.log(this.checkListMap)

        //ADD PRE CHECKLIST TO CHECKLIST DATA
        for (const key in this.checkListMap) {
          this.checkListData.push(key)
        }

        setTimeout(() => {
          this.showStatus = false
        }, 2000)
      }, err => {
        this.showStatus = true
        this.isFound = false

        setTimeout(() => {
          this.showStatus = false

        }, 2000)
      })
  }


  getProjectByuser(e) {
    console.log(e)
    console.log(this.SelUser)
    this.commanService.getProjectByUserId(e.target.value)
      .subscribe(data => {
        this.projects = data
      })
  }

  currentStage: String
  unitData = {}
  units: Array<Object> = []
  showunits(stageId) {
    this.currentStage = stageId
    // this.unitLoad = true
    // this.activeStage = stageId
    if (!this.unitData[String(stageId)] || this.unitData[String(stageId)].length == 0) {
      this.commanService.getUnitByIds(this.SelProject, this.SelStructure, stageId)
        .subscribe(data => {
          console.log(data)
          // this.stages = data
          this.unitData[String(stageId)] = data
          this.units = data
        }, err => this.units = [])

    } else {
      this.units = this.unitData[String(stageId)]
      // this.unitLoad = false
    }
  }

  subunitData = {}
  currentUnit: String
  subunits = []
  showSubunits(unitId) {
    this.currentUnit = unitId
    if (!this.subunitData[String(unitId)] || this.subunitData[String(unitId)].length == 0) {
      this.commanService.getSubUnitByIds(this.SelProject, this.SelStructure, this.currentStage, unitId)
        .subscribe(data => {
          console.log(data)
          // this.stages = data
          this.subunitData[String(unitId)] = data
          this.subunits = data
        }, err => this.subunits = [])

    } else {
      this.subunits = this.subunitData[String(unitId)]
      // this.unitLoad = false
    }

  }


  selectedData = {}
  // addStages(e) {
  //   // this.selectedData = [String(e.target.value)]
  //   if (e.target.checked) {
  //     this.selectedData[String(String(e.target.value))] = {}
  //   } else {
  //     delete this.selectedData[String(e.target.value)]
  //   }

  //   console.log(this.selectedData)
  // }



  addStages(e) {
    const stageId = String(e.target.value);
    if (e.target.checked) {
      this.selectedData[stageId] = {};
      this.showunits(stageId);
    } else {
      delete this.selectedData[stageId];
    }
    console.log(this.selectedData);
  }

  addAllStage(e) {
    if (e.target.checked) {
      this.stages.forEach(stage => {
        if (!this.selectedData[Number(stage)]) {
          this.selectedData[Number(stage)] = {}
        }
      })
    } else {
      this.stages.forEach(stage => {
        delete this.selectedData[Number(stage)]
      })
    }
    console.log(this.selectedData)
  }

  addUnitToStage(e) {
    const currentStage = String(e.target.value)
    if (e.target.checked) {
      this.selectedData[String(this.currentStage)][e.target.value] = []
      this.showSubunits(currentStage)
    } else {
      delete this.selectedData[String(this.currentStage)][e.target.value]
    }
    console.log(this.selectedData)
  }


  addSubunit(e) {
    if (e.target.checked) {
      this.selectedData[String(this.currentStage)][String(this.currentUnit)].push(Number(e.target.value))
    } else {
      this.selectedData[String(this.currentStage)][String(this.currentUnit)] = this.selectedData[String(this.currentStage)][String(this.currentUnit)].filter(id => {
        return id != e.target.value
      })
    }

    console.log(this.selectedData)

  }


  checkListData = []
  addChecklist(e) {
    if (e.target.checked) {
      this.checkListData.push(Number(e.target.value))
    } else {
      this.checkListData = this.checkListData.filter(id => {
        return id != e.target.value
      })
    }
  }

}