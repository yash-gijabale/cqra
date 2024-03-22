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
    } else {
      $('.unitsCheckbox').prop('checked', false);

    }
  }

  selectAllSubUnitCheckbox(e) {
    console.log(e)
    if (e.target.checked) {
      $('.subUnitsCheckbox').prop('checked', true);
    } else {
      $('.subUnitsCheckbox').prop('checked', false);

    }
  }

  onSubmit() {
    console.log(this.registerForm.value)

    let tradeElements = document.querySelectorAll('.tradeGroups')
    let stageElements = document.querySelectorAll('.stagesCheckbox')
    let TradeIdArray = []
    let stageIdArray = []
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


    let tradeIds = TradeIdArray
    let stageId = stageIdArray
    let supervisorData = []
    let foremanData = []
    tradeIds.forEach((tradeId) => {
      stageId.forEach((stageId) => {
        let data = {
          schemeId: this.registerForm.value.schemeId,
          structureId: this.registerForm.value.structureId,
          contractorId: this.registerForm.value.contractorId,
          supervisorId: this.registerForm.value.supervisorId,
          clientStaffId: this.registerForm.value.clientStaffId,
          tradeId,
          stageId
        }

        let fdata = {
          schemeId: this.registerForm.value.schemeId,
          structureId: this.registerForm.value.structureId,
          contractorId: this.registerForm.value.contractorId,
          foremanId: this.registerForm.value.foremanId,
          clientStaffId: this.registerForm.value.clientStaffId,
          tradeId,
          stageId
        }

        supervisorData.push(data)
        foremanData.push(fdata)
      })
    })

    // console.log(supervisorData)
    this.isbtnLoading = true
    if (this.registerForm.value.supervisorId) {
      this.clientService.assignContractorSupervisor(supervisorData)
        .subscribe(data => {
          console.log('assigned-->', data)
          this.isbtnLoading = false

        },
          err => console.log(err))
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


  units: Array<Object> = []
  currentStage: Number
  unitLoad: boolean = false
  selectedStates = []
  disabledUnits : boolean = false
  getunit(e) {
    this.currentStage = Number(e.target.value)
    if (e.target.checked) {
      this.unitLoad = true
      this.commonServices.getUnits(this.SelClient, this.SelProject, this.SelStructure, e.target.value)
        .subscribe(data => {
          console.log(data)
          // this.stages = data
          this.units = data
          this.unitLoad = false
        })

        this.selectedStates.push(this.currentStage)
    }else{
      this.selectedStates = this.selectedStates.filter(stage =>{
          return stage != this.currentStage
      })
      this.units = []
      this.subunits = []
    }

    if(this.selectedStates.length > 1){
      this.disabledUnits = true
    }else{
      this.disabledUnits = false
    }

  }

  subunits: Array<Object> = []
  subunitLoad: boolean = false
  getSubunit(e) {
    if (e.target.checked) {
      this.subunitLoad = true
      this.commonServices.getSubUnit(this.SelClient, this.SelProject, this.SelStructure, this.currentStage, e.target.value)
        .subscribe(data => {
          console.log(data)
          // this.stages = data
          this.subunits = data
          this.subunitLoad = false
        })
    }else{
      this.subunits = []
    }
  }
}



