import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { ClientData } from '../client/client.component';
import { StageData, StructureData } from '../wbs/wbs.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';
import { ContractorData } from '../contractor-forman/contractor-forman.component';
import { SupervisorData } from '../contractor-supervisor/contractor-supervisor.component';
import { FormanData } from '../contractor-forman/contractor-forman.component';
import { clientStaffData } from '../create-client-staff/create-client-staff.component';
import { currentId } from 'async_hooks';
import { PmcView } from '../pmc-list/pmc-list.component';


export class AssignSupervisor {
  constructor(
    public schemeId: Number,
    public structureId: Number,
    public contractorId: Number,
    public supervisorId: Number,
    public tradeId: number,
    public stageId: number,
  ) { }
}

@Component({
  selector: 'app-assign-constructor-supervisor',
  templateUrl: './assign-constructor-supervisor.component.html',
  styleUrls: ['./assign-constructor-supervisor.component.css']
})
export class AssignConstructorSupervisorComponent implements OnInit {

  registerForm: FormGroup;
  SelProject: any;
  SelStructure: any;
  SelClient: any;
  SelContractor: any
  selSupervisor: String
  selForeman: String
  Selpmc: String
  selPmcuser: String
  SelclientStaff: String
  projects: ProjectData[];
  submitted: boolean
  structures: StructureData[]
  stages: StageData[]
  clients: ClientData[]
  trades: Trade
  clientStaffs: clientStaffData
  contractors: ContractorData
  supervisors: SupervisorData
  formans: FormanData
  isbtnLoading = false
  pmc: Array<PmcView>
  pmcUser: Array<Object>

