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
  selector: 'app-assign-contractor-pmc',
  templateUrl: './assign-contractor-pmc.component.html',
  styleUrls: ['./assign-contractor-pmc.component.css']
})
export class AssignContractorPmcComponent implements OnInit {

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

  SelTrade: any

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
      // clientStaffId: ['', Validators.nullValidator],
      pmcId: ['', Validators.nullValidator],
      userId: ['', Validators.nullValidator],
    })
  }


  allocationType: Number = 1
  toggleAllocationType(e) {
    this.allocationType = Number(e.target.value)
    console.log(this.allocationType)
    this.selectedTrade = {}
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
      this.unitAllocationData[Number(this.currentUnit)] = subunitsId
      console.log(this.unitAllocationData)
    } else {
      $('.subUnitsCheckbox').prop('checked', false);
      this.unitAllocationData[Number(this.currentUnit)] = []
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
  currentUnit: Number
  showSubunits(unitId) {
    this.subunitLoad = true
    this.currentUnit = Number(unitId)
    if (!this.subUnitData[String(unitId)]) {
      this.commonServices.getSubUnit(this.SelClient, this.SelProject, this.SelStructure, this.currentStage, unitId)
        .subscribe(data => {
          console.log(data)
          this.subUnitData[String(unitId)] = data
          this.subunits = data
          this.subunitLoad = false
          console.log(this.selectedTrade)

        })
    } else {
      this.subunits = this.subUnitData[String(unitId)]
      this.subunitLoad = false
    }
  }

  addSubunit(e) {
    if (e.target.checked) {
      this.selectedTrade[Number(this.currentStage)][Number(this.currentUnit)].push(Number(e.target.value))
    } else {
      this.selectedTrade[Number(this.currentStage)][Number(this.currentUnit)] = this.selectedTrade[Number(this.currentStage)][Number(this.currentUnit)].filter(id => {
        return id != Number(e.target.value)
      })
    }
    console.log(this.selectedTrade)
  }


  getPreAllocation() {

    if (this.allocationType == 1) {
      console.log('foreman get')
      this.getForemanData()

      console.log('suoervisor get')
      this.getSuprevisorData()
    } else if(this.allocationType == 2) {
      console.log('pmc get')
      this.getPmcAllocationData()
    }else if(this.allocationType == 3){
      console.log('client get')
      this.getClientAllocationData()
    }
  }

  // supervisorAllocation = []
  isSupervisroAllocationPresent: boolean = false
  getSuprevisorData() {
    this.clientService.getAssignDataFromSupervisorByTrade(this.SelProject, this.SelStructure, this.SelContractor, this.SelTrade)
      .subscribe(data => {
        console.log(data)
        // this.supervisorAllocation = data
        if (data.length) {
          this.isSupervisroAllocationPresent = true
          this.genarateAllocationData(data, 'supervisor')
        } else {
          this.supervisorData = []
          this.selectedTrade = {}

        }
        // this.selectedStates = this.supervisorAllocation['stages']
      })
  }

  isForemanAllocationUpdate: boolean = false
  getForemanData() {
    // let structure = Number(structureId)
    this.clientService.getAssignDataFromForemanByTrade(this.SelProject, this.SelStructure, this.SelContractor, this.SelTrade)
      .subscribe(data => {
        console.log(data)
        // this.supervisorAllocation = data
        if (data.length) {
          this.isForemanAllocationUpdate = true
          this.genarateAllocationData(data, 'forman')

        } else {
          this.formanData = []
          this.selectedTrade = {}

        }
        // this.selectedStates = this.supervisorAllocation['stages']
        // this.genarateAllocationData(data)
      })
  }


  updatePmcAllocation: boolean = false
  getPmcAllocationData() {
    this.clientService.getPmcAllocationData(this.SelProject, this.SelStructure, this.Selpmc, this.SelTrade)
      .subscribe(data => {
        console.log('pre pmc data-->', data)
        if (data.length) {
          this.updatePmcAllocation = true
        }else{
          this.pmcUserData = []
          this.selectedTrade = {}
        }
        this.genarateAllocationData(data, 'pmc')
      })
  }

  updateClientAllocation: boolean = false
  getClientAllocationData() {
    this.clientService.getClientAllocationData(this.SelProject, this.SelStructure, this.SelClient, this.SelTrade)
      .subscribe(data => {
        console.log('pre client data-->', data)
        if (data.length) {
          this.updateClientAllocation = true
        }else{
          this.clientUser = []
          this.selectedTrade = {}
        }
        this.genarateAllocationData(data, 'client')
      })
  }

  allocatedTrade = {}
  allocatedStructure: Object = {}
  genarateAllocationData(data, type) {
    this.selectedTrade = {}
    data.forEach(item => {
      if (this.selectedTrade[item.stageId]) {
        if (this.selectedTrade[item.stageId][item.units]) {
          item.suunits && this.selectedTrade[item.stageId][item.units].push(item.suunits)
        } else if (item.units) {
          this.selectedTrade[item.stageId][item.units] = []
          item.suunits && this.selectedTrade[item.stageId][item.units].push(item.suunits)
        }
      } else {
        this.selectedTrade[item.stageId] = {}
        if (item.units) {
          this.selectedTrade[item.stageId][item.units] = []
          item.suunits && this.selectedTrade[item.stageId][item.units].push(item.suunits)
        }
      }
    })


    if (type == 'supervisor') {
      data.forEach(item => {
        if (!this.supervisorData.includes(item.supervisorId)) {
          this.supervisorData.push(item.supervisorId)
        }
      })
    }

    if (type == 'forman') {
      data.forEach(item => {
        if (!this.formanData.includes(item.foremanId)) {
          this.formanData.push(item.foremanId)
        }

      })
    }

    if (type == 'pmc') {
      data.forEach(item => {
        if (!this.pmcUserData.includes(item.userId)) {
          this.pmcUserData.push(item.userId)
        }

      })
    }

    if (type == 'client') {
      data.forEach(item => {
        if (!this.clientUser.includes(item.clientStaffId)) {
          this.clientUser.push(item.clientStaffId)
        }

      })
    }
    console.log('pre aalocation', this.selectedTrade)
    console.log('pre sup', this.supervisorData)
    console.log('pre for', this.formanData)
  }



  selectedTrade = {}
  selectedStages = {}
  currentTradeId = 0

  showUnits(stageId) {
    this.currentStage = Number(stageId)
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

  addStagesTotrade(e) {
    this.currentStage = Number(e.target.value)
    if (e.target.checked) {
      this.showUnits(this.currentStage)
      this.selectedTrade[Number(this.currentStage)] = {}
    } else {
      delete this.selectedTrade[Number(this.currentStage)]
    }
    console.log(this.selectedTrade)
  }

  addUnitToStage(e) {
    this.currentUnit = Number(e.target.value)
    if (e.target.checked) {
      this.showSubunits(this.currentUnit)
      this.selectedTrade[Number(this.currentStage)][Number(this.currentUnit)] = []
    } else {
      delete this.selectedTrade[Number(this.currentStage)][Number(e.target.value)]
    }
    console.log(this.selectedTrade)
  }


  supervisorData = []
  addSupervisor(e) {
    let id = Number(e.target.value)
    if (e.target.checked) {

      this.supervisorData.push(id)
    } else {
      this.supervisorData = this.supervisorData.filter(item => {
        return item != id
      })
    }
    console.log(this.supervisorData)
  }

  formanData = []
  addForman(e) {
    let id = Number(e.target.value)
    if (e.target.checked) {
      this.formanData.push(id)
    } else {
      this.formanData = this.formanData.filter(item => {
        return item != id
      })
    }
    console.log(this.formanData)
  }

  pmcUserData = []
  addPMCUser(e) {
    let id = Number(e.target.value)
    if (e.target.checked) {
      this.pmcUserData.push(id)
    } else {
      this.pmcUserData = this.pmcUserData.filter(item => {
        return item != id
      })
    }
    console.log(this.pmcUserData)
  }

  clientUser = []
  addClientUser(e){
    let id = Number(e.target.value)
    if (e.target.checked) {
      this.clientUser.push(id)
    } else {
      this.clientUser = this.clientUser.filter(item => {
        return item != id
      })
    }
    console.log('client -->',this.clientUser)
  }

  onSubmit() {
    let allocationData = []
    for (const stageId in this.selectedTrade) {
      let data = {}
      if (Object.keys(this.selectedTrade[stageId]).length) {
        for (const unitId in this.selectedTrade[stageId]) {
          let data = {}

          if (this.selectedTrade[stageId][unitId].length) {

            this.selectedTrade[stageId][unitId].forEach(subunit => {
              let data = {}

              data['stageId'] = stageId
              data['units'] = unitId
              data['suunits'] = subunit
              allocationData.push(data)

            })

          } else {
            data['stageId'] = stageId
            data['units'] = unitId
            allocationData.push(data)

          }

        }

      } else {
        data['stageId'] = stageId
        allocationData.push(data)
      }

    }
    console.log(allocationData)
    if (this.allocationType == 1) {
      if (this.supervisorData.length) {
        let supervisorArray = []
        allocationData.forEach(data => {
          this.supervisorData.forEach(supId => {
            let supData = {
              ...data,
              schemeId: this.registerForm.value.schemeId,
              structureId: this.registerForm.value.structureId,
              contractorId: this.registerForm.value.contractorId,
              tradeId: this.registerForm.value.tradeId,
              supervisorId: supId,
            }

            supervisorArray.push(supData)
          })
        })

        console.log(supervisorArray)

        if (this.isSupervisroAllocationPresent) {
          this.clientService.updateAssignSupervisorByTrade(this.SelProject, this.SelStructure, this.SelContractor, this.SelTrade, supervisorArray)
            .subscribe(data => {
              console.log('supervisro updated-->', data)
              this.isbtnLoading = false
            }, err => {

            })
        } else {

          this.clientService.assignContractorSupervisor(supervisorArray)
            .subscribe(data => {
              console.log('super assigned-->', data)
              this.isbtnLoading = false
            },
              err => console.log(err))
        }

      }

      if (this.formanData.length) {
        let formanArray = []
        allocationData.forEach(data => {
          this.formanData.forEach(forId => {
            let supData = {
              ...data,
              schemeId: this.registerForm.value.schemeId,
              structureId: this.registerForm.value.structureId,
              contractorId: this.registerForm.value.contractorId,
              tradeId: this.registerForm.value.tradeId,
              foremanId: forId,
            }

            formanArray.push(supData)
          })
        })

        console.log(formanArray)

        if (this.isForemanAllocationUpdate) {
          this.clientService.updateAssignForemanByTrade(this.SelProject, this.SelStructure, this.SelContractor, this.SelTrade, formanArray)
            .subscribe(data => {
              console.log('foreman updated', data)
              this.isbtnLoading = false
            }, err => {
              console.log(err)
            })

        } else {
          this.clientService.assignContractorForeman(formanArray)
            .subscribe(data => {
              console.log('assisned foreman-->', data)
              this.isbtnLoading = false
            },
              err => console.log(err))
        }
      }
    } else if (this.allocationType == 2) {
      this.handlePmcAllocation(allocationData)
    }else if(this.allocationType == 3){
      this.handleClientAllocation(allocationData)
    }
  }


  handlePmcAllocation(data) {
    let pmcAllocation = []
    data.forEach(data => {
      this.pmcUserData.forEach(pmcuser => {
        let supData = {
          schemeId: this.registerForm.value.schemeId,
          structureId: this.registerForm.value.structureId,
          pmcId: this.registerForm.value.pmcId,
          // clientStaffId: this.registerForm.value.clientStaffId,
          stageId: data.stageId ? data.stageId : null,
          tradeId: this.registerForm.value.tradeId,
          subunits: data.suunits ? data.suunits : null,
          units: data.units ? data.units : null,
          userId: pmcuser,
        }

        pmcAllocation.push(supData)
      })
    })

    console.log('pmc allo data', pmcAllocation)
    if (this.updatePmcAllocation) {
      this.clientService.updatePmcAllocation(this.SelProject, this.SelStructure, this.Selpmc, this.SelTrade, pmcAllocation)
      .subscribe(data =>{
        console.log('pmc updtaed', data)
      }, err =>{
        console.log(err)
      })

    } else {
      this.clientService.addPmcAllocation(pmcAllocation)
        .subscribe(data => {
          console.log('pmc allocated-->', data)
        }, err => {
          console.log(err)
        })
    }


  }

  handleClientAllocation(data){
    let clientAllocation = []
    data.forEach(data => {
      this.clientUser.forEach(user => {
        let supData = {
          schemeId: this.registerForm.value.schemeId,
          structureId: this.registerForm.value.structureId,
          clientId: this.registerForm.value.clientId,
          stageId: data.stageId ? data.stageId : null,
          tradeId: this.registerForm.value.tradeId,
          subunits: data.suunits ? data.suunits : null,
          units: data.units  ? data.units : null,
          clientStaffId: user,
        }

        clientAllocation.push(supData)
      })
    })

    console.log('client Alloca', clientAllocation)

    if (this.updatePmcAllocation) {
      this.clientService.updateClientAllocation(this.SelProject, this.SelStructure, this.SelClient, this.SelTrade, clientAllocation)
      .subscribe(data =>{
        console.log('client updtaed', data)
      }, err =>{
        console.log(err)
      })

    } else {
      this.clientService.addClientAllocation(clientAllocation)
        .subscribe(data => {
          console.log('client allocated-->', data)
        }, err => {
          console.log(err)
        })
    }

  }
}




