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
      contractorId: ['', Validators.required],
      supervisorId: ['', Validators.required],
      foremanId: ['', Validators.required],
      tradeId: ['', Validators.required],
      stageId: ['', Validators.required],
      clientStaffId: ['', Validators.required]
    })
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

    this.clientService.getContractorByProjectId(this.SelProject)
      .subscribe(data => this.contractors = data)

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
    console.log(this.registerForm.value)

    let tradeElements = document.querySelectorAll('.tradeGroups')
    let stageElements = document.querySelectorAll('.stagesCheckbox')
    let unitElement = document.querySelectorAll('.unitsCheckbox')
    let subunitElement = document.querySelectorAll('.subunitCheckBox')
    let TradeIdArray = []
    let stageIdArray = []
    let unitIdArray = []
    let subunitIdArray = []
    console.log(unitElement)
    console.log(subunitElement)
    tradeElements.forEach((item) => {
      if ((<HTMLInputElement>item).checked) {
        TradeIdArray.push(Number((<HTMLInputElement>item).value))
      }
    })

    stageElements.forEach((item) => {
      if ((<HTMLInputElement>item).checked) {
        stageIdArray.push(Number((<HTMLInputElement>item).value))
      }
    })

    unitElement.forEach((item) => {
      if ((<HTMLInputElement>item).checked) {
        unitIdArray.push(Number((<HTMLInputElement>item).value))
      }
    })

    subunitElement.forEach((item) => {
      if ((<HTMLInputElement>item).checked) {
        subunitIdArray.push(Number((<HTMLInputElement>item).value))
      }
    })


    let tradeIds = TradeIdArray
    let stageId = stageIdArray
    let supervisorData = []
    let foremanData = []
    tradeIds.forEach((tradeId) => {
      stageId.forEach((stageId) => {
        this.allocationData[stageId].forEach(unitId => {
          this.unitAllocationData[unitId].forEach(subunitId => {
            let data = {
              schemeId: this.registerForm.value.schemeId,
              structureId: this.registerForm.value.structureId,
              contractorId: this.registerForm.value.contractorId,
              supervisorId: this.registerForm.value.supervisorId,
              clientStaffId: this.registerForm.value.clientStaffId,
              tradeId,
              stageId,
              units: unitId,
              suunits: subunitId

            }

            let fdata = {
              schemeId: this.registerForm.value.schemeId,
              structureId: this.registerForm.value.structureId,
              contractorId: this.registerForm.value.contractorId,
              foremanId: this.registerForm.value.foremanId,
              clientStaffId: this.registerForm.value.clientStaffId,
              tradeId,
              stageId,
              units: unitId,
              suunits: subunitId
            }

            supervisorData.push(data)
            foremanData.push(fdata)
          })

        })

      })
    })

    let subunitUnitArray = []
    unitIdArray.forEach(unitId => {
      subunitIdArray.forEach(subunitId => {
        let data = {
          subunit: subunitId,
          unit: unitId
        }

        subunitUnitArray.push(data)
      })
    })

    console.log(supervisorData)
    console.log(foremanData)

    // return
    this.isbtnLoading = true
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
      this.clientService.assignContractorForeman(foremanData)
        .subscribe(data => {
          console.log('assisned foreman-->', data)
          this.isbtnLoading = false

        },
          err => console.log(err))
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
  getunit(e) {
    this.disabledUnits = false
    this.currentStage = Number(e.target.value)
    if (e.target.checked) {

      this.selectedStates.push(this.currentStage)
      // this.unSelectRemaningStage(e)
    } else {
      this.disabledUnits = true

      // if(this.allocationData[String(this.currentStage)].length == 0){
      //   delete this.allocationData[String(this.currentStage)]
      // }
      this.selectedStates = this.selectedStates.filter(stage => {
        return stage != this.currentStage
      })
    }

    console.log(this.allocationData)
    console.log(this.unitData)

  }

  activeStage = 0
  showUnits(stageId) {
    this.currentStage = Number(stageId)
    this.unitLoad = true
    this.activeStage = stageId

    if (!this.unitData[String(stageId)] || this.unitData[String(stageId)].length == 0) {

      this.allocationData[String(stageId)] = []
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
  subunits: Array<Object> = []
  subunitLoad: boolean = false
  curentUnit: String
  disableSubunit = true
  getSubunit(e) {
    this.curentUnit = e.target.value
    this.disableSubunit = false

    if (e.target.checked) {
      if (!this.allocationData[String(this.currentStage)]) {
        this.allocationData[String(this.currentStage)] = []
      }
      // this.allocationData[String(this.currentStage)] = [...this.allocationData[String(this.currentStage)]]
      this.allocationData[String(this.currentStage)].push(Number(e.target.value))
    } else {
      this.disableSubunit = true
      this.allocationData[String(this.currentStage)] = this.allocationData[String(this.currentStage)].filter(id => {
        return id != Number(e.target.value)
      })
      delete this.unitAllocationData[String(this.curentUnit)]
    }

    console.log(this.allocationData)
    console.log(this.unitAllocationData)
  }

  showSubunits(unitId) {
    this.curentUnit = unitId

    this.subunitLoad = true
    if (!this.subUnitData[String(unitId)]) {
      this.unitAllocationData[String(unitId)] = []
      this.commonServices.getSubUnit(this.SelClient, this.SelProject, this.SelStructure, this.currentStage, unitId)
        .subscribe(data => {
          console.log(data)
          // this.stages = data
          // this.subunits = data
          this.subUnitData[String(unitId)] = data
          this.subunits = data
          this.subunitLoad = false
          this.subunits.forEach((item: any) => {
            this.unitAllocationData[String(unitId)].push(Number(item.subunitId))
          })
          console.log(this.unitAllocationData)

        })
    } else {
      this.subunits = this.subUnitData[String(unitId)]
      this.subunitLoad = false
    }
  }

  addSubunit(e) {
    if (e.target.checked) {
      if (!this.unitAllocationData[String(this.curentUnit)]) {
        this.unitAllocationData[String(this.curentUnit)] = []
      }
      this.unitAllocationData[String(this.curentUnit)].push(Number(e.target.value))
    } else {
      this.unitAllocationData[String(this.curentUnit)] = this.unitAllocationData[String(this.curentUnit)].filter(id => {
        return id != Number(e.target.value)
      })
    }
    console.log(this.unitAllocationData)
  }


  // supervisorAllocation = []
  isSupervisroAllocationPresent: boolean = false
  getSuprevisorData(e) {
    let supervisorId = Number(e.target.value)
    this.clientService.getAssignDataFromSupervisor(this.SelProject, this.SelStructure, this.SelContractor, supervisorId)
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

  allocatedTrade = {}
  allocatedStructure: Object = {}
  genarateAllocationData(data) {

    data.forEach(item => {
      this.allocatedTrade[item.tradeId] = true
      if (this.allocatedStructure.hasOwnProperty(item.stageId)) {
        if (this.allocatedStructure[item.stageId].hasOwnProperty(item.units)) {
          if (!this.allocatedStructure[item.stageId][item.units].includes(item.suunits)) {

            this.allocatedStructure[item.stageId][item.units].push(item.suunits)
          }
        } else {
          this.allocatedStructure[item.stageId][item.units] = []
          this.allocatedStructure[item.stageId][item.units].push(item.suunits)
        }

      } else {
        this.allocatedStructure[item.stageId] = {}
        if (this.allocatedStructure[item.stageId].hasOwnProperty(item.units)) {
          if (!this.allocatedStructure[item.stageId][item.units].includes(item.suunits)) {
            this.allocatedStructure[item.stageId][item.units].push(item.suunits)
          }
        } else {
          this.allocatedStructure[item.stageId][item.units] = []
          this.allocatedStructure[item.stageId][item.units].push(item.suunits)
        }
      }



      if (this.allocationData[item.stageId]) {
        if (!this.allocationData[item.stageId].includes(item.units)) {
          this.allocationData[item.stageId].push(item.units)
        }
      } else {
        this.allocationData[item.stageId] = []
        this.allocationData[item.stageId].push(item.units)
      }

      if (this.unitAllocationData[item.units]) {
        if (!this.unitAllocationData[item.units].includes(item.suunits)) {
          this.unitAllocationData[item.units].push(item.suunits)
        }
      } else {
        this.unitAllocationData[item.units] = []
        this.unitAllocationData[item.units].push(item.suunits)
      }

    })

    console.log(this.allocatedStructure)
    console.log('allocated stage', this.allocationData)
    console.log('allocated unit', this.unitAllocationData)
    console.log('trdeas allocated', this.allocatedTrade)
    this.selectedStates = Object.keys(this.allocationData)
    this.disableSubunit = false
    this.disabledUnits = false

  }

}