  constructor(
    private commonServices: CommonService,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {

    this.submitted = true;
    this.clientService.getAllClients()
      .subscribe(data => this.clients = data)

    // this.commonServices.getAllContractors()
    //   .subscribe(data => {
    //     console.log('contractor', data)
    //     this.contractors = data
    //   })

    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      schemeId: ['', Validators.required],
      structureId: ['', Validators.required],
      contractorId: ['', Validators.nullValidator],
      supervisorId: ['', Validators.nullValidator],
      foremanId: ['', Validators.nullValidator],
      tradeId: ['', Validators.required],
      stageId: ['', Validators.required],
      clientStaffId: ['', Validators.nullValidator],
      pmcId: ['', Validators.nullValidator],
      userId: ['', Validators.nullValidator]
    })
  }


  allocationType: Number = 1
  toggleAllocationType(e) {
    this.allocationType = Number(e.target.value)
    console.log(this.allocationType)


  }
  getProjects() {
    console.log(this.SelClient)
    this.commonServices.getClientProject(this.SelClient).subscribe(data => this.projects = data)
  }
  getStructure() {
    this.commonServices.getStructures(this.SelClient, this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.structures = data
      })

    this.tradeService.getProjectTradesScheme(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

    this.clientService.getClientStaffByProjectId(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.clientStaffs = data
      })

    if (this.allocationType == 2) {
      this.clientService.getPmcByprojectId(this.SelProject)
        .subscribe(data => this.pmc = data)
    } else {
      this.clientService.getContractorByProjectId(this.SelProject)
        .subscribe(data => this.contractors = data)
    }
  }


  getPmcUser() {
    this.clientService.getPmcUser(4, this.Selpmc)
      .subscribe(data => {
        console.log(data)
        this.pmcUser = data
      }, err => this.pmcUser = [])
  }

  stageLoad: boolean = false
  getStages() {
    this.stageLoad = true
    this.commonServices.getStages(this.SelClient, this.SelProject, this.SelStructure)
      .subscribe(data => {
        console.log(data)
        this.stages = data
        this.stageLoad = false
      })

  }


  getSupervisores() {
    this.clientService.getSupervisorByContractorId(this.SelContractor)
      .subscribe(data => {
        console.log(data)
        this.supervisors = data
      })
    this.clientService.getForemanByContractorId(this.SelContractor)
      .subscribe(data => {
        console.log(data)
        this.formans = data
      })
  }

  selectAllTradeCheckbox(e) {
    console.log(e)
    if (e.target.checked) {
      $('.tradeGroups').prop('checked', true);
    } else {
      $('.tradeGroups').prop('checked', false);

    }
  }

  selectAllStageCheckbox(e) {
    console.log(e)
    if (e.target.checked) {
      $('.stagesCheckbox').prop('checked', true);

    } else {
      $('.stagesCheckbox').prop('checked', false);

    }
  }
  selectAllUnitCheckbox(e) {
    console.log(e)
    if (e.target.checked) {
      $('.unitsCheckbox').prop('checked', true);
      let unitsElement = document.querySelectorAll('.unitsCheckbox')
      let unitsId = []
      unitsElement.forEach(item => {
        let id = Number((<HTMLInputElement>item).value)
        unitsId.push(id)
      })

      this.allocationData[Number(this.currentStage)] = unitsId
      console.log(this.allocationData)
    } else {
      $('.unitsCheckbox').prop('checked', false);
      this.allocationData[Number(this.currentStage)] = []
    }
  }

  selectAllSubUnitCheckbox(e) {
    console.log(e)
    if (e.target.checked) {
      $('.subUnitsCheckbox').prop('checked', true);
      let subunitElement = document.querySelectorAll('.subUnitsCheckbox')
      let subunitsId = []
      subunitElement.forEach(item => {
        let id = Number((<HTMLInputElement>item).value)
        subunitsId.push(id)
      })
      this.unitAllocationData[Number(this.curentUnit)] = subunitsId
      console.log(this.unitAllocationData)
    } else {
      $('.subUnitsCheckbox').prop('checked', false);
      this.unitAllocationData[Number(this.curentUnit)] = []
    }
  }

  onSubmit() {
    this.isbtnLoading = true
    console.log(this.registerForm.value)
    let allocationData = []
    for (const key in this.selectedTrade) {
      for (const stageId in this.selectedTrade[key]) {
        let data = {}
        if (Object.keys(this.selectedTrade[key][stageId]).length) {
          for (const unitId in this.selectedTrade[key][stageId]) {
            let data = {}

            if (this.selectedTrade[key][stageId][unitId].length) {

              this.selectedTrade[key][stageId][unitId].forEach(subunit => {
                let data = {}

                data['tradeId'] = key
                data['stageId'] = stageId
                data['units'] = unitId
                data['suunits'] = subunit
                allocationData.push(data)

              })

            } else {
              data['tradeId'] = key
              data['stageId'] = stageId
              data['units'] = unitId
              allocationData.push(data)

            }

          }

        } else {
          data['tradeId'] = key
          data['stageId'] = stageId
          allocationData.push(data)
        }

      }

    }
    console.log(allocationData)

    if (this.allocationType == 1) {
      let foremanData = []
      let supervisorData = []
      allocationData.forEach(data => {
        if (this.registerForm.value.supervisorId) {
          supervisorData.push({
            schemeId: this.registerForm.value.schemeId,
            structureId: this.registerForm.value.structureId,
            contractorId: this.registerForm.value.contractorId,
            supervisorId: this.registerForm.value.supervisorId,
            clientStaffId: this.registerForm.value.clientStaffId,
            ...data
          })
        }

        if (this.registerForm.value.foremanId) {
          foremanData.push({
            schemeId: this.registerForm.value.schemeId,
            structureId: this.registerForm.value.structureId,
            contractorId: this.registerForm.value.contractorId,
            foremanId: this.registerForm.value.foremanId,
            clientStaffId: this.registerForm.value.clientStaffId,
            ...data
          })
        }
      })
      // return
      console.log(supervisorData)
      console.log(foremanData)
      if (this.registerForm.value.supervisorId) {
        if (this.isSupervisroAllocationPresent) {
          this.clientService.updateAssignSupervisor(this.SelProject, this.SelStructure, this.SelContractor, this.registerForm.value.supervisorId, supervisorData)
            .subscribe(data => {
              console.log('updated-->', data)
              this.isbtnLoading = false

            },
              err => console.log(err))
        } else {

          this.clientService.assignContractorSupervisor(supervisorData)
            .subscribe(data => {
              console.log('assigned-->', data)
              this.isbtnLoading = false

            },
              err => console.log(err))
        }
      }

      if (this.registerForm.value.foremanId) {

        if(this.isForemanAllocationUpdate){
          this.clientService.updateAssignForeman(this.SelProject, this.SelStructure, this.SelContractor, this.registerForm.value.foremanId, foremanData)
          .subscribe(data =>{
            console.log('updted assign foreman-->', data)
            this.isbtnLoading = false
          })

        }else{

          this.clientService.assignContractorForeman(foremanData)
            .subscribe(data => {
              console.log('assisned foreman-->', data)
              this.isbtnLoading = false
            },
              err => console.log(err))
        }
      }

    } else if (this.allocationType == 2) {
      let pmcAllocation = []
      allocationData.forEach(data => {

        pmcAllocation.push({
          schemeId: this.registerForm.value.schemeId,
          structureId: this.registerForm.value.structureId,
          pmcId: this.registerForm.value.pmcId,
          clientStaffId: this.registerForm.value.clientStaffId,
          stageId: data.stageId,
          tradeId: data.tradeId,
          subunits: data.suunits,
          units: data.units,
          userId: this.registerForm.value.userId,
        })

      })

      if (this.updatePmcAllocation) {
        this.clientService.updatePmcAllocation(this.SelProject, this.Selpmc, this.SelclientStaff, this.selPmcuser, this.SelStructure, pmcAllocation)
          .subscribe(data => {
            console.log('pmc allocation updated', data)
            this.isbtnLoading = false

          })
      } else {
        this.clientService.addPmcAllocation(pmcAllocation)
          .subscribe(data => {
            console.log('pmc allocated', data)
            this.isbtnLoading = false

          })
      }
      console.log(pmcAllocation)
    }

  }


  unitData = {}
  subUnitData = {}
  allocationData = {}
  unitAllocationData = {}
  units: Array<Object> = []
  currentStage: Number
  unitLoad: boolean = false
  selectedStates = []
  disabledUnits: boolean = true
  activeStage = 0
  showUnits(stageId) {
    this.currentStage = Number(stageId)
    this.unitLoad = true
    this.activeStage = stageId
    if (!this.unitData[String(stageId)] || this.unitData[String(stageId)].length == 0) {
      this.commonServices.getUnits(this.SelClient, this.SelProject, this.SelStructure, stageId)
        .subscribe(data => {
          console.log(data)
          // this.stages = data
          this.unitData[String(stageId)] = data
          this.units = data
          this.unitLoad = false
        })

    } else {
      this.units = this.unitData[String(stageId)]
      this.unitLoad = false
    }
  }

  unSelectRemaningStage(e) {
    // let stageElements = document.querySelectorAll('.stagesCheckbox')
    // stageElements.forEach(item =>{
    //   if ((<HTMLInputElement>item).value != e.target.value) {
    //     (<HTMLInputElement>item).checked = false
    //   }
    // })
  }
  subunits: Array<any> = []
  subunitLoad: boolean = false
  curentUnit: String
  showSubunits(unitId) {
    this.curentUnit = unitId
    this.subunitLoad = true
    if (!this.subUnitData[String(unitId)]) {
      this.commonServices.getSubUnit(this.SelClient, this.SelProject, this.SelStructure, this.currentStage, unitId)
        .subscribe(data => {
          console.log(data)
          this.subUnitData[String(unitId)] = data
          this.subunits = data
          this.subunitLoad = false

          // this.subunits.forEach(sub => {
          //   this.selectedTrade[Number(this.currentTradeId)][Number(this.currentStage)][Number(this.curentUnit)].push(Number(sub.subunitId))
          // })

          console.log(this.selectedTrade)

        })
    } else {
      this.subunits = this.subUnitData[String(unitId)]
      this.subunitLoad = false
    }
  }

  addSubunit(e) {
    if (e.target.checked) {
      this.selectedTrade[Number(this.currentTradeId)][Number(this.currentStage)][Number(this.curentUnit)].push(Number(e.target.value))
    } else {
      this.selectedTrade[Number(this.currentTradeId)][Number(this.currentStage)][Number(this.curentUnit)] = this.selectedTrade[Number(this.currentTradeId)][Number(this.currentStage)][Number(this.curentUnit)].filter(id => {
        return id != Number(e.target.value)
      })
    }
    console.log(this.selectedTrade)
  }


  getPreAllocation() {

    if (this.allocationType == 1) {
      if(this.selForeman){
        console.log('foreman get')
        this.getForemanData(this.SelStructure)

      }
      if(this.selSupervisor){
        console.log('suoervisor get')
        this.getSuprevisorData(this.SelStructure)
      }
    } else {
      console.log('pmc get')

      this.getPmcAllocationData()
    }
  }

  // supervisorAllocation = []
  isSupervisroAllocationPresent: boolean = false
  getSuprevisorData(structureId) {
    let structure = Number(structureId)
    this.clientService.getAssignDataFromSupervisor(this.SelProject, structure, this.SelContractor, this.selSupervisor)
      .subscribe(data => {
        console.log(data)
        // this.supervisorAllocation = data
        if (data.length) {
          this.isSupervisroAllocationPresent = true
        }
        // this.selectedStates = this.supervisorAllocation['stages']
        this.genarateAllocationData(data)
      })
  }

  isForemanAllocationUpdate : boolean = false
  getForemanData(structureId) {
    let structure = Number(structureId)
    this.clientService.getAssignDataFromForeman(this.SelProject, structure, this.SelContractor, this.selForeman)
      .subscribe(data => {
        console.log(data)
        // this.supervisorAllocation = data
        if (data.length) {
          this.isForemanAllocationUpdate = true
        }
        // this.selectedStates = this.supervisorAllocation['stages']
        this.genarateAllocationData(data)
      })
  }


  updatePmcAllocation: boolean = false
  getPmcAllocationData() {
    this.clientService.getPmcAllocationData(this.SelProject, this.Selpmc, this.SelclientStaff, this.selPmcuser, this.SelStructure)
      .subscribe(data => {
        console.log('pre pmc data-->', data)
        if (data.length) {
          this.updatePmcAllocation = true
        }
        this.genarateAllocationData(data)
      })
  }

  allocatedTrade = {}
  allocatedStructure: Object = {}
  genarateAllocationData(data) {
    data.forEach(item => {
      if (this.selectedTrade[item.tradeId]) {
        if (this.selectedTrade[item.tradeId][item.stageId]) {
          if (this.selectedTrade[item.tradeId][item.stageId][item.units]) {
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)
          } else {
            this.selectedTrade[item.tradeId][item.stageId][item.units] = []
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)

          }
        } else {
          this.selectedTrade[item.tradeId][item.stageId] = {}
          if (this.selectedTrade[item.tradeId][item.stageId][item.units]) {
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)
          } else {
            this.selectedTrade[item.tradeId][item.stageId][item.units] = []
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)

          }

        }
      } else {
        this.selectedTrade[item.tradeId] = {}
        if (this.selectedTrade[item.tradeId][item.stageId]) {
          if (this.selectedTrade[item.tradeId][item.stageId][item.units]) {
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)
          } else {
            this.selectedTrade[item.tradeId][item.stageId][item.units] = []
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)

          }
        } else {
          this.selectedTrade[item.tradeId][item.stageId] = {}
          if (this.selectedTrade[item.tradeId][item.stageId][item.units]) {
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)
          } else {
            this.selectedTrade[item.tradeId][item.stageId][item.units] = []
            this.selectedTrade[item.tradeId][item.stageId][item.units].push(item.suunits)

          }

        }
      }

    })

    console.log('pre aalocation', this.selectedTrade)
  }



  selectedTrade = {}
  selectedStages = {}
  addTrade(e) {
    if (e.target.checked) {
      this.selectedTrade[String(e.target.value)] = {}
    } else {
      delete this.selectedTrade[String(e.target.value)]
    }
    console.log(this.selectedTrade)
  }

  currentTradeId: String
  changeStages(tradeId) {
    this.currentTradeId = tradeId

    //to reload stages
    let preStages = this.stages
    this.stages = []
    this.stages = preStages
    console.log('current trade', this.currentTradeId)
  }

  addStagesTotrade(e) {
    if (e.target.checked) {
      this.selectedTrade[Number(this.currentTradeId)][Number(e.target.value)] = {}
      // this.selectedStages[String(e.target.value)] = []
    } else {
      delete this.selectedTrade[Number(this.currentTradeId)][Number(e.target.value)]

    }

    console.log(this.selectedTrade)
  }

  addUnitToStage(e) {
    if (e.target.checked) {
      this.selectedTrade[Number(this.currentTradeId)][Number(this.currentStage)][Number(e.target.value)] = []
      // this.selectedStages[Number(this.currentStage)].push(Number(e.target.value))
    } else {
      delete this.selectedTrade[Number(this.currentTradeId)][Number(this.currentStage)][Number(e.target.value)]
      // this.selectedStages[Number(this.currentStage)] = this.selectedStages[Number(this.currentStage)].filter(id =>{
      //   return id != Number(e.target.value)
      // })
    }

    console.log(this.selectedTrade)
  }
}




