import { Component, OnInit } from '@angular/core';
import { CommonService } from "../common.service";
import { ProjectData, ProjectView } from '../project/project.component';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TradeMaintanceService } from "../trade-maintance.service";
import { TradeGroup } from '../trade-group/trade-group.component';
import { Trade } from '../trade/trade.component';
import { ClientServiceService } from '../service/client-service.service';
import { ClientData } from '../client/client.component';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { StageData } from '../wbs/wbs.component';
import { QuestionGroupView } from '../question-group/question-group.component';
import { ContractorData } from '../contractor-forman/contractor-forman.component';
import { clientStaffData } from '../create-client-staff/create-client-staff.component';
import { forEach } from '@angular/router/src/utils/collection';
import { CycleOfInspection } from '../ncclosure-sa/ncclosure-sa.component';
import { log } from 'console';


export class TradeRowDataForSamplingStep {
  constructor(
    public projectId: Number,
    public tradeId: Number,
    public tradeggroupId: Number,
    public tradeGroupName: string,
    public tradeName: string
  ) { }
}

export class ContractorDataForSamplingStep {
  constructor(
    public id: Number,
    public projectId: Number,
    public tradeId: Number,
    public contractorId: Number,
    public contractorName: string
  ) { }
}
export class SamplingData {
  constructor(
    public projectId: number,
    public tradeGroupId: number,
    public tradeId: number,
    public structureId: number,
    public completePercentage: number
  ) { }
}
export class SamplingView {
  constructor(
    public idU: number,
    public tradeGroupTextU: string,
    public completePercentageU: number,
    public structureNameU: string,
    public projectNameU: String,
    public tradeNameU: string
  ) { }
}
@Component({
  selector: 'app-create-sampling',
  templateUrl: './create-sampling.component.html',
  styleUrls: ['./create-sampling.component.css']
})
export class CreateSamplingComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  samplingId: number
  projects: ProjectData[]
  clients: Array<Object>
  trades: any
  questionGroup: QuestionGroupView
  samplingForm: FormGroup;
  stages: StageData[]
  structures: any
  SelStructure: any
  SelClientId: any
  SelProject: any
  selTrade: any
  location: any
  SelContractorId: number
  samplingType = 1;
  submitted = false
  reportDate: String
  inspectionDate: String
  contratorData: ContractorData[]
  staffData: clientStaffData
  tradeRowData: TradeRowDataForSamplingStep
  contractorDataTradeWise = {}
  cycleOfInspection: CycleOfInspection[]
  allClients: ClientData[]


  tradeIds = []
  steptracker = {
    step1: {
      status: true,
      data: []
    },
    step2: {
      status: false,
      data: []
    },
    step3: {
      status: false,
      data: []
    }
  }

  testTG = [

  ]


  testTrade = {
  }

  step2formRenderData = {}
  step2StatusData = {}

  allocatedarea = {}
  workArea = {}
  statusData = [
    {
      id: "compledted",
      name: "Compledted",
    },
    {
      id: "na",
      name: "NA",
    },
    {
      id: "notStarted",
      name: "Not Started",
    }

  ]
  isStepFirstFormField = false
  isStepSecondFormField = false
  isThirdStep = false
  title = "step1"
  stageNameData = {}

  masterData: any

  constructor(
    private commanService: CommonService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.clientService.getAllClients()
      .subscribe(data => {
        this.allClients = data
      })

    this.commanService.getAllCycleOfInspection()
      .subscribe(data => {
        console.log('cycle of inspection', data)
        this.cycleOfInspection = data
      })

    console.log(this.allocatedarea)

    this.samplingId = this.route.snapshot.params['id']


    this.masterData = JSON.parse(localStorage.getItem('mData'))
    console.log(this.masterData)

    this.getInitialData(this.masterData.projectId, this.samplingType)

    // this.clientService.getAllProject()
    //   .subscribe(data => {
    //     console.log('projects ==>', data)
    //     this.projects = data;
    //   })


    this.samplingForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      tradeGroupId: ['', Validators.required],
      tradeId: ['', Validators.required],
      structureId: ['', Validators.required],
      stageId: ['', Validators.required],
      completePercentage: ['', Validators.required],
      samplingType: ['', Validators.required]
    })
  }

  getSamplingInitialData(e) {
    this.getInitialData(this.masterData.projectId, Number(e.target.value))
  }

  getProject() {
    this.commanService.getClientProject(this.SelClientId)
      .subscribe(data => {
        this.projects = data
      })
  }

  nextStep(step) {
    console.log(step)
    let cuurentStep = document.querySelector(`#step${step}`)
    let allStep = document.querySelectorAll('.tab-pane')
    console.log(allStep)
    allStep.forEach(el => {
      el.classList.remove('show')
      el.classList.remove('active')
    })

    cuurentStep.classList.add('show')
    cuurentStep.classList.add('active')


    let currentStepLink = document.querySelector(`#nav-step-${step}`)
    let allStepLinks = document.querySelectorAll('.nav-link')
    allStepLinks.forEach(el => {
      el.classList.remove('active-link')
    })
    currentStepLink.classList.add('active-link')

  }


  // getStructure() {
  //   console.log(this.SelProject)
  //   console.log(this.samplingType)
  //   this.commanService.getStructureByProjectId(this.SelProject)
  //     .subscribe(
  //       (data) => {
  //         console.log('Structure Data==', data)
  //         this.structures = data;

  //       }, (err) => {
  //         console.log('-----> err', err);
  //       })

  //   this.tradeService.getProjectTrades(this.SelProject)
  //     .subscribe(
  //       data => {
  //         console.log('trades-->', data)
  //         this.trades = data
  //       }
  //     )


  //   if (this.samplingType === 1) {
  //     console.log(this.samplingType)
  //     this.clientService.getClientByProjectId(this.SelProject)
  //       .subscribe(data => this.clients = data)

  //   } else {
  //     console.log(this.samplingType)

  //     this.clientService.getContractorsForSamplingStep(this.SelProject)
  //       .subscribe(data => {
  //         console.log(data);
  //         this.convertContractorRowObjet(data)
  //       })

  //     this.clientService.getClientStaffByProjectId(this.SelProject).subscribe(data => this.staffData = data)
  //   }


  //   this.clientService.getTradesForSamplingStepFirst(this.SelProject)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.convertRowObjet(data)
  //     })

  // }

  getInitialData(projectId, samplingType) {

    this.SelClientId = this.masterData.clientId
    this.SelProject = this.masterData.projectId,
      this.Selcycle = this.masterData.cycleId,
      this.reportDate = new Date(this.masterData.fromDate).toISOString().substring(0, 10)
    this.inspectionDate = new Date(this.masterData.toDate).toISOString().substring(0, 10)

    this.commanService.getStructureByProjectId(projectId)
      .subscribe(
        (data) => {
          console.log('Structure Data==', data)
          this.structures = data;

        }, (err) => {
          console.log('-----> err', err);
        })

    this.tradeService.getProjectTrades(projectId)
      .subscribe(
        data => {
          console.log('trades-->', data)
          this.trades = data
        }
      )


    if (samplingType === 1) {
      console.log(samplingType)
      this.clientService.getClientByProjectId(projectId)
        .subscribe(data => this.clients = data)

    } else {
      console.log(samplingType)

      this.clientService.getContractorsForSamplingStep(projectId)
        .subscribe(data => {
          console.log(data);
          this.convertContractorRowObjet(data)
        })

      this.clientService.getClientStaffByProjectId(projectId).subscribe(data => this.staffData = data)
    }


    this.clientService.getTradesForSamplingStepFirst(projectId)
      .subscribe(data => {
        console.log(data);
        this.convertRowObjet(data)
      })
  }

  convertRowObjet(data) {
    let tradeGroupArray = []
    let tradeObject = {}

    data.forEach(item => {
      if (tradeObject[item.tradeggroupId]) {
        let tradeData = {
          tradeId: item.tradeId,
          tradeNane: item.tradeName
        }

        tradeObject[item.tradeggroupId].push(tradeData)
      } else {

        let tradeGroup = {
          id: item.tradeggroupId,
          tradegroupName: item.tradeGroupName
        }

        tradeGroupArray.push(tradeGroup)

        tradeObject[item.tradeggroupId] = []
        let tradeData = {
          tradeId: item.tradeId,
          tradeNane: item.tradeName
        }
        tradeObject[item.tradeggroupId].push(tradeData)
      }
    })


    console.log(tradeObject)
    this.testTG = tradeGroupArray
    this.testTrade = tradeObject

  }

  convertContractorRowObjet(data) {
    let contractorObject = {}
    data.forEach(item => {
      if (contractorObject[item.tradeId]) {
        let contractor = {
          contractorId: item.contractorId,
          contractorName: item.contractorName
        }

        contractorObject[item.tradeId].push(contractor)
      } else {

        let contractor = {
          contractorId: item.contractorId,
          contractorName: item.contractorName
        }

        contractorObject[item.tradeId] = []

        contractorObject[item.tradeId].push(contractor)
      }

    })

    console.log(contractorObject)
    this.contractorDataTradeWise = contractorObject

  }

  getStages() {
    this.statusData = [
      {
        id: "notStarted",
        name: "Not Started",
      },
      {
        id: "na",
        name: "NA",
      },
      {
        id: "compledted",
        name: "Compledted",
      }

    ]
    this.commanService.getStagesByStructureId(this.SelStructure)
      .subscribe(
        data => {
          this.stages = data
          console.log(this.stages)
          this.stages.forEach((stage) => {
            let item = {
              id: String(stage.stageId),
              name: stage.stageName
            }
            this.statusData.push(item)

            this.stageNameData[stage.stageId] = stage.stageName
          })
        }
      )
    console.log(this.statusData)
  }

  getQuestionGroup() {
    this.tradeService.getQuestionGroupBytradeId(this.selTrade)
      .subscribe(
        data => {
          console.log(data)
          this.questionGroup = data
        }
      )
  }


  samplingStepFirstSubmit() {
    this.nextStep(1)
    let stautsSelect = document.querySelectorAll('.tradename')
    this.tradeIds = []
    let newformData = []
    let samplingStepFirstSubmitData = []
    stautsSelect.forEach((item) => {
      this.tradeIds.push(Number((<HTMLSpanElement>item).title))
    })
    console.log(this.tradeIds)
    this.tradeIds.forEach((item) => {
      let statusValue = document.querySelector(`.tradeStatusSelect_${item}`)
      // console.log()
      let workAreaWithName = []
      this.workArea[item] && this.workArea[item].forEach(stage => {
        let workAreaName = {
          stageId: stage,
          stageName: this.stageNameData[stage]
        }
        workAreaWithName.push(workAreaName)
      })

      let data = {
        projectId: this.SelProject,
        structureId: this.SelStructure,
        masterId: this.masterData.masterId,
        tradeId: item,
        status: (<HTMLSelectElement>statusValue).value,
        workAreaWithName
      }

      newformData.push({
        ...data,
        workArea: this.workArea[item] ? this.workArea[item] : [],
      })

      samplingStepFirstSubmitData.push({ ...data, samplingType: this.samplingType })

    })

    // console.log(newformData)
    this.steptracker.step1.data = newformData
    console.log(this.steptracker)
    // console.log('submit data-->',samplingStepFirstSubmitData)
    // console.log('wokr area-->', this.workArea)

    //Submiting step fist data to backend
    this.clientService.addSamplingStepFirst(samplingStepFirstSubmitData)
      .subscribe(data => {
        console.log('Step 1 data Added-->', data)
      })


    this.steptracker.step2.status = true
    if (this.steptracker.step2.status) {
      this.generateDataForStep2(this.steptracker.step1.data)
      this.title = "step2"
    }
  }
  addStep1WorkArea(e, tradeId) {
    console.log(e.target.checked)
    if (!e.target.checked) {
      //FOR REMOVE STAGE FROM AREA
      let stageId = Number(e.target.value)
      console.log(stageId)
      let isExist = this.workArea[tradeId] && this.workArea[tradeId].find(stage => {
        return stage === stageId ? true : false
      })
      if (isExist) {
        this.workArea[tradeId] = this.workArea[tradeId].filter(stage => {
          return stage != stageId
        })
      }
      if (this.workArea[tradeId].length === 0) {
        delete this.workArea[tradeId]
      }
      console.log(this.workArea)
    } else {
      //FOR ADD STAGE FROM AREA
      let stageId = e.target.value
      let isExist = this.workArea[tradeId] && this.workArea[tradeId].find(stage => {
        return stage === stageId ? true : false
      })
      if (!isExist) {
        // selectedStages.push()
        if (this.workArea[tradeId]) {
          this.workArea[tradeId].push(Number(stageId))
        } else {
          this.workArea[tradeId] = []
          this.workArea[tradeId].push(Number(stageId))
        }
      }
    }

    console.log(this.workArea)

    if (Object.keys(this.workArea).length != 0) {
      this.isStepFirstFormField = true
    } else {
      this.isStepFirstFormField = false

    }
  }


  generateDataForStep2(step1Data) {
    this.step2formRenderData
    step1Data.forEach(data => {
      if (data.status != 'notStarted' && data.status != 'na') {
        this.step2StatusData[data.tradeId] = {
          id: data.status,
          name: data.status
        }
      } else {
        if (this.step2StatusData[data.tradeId]) {
          delete this.step2StatusData[data.tradeId]
        }
      }
    })

    for (const key in this.testTrade) {

      this.step2formRenderData[key] = []
      for (const trade of this.testTrade[key]) {
        if (this.step2StatusData[trade.tradeId]) {
          this.step2formRenderData[key].push({
            tradeId: trade.tradeId,
            tradeNane: trade.tradeNane
          })
        }
      }
    }

    console.log('step 2 render-->', this.step2formRenderData)
    console.log(this.step2StatusData)

  }

  samplingStepSeceondSubmit() {
    let stautsSelect = document.querySelectorAll('.step2Tradename')
    this.tradeIds = []
    let newformData = []
    let samplingStepFirstSubmitData = []

    stautsSelect.forEach((item) => {
      this.tradeIds.push(Number((<HTMLSpanElement>item).title))
    })
    console.log(this.tradeIds)
    if (this.samplingType != 1) {

      this.tradeIds.forEach((item) => {
        let statusValue = document.querySelector(`.step2TradeStatusSelect_${item}`)
        let contractorValue = document.querySelectorAll(`.step2ContractorSelect_${item}`)
        console.log(contractorValue)
        let staffValue = document.querySelector(`.step2StaffSelect_${item}`)
        // console.log()
        contractorValue.forEach(contractor => {
          let workAreaWithName = []
          let contractorId = (<HTMLSelectElement>contractor).title
          this.step2workArea[item][contractorId] && this.step2workArea[item][contractorId].forEach(stage => {
            let workAreaName = {
              stageId: stage,
              stageName: this.stageNameData[stage]
            }
            workAreaWithName.push(workAreaName)
          })

          let data = {
            projectId: this.SelProject,
            structureId: this.SelStructure,
            masterId: this.masterData.masterId,
            tradeId: item,
            status: (<HTMLSelectElement>statusValue).value,
            contractorId: contractorId,
            contractor: contractorId,
            contractorName: (<HTMLSelectElement>contractor).value,
            staff: (<HTMLSelectElement>staffValue).value,
            workAreaWithName,
            allocatedArea: workAreaWithName

          }

          newformData.push({
            ...data,
            allocatedArea: this.step2workArea[item] ? this.step2workArea[item] : [],
          })

          samplingStepFirstSubmitData.push({ ...data, samplingType: this.samplingType })
        })

      })
    } else {
      this.tradeIds.forEach((item) => {
        let statusValue = document.querySelector(`.step2TradeStatusSelect_${item}`)
        let contractorValue = document.querySelector(`.step2ContractorSelect_${item}`)
        let staffValue = document.querySelector(`.step2StaffSelect_${item}`)
        // console.log()
        let workAreaWithName = []
        this.step2workArea[item] && this.step2workArea[item].forEach(stage => {
          let workAreaName = {
            stageId: stage,
            stageName: this.stageNameData[stage]
          }
          workAreaWithName.push(workAreaName)
        })

        let data = {
          projectId: this.SelProject,
          structureId: this.SelStructure,
          masterId: this.masterData.masterId,
          tradeId: item,
          status: (<HTMLSelectElement>statusValue).value,
          contractorId: (<HTMLSelectElement>contractorValue).value,
          contractor: (<HTMLSelectElement>contractorValue).value,
          contractorName: (<HTMLSelectElement>contractorValue).title,
          staff: (<HTMLSelectElement>staffValue).value,
          workAreaWithName,
          allocatedArea: workAreaWithName
        }

        newformData.push({
          ...data,
          allocatedArea: this.step2workArea[item] ? this.step2workArea[item] : [],
        })

        samplingStepFirstSubmitData.push({ ...data, samplingType: this.samplingType })
      })
    }

    console.log(newformData)

    // this.steptracker.step2.data = newformData
    this.steptracker.step2.data = samplingStepFirstSubmitData
    console.log('sampling step 2-->', samplingStepFirstSubmitData)
    // this.clientService.addSamplingStepSecond(samplingStepFirstSubmitData)
    //   .subscribe(data => {
    //     console.log('Step 2 data Added-->', data)
    //   })

    this.commanService.setSamplingStepData(this.steptracker)
    this.isThirdStep = true


    // this.steptracker.step2.status = true
    // if (this.steptracker.step2.status) {
    //   this.generateDataForStep2(this.steptracker.step1.data)
    //   this.title = "step2"
    // }
  }


  step2workArea = {}
  addStep2WorkArea(e, tradeId, contractorId) {
    console.log(contractorId, tradeId, e)
    if (!e.target.checked) {
      //FOR REMOVE STAGE FROM AREA
      let stageId = Number(e.target.value)
      let isExist = this.step2workArea[tradeId][contractorId] && this.step2workArea[tradeId][contractorId].find(stage => {
        return stage === stageId ? true : false
      })
      console.log(isExist)
      if (isExist) {
        this.step2workArea[tradeId][contractorId] = this.step2workArea[tradeId][contractorId].filter(stage => {
          return stage != stageId
        })
      }
      if (this.step2workArea[tradeId][contractorId].length === 0) {
        delete this.step2workArea[tradeId][contractorId]
      }
    } else {
      //FOR ADD STAGE FROM AREA
      let stageId = Number(e.target.value)
      let isExist = this.step2workArea[tradeId] ? true : false
      if (isExist) {
        if (this.step2workArea[tradeId][contractorId]) {
          this.step2workArea[tradeId][contractorId].push(stageId)

        } else {
          this.step2workArea[tradeId][contractorId] = []
          this.step2workArea[tradeId][contractorId].push(stageId)

        }
      } else {
        this.step2workArea[tradeId] = {}
        this.step2workArea[tradeId][contractorId] = []
        this.step2workArea[tradeId][contractorId].push(stageId)

      }
      // if()
      // if (!isExist) {
      //   // selectedStages.push()
      //   if (this.step2workArea[tradeId][contractorId]) {
      //     this.step2workArea[tradeId][contractorId].push(stageId)
      //   } else {
      //     this.step2workArea[tradeId] = {}
      //     this.step2workArea[tradeId][contractorId] = []
      //     this.step2workArea[tradeId][contractorId].push(stageId)
      //   }
      // }else{
      //   console.log('hello')
      // }
    }
    console.log(this.step2workArea)
    if (Object.keys(this.step2workArea).length != 0) {
      this.isStepSecondFormField = true
    } else {
      this.isStepSecondFormField = false

    }
  }

  addStep2type1WorkArea(e, tradeId) {
    if (!e.target.checked) {
      //FOR REMOVE STAGE FROM AREA
      let stageId = e.target.value
      let isExist = this.step2workArea[tradeId] && this.step2workArea[tradeId].find(stage => {
        return stage === stageId ? true : false
      })
      if (isExist) {
        this.step2workArea[tradeId] = this.step2workArea[tradeId].filter(stage => {
          return stage != stageId
        })
      }
      if (this.step2workArea[tradeId].length === 0) {
        delete this.step2workArea[tradeId]
      }
    } else {
      //FOR ADD STAGE FROM AREA
      let stageId = e.target.value
      let isExist = this.step2workArea[tradeId] && this.step2workArea[tradeId].find(stage => {
        return stage === stageId ? true : false
      })
      if (!isExist) {
        // selectedStages.push()
        if (this.step2workArea[tradeId]) {
          this.step2workArea[tradeId].push(stageId)
        } else {
          this.step2workArea[tradeId] = []
          this.step2workArea[tradeId].push(stageId)
        }
      }
    }
    // console.log(this.allocatedarea)
    if (Object.keys(this.step2workArea).length != 0) {
      this.isStepSecondFormField = true
    } else {
      this.isStepSecondFormField = false

    }
  }



  step1SelectAll(e, tradeId) {
    console.log(e, tradeId)
    console.log(this.stages)
    if (e.target.checked) {
      $(`.step2StagesCheckbox_${tradeId}`).prop('checked', true);
      this.workArea[tradeId] = []
      this.stages.forEach(stage => {
        this.workArea[tradeId].push(stage.stageId)
      });

      console.log(this.workArea)
    } else {
      $(`.step2StagesCheckbox_${tradeId}`).prop('checked', false);
      this.workArea[tradeId] = []
      delete this.workArea[tradeId]
    }

    if (Object.keys(this.workArea).length != 0) {
      this.isStepFirstFormField = true
    } else {
      this.isStepFirstFormField = false

    }
  }

  step2SelectAll(e, tradeId) {
    console.log(e, tradeId)
    console.log(this.stages)
    if (e.target.checked) {
      $(`.step2StagesCheckbox_${tradeId}`).prop('checked', true);
      this.step2workArea[tradeId] = []
      this.workArea[tradeId].forEach(stage => {
        this.step2workArea[tradeId].push(stage)
      });

      console.log(this.step2workArea)
    } else {
      $(`.step2StagesCheckbox_${tradeId}`).prop('checked', false);
      this.step2workArea[tradeId] = []
      delete this.step2workArea[tradeId]
    }

    if (Object.keys(this.step2workArea).length != 0) {
      this.isStepSecondFormField = true
    } else {
      this.isStepSecondFormField = false

    }
  }





  //-------------------------------step 3 ------------------------------------------//

  step2Data = {}
  sampledUnitPersentage = 5

  stageData = {}
  persentageData = {}
  randomSampledArea = {}
  sampledUnitnumber = {}

  type2step3data = {}
  type2StageData = {}
  type2PersentageData = {}
  type2RandomSampledArea = {}
  type2SampledUnitnumber = {}

  SamplingType = 1
  contractorId: number //assign if sampling type 1
  staffId: number //assign if sampling type 1

  tradeNameObj = {}

  fromDate = ''
  toDate = ''
  Selcycle = 0
  testTGStep3 = []

  testTradeStep3 = {}


  goToStepThree() {
    console.log(this.steptracker.step2.data)
    this.clientService.getSamplingStep2Data(this.SelProject, this.SelStructure).subscribe(data => {
      // this.step2Data = data
      console.log('---------->>', data)
      // this.step2Data = this.convertStep2Data(data)
      this.step2Data = this.steptracker.step2.data
      console.log(this.step2Data)
      if (this.step2Data[0].samplingType == 2) {
        this.samplingType = 2;
        this.genarateDataForSamplingType2(this.step2Data)
      }

      if (this.step2Data[0].samplingType == 1) {
        this.contractorId = this.step2Data[0].contractor
        this.staffId = this.step2Data[0].staff
      }


      for (const item in this.step2Data) {
        let data = this.step2Data[item]
        this.stageData[data.tradeId] = data.allocatedArea
        this.persentageData[data.tradeId] = this.sampledUnitPersentage
      }

      for (const key in this.persentageData) {
        let units = this.persentageData[key] * this.stageData[key].length / 100
        units < 1 ? units = 1 : units = Math.round(units)
        this.sampledUnitnumber[key] = units
      }
      console.log(this.persentageData)
      console.log(this.sampledUnitnumber)
      console.log('stage data-->', this.stageData)

    })

    // this.clientService.getAllProject()
    //   .subscribe(data => {
    //     console.log('projects ==>', data)
    //     this.projects = data;
    //   })

    // this.commanService.getAllCycleOfInspection()
    //   .subscribe(data => this.cycles = data)


    this.clientService.getTradesForSamplingStepSecond(this.SelProject)
      .subscribe(data => {
        console.log(data);
        this.convertRowObjetFromStep3(data)
      })

    for (const key in this.step2formRenderData) {
      this.step2formRenderData[key].forEach(trade => {
        this.tradeNameObj[trade.tradeId] = trade.tradeNane
      })
    }
    console.log(this.tradeNameObj)
    // this.testTGStep3 = tradeGroupArray
    // this.testTradeStep3 = tradeObject
    this.testTGStep3 = this.testTG
    this.testTradeStep3 = this.step2formRenderData
    console.log('Step 3----->', this.testTGStep3)
    console.log('Step 3----->', this.testTradeStep3)
  }



  convertRowObjetFromStep3(data) {
    // let tradeGroupArray = []
    // let tradeObject = {}

    // let tradeChecker = {}
    // data.forEach(item => {
    //   if (!tradeChecker[item.tradeId]) {

    //     if (tradeObject[item.tradeGroupId]) {
    //       let tradeData = {
    //         tradeId: item.tradeId,
    //         tradeNane: item.tradeName
    //       }

    //       tradeObject[item.tradeGroupId].push(tradeData)
    //     } else {

    //       let tradeGroup = {
    //         id: item.tradeGroupId,
    //         tradegroupName: item.tradeGroupName
    //       }

    //       tradeGroupArray.push(tradeGroup)

    //       tradeObject[item.tradeGroupId] = []
    //       let tradeData = {
    //         tradeId: item.tradeId,
    //         tradeNane: item.tradeName
    //       }
    //       tradeObject[item.tradeGroupId].push(tradeData)
    //     }

    //     // this.tradeNameObj[item.tradeId] = item.tradeName
    //     // tradeChecker[item.tradeId] = true
    //   }
    // })


    for (const key in this.step2formRenderData) {
      this.step2formRenderData[key].forEach(trade => {
        this.tradeNameObj[trade.tradeId] = trade.tradeNane
      })
    }
    console.log(this.tradeNameObj)
    // this.testTGStep3 = tradeGroupArray
    // this.testTradeStep3 = tradeObject
    this.testTGStep3 = this.testTG
    this.testTradeStep3 = this.step2formRenderData
    console.log('Step 3----->', this.testTGStep3)
    console.log('Step 3----->', this.testTradeStep3)

  }

  convertStep2Data(data) {
    let tempTradeData = {}

    data.forEach(item => {
      let stage = {
        stageId: item.stageId,
        stageName: item.stageName
      }
      if (!tempTradeData[item.contractorId]) {
        tempTradeData[item.contractorId] = {}
        if (tempTradeData[item.contractorId][item.tradeId]) {
          tempTradeData[item.contractorId][item.tradeId].push(stage)
        } else {
          tempTradeData[item.contractorId][item.tradeId] = []
          tempTradeData[item.contractorId][item.tradeId].push(stage)
        }
      } else {
        if (tempTradeData[item.contractorId][item.tradeId]) {
          tempTradeData[item.contractorId][item.tradeId].push(stage)
        } else {
          tempTradeData[item.contractorId][item.tradeId] = []
          tempTradeData[item.contractorId][item.tradeId].push(stage)
        }
      }
    })

    let step2data = []
    data.forEach(item => {
      let data = {
        projectId: item.projectId,
        structureId: item.structureId,
        tradeId: item.tradeId,
        status: item.status,
        samplingType: Number(item.samplingType),
        contractor: item.contractorId,
        contractorName: item.contractorName,
        staff: item.staff,
        staffName: "tets",
        allocatedArea: tempTradeData[item.contractorId][item.tradeId]
      }

      step2data.push(data)
    })

    console.log('---->', step2data)
    console.log('---->', tempTradeData)

    return step2data
  }

  allocatedArea = {}
  tradeTracker = 0
  addPersentage(tradeId) {
    if (this.persentageData[tradeId] && this.persentageData[tradeId] < 100) {
      this.persentageData[tradeId] += 5
      let units = this.persentageData[tradeId] * this.stageData[tradeId].length / 100
      units < 1 ? units = 1 : units = Math.round(units)
      this.sampledUnitnumber[tradeId] = units
      this.tradeTracker = 0
    }
  }

  type2addPersentage(contractorId, tradeId) {
    if (this.type2PersentageData[contractorId][tradeId] && this.type2PersentageData[contractorId][tradeId] < 100) {
      this.type2PersentageData[contractorId][tradeId] += 5
      let units = this.type2PersentageData[contractorId][tradeId] * this.type2StageData[contractorId][tradeId].length / 100
      units < 1 ? units = 1 : units = Math.round(units)
      this.type2SampledUnitnumber[contractorId][tradeId] = units
      this.tradeTracker = 0
    }
  }


  lessPersentage(tradeId) {
    if (this.persentageData[tradeId] && this.persentageData[tradeId] > 5) {
      let units = this.persentageData[tradeId] * this.stageData[tradeId].length / 100
      units < 1 ? units = 1 : units = Math.round(units)
      this.sampledUnitnumber[tradeId] = units
      this.persentageData[tradeId] -= 5

    }
  }

  type2lessPersentage(contractorId, tradeId) {
    if (this.type2PersentageData[contractorId][tradeId] && this.type2PersentageData[contractorId][tradeId] > 5) {
      this.type2PersentageData[contractorId][tradeId] -= 5
      let units = this.type2PersentageData[contractorId][tradeId] * this.type2StageData[contractorId][tradeId].length / 100
      units < 1 ? units = 1 : units = Math.round(units)
      this.type2SampledUnitnumber[contractorId][tradeId] = units
    }
  }

  // stageAreas = []
  getRandomStage(tradeId) {
    let stageAreas = []
    this.allocatedArea = {}
    stageAreas = this.stageData[tradeId]
    console.log('inital stages--', stageAreas)

    let unit = this.sampledUnitnumber[tradeId]

    if (unit === this.stageData[tradeId].length) {
      this.randomSampledArea[tradeId] = this.stageData[tradeId]
      return
    }

    stageAreas.forEach(item => {
      this.allocatedArea[item.stageId] = item
    })

    console.log('allocated area-->', this.allocatedArea)

    let area = []
    for (let i = 1; i <= unit; i++) {
      let keysArray = Object.keys(this.allocatedArea)
      let randomKey = keysArray[Math.floor(Math.random() * keysArray.length)]
      area.push(this.allocatedArea[randomKey])
      delete this.allocatedArea[randomKey]
    }

    console.log('random area-->', area)

    this.randomSampledArea[tradeId] = area

    console.log(this.randomSampledArea)

  }

  type2GetRandomStage(contractorId, tradeId) {
    console.log(contractorId, tradeId)
    let stageAreas = []
    console.log(contractorId, tradeId)
    let allocatedArea = {}
    stageAreas = this.type2StageData[contractorId][tradeId]
    console.log('inital stages--', stageAreas)

    let unit = this.type2SampledUnitnumber[contractorId][tradeId]

    if (unit === this.type2StageData[contractorId][tradeId].length) {
      this.type2RandomSampledArea[contractorId] = { ...this.type2RandomSampledArea[contractorId] }
      this.type2RandomSampledArea[contractorId][tradeId] = this.type2StageData[contractorId][tradeId]
      console.log('type 2 random area-->', this.type2RandomSampledArea)

      return
    }
    console.log('stages--.', stageAreas)
    stageAreas.forEach(item => {
      allocatedArea[item.stageId] = item
    })

    console.log('allocated area-->', allocatedArea)

    let area = []
    for (let i = 1; i <= unit; i++) {
      let keysArray = Object.keys(allocatedArea)
      let randomKey = keysArray[Math.floor(Math.random() * keysArray.length)]
      area.push(allocatedArea[randomKey])
      delete allocatedArea[randomKey]
    }

    console.log('random area-->', area)
    let randomstages = { ...this.type2RandomSampledArea[contractorId] }

    randomstages[tradeId] = area
    this.type2RandomSampledArea[contractorId] = randomstages

    console.log('type 2 random area-->', this.type2RandomSampledArea)

  }

  submitStep3Data() {
    let stautsSelect = document.querySelectorAll('.trades')
    let tradeIds = []
    let newformData = []
    stautsSelect.forEach((item) => {
      tradeIds.push(Number((<HTMLSpanElement>item).title))
    })
    console.log(tradeIds)

    tradeIds.forEach(trade => {
      let formdata = {
        projectId: this.SelProject,
        structureId: this.SelStructure,
        cycleOfInspection: this.Selcycle,
        contractorId: this.contractorId,
        masterId: this.masterData.masterId,
        tradeId: trade,
        staffId: this.staffId,
        samplingType: this.samplingType,
        fromDate: this.reportDate,
        toDate: this.inspectionDate,
        stageFrom: [this.stageData[trade][0]],
        stageTo: [this.stageData[trade][this.stageData[trade].length - 1]],
        samplUnitPersentage: this.persentageData[trade],
        sampledUnitNumber: this.sampledUnitnumber[trade],
        randomStages: this.randomSampledArea[trade]
      }
      newformData.push(formdata)
    })

    // projectId: this.SelProject,
    // structureId: this.SelStructure,
    // fromDate: this.fromDate,
    // toDate: this.toDate,
    // cycleOfInspection: this.Selcycle,
    // contractorId : contractor,
    // staffId: (<HTMLInputElement>staffId).value,
    // tradeId: trade,
    // samplingType: this.samplingType,
    // fromStage: this.type2StageData[contractor][trade][0],
    // toStage: this.type2StageData[contractor][trade][this.type2StageData[contractor][trade].length - 1],
    // samplUnitPersentage: this.type2PersentageData[contractor][trade],
    // sampledUnitnumber: this.type2SampledUnitnumber[contractor][trade],
    // randomStages: this.type2RandomSampledArea[contractor][trade]

    let dataWrapper = {}
    dataWrapper = {
      clientWise: newformData,
      contractorWise: null
    }
    console.log(newformData)
    // return

    console.log(this.steptracker.step2.data)
    let step2Data = this.steptracker.step2.data.map(step2 => {
      step2.allocatedArea = ''
      return step2
    })

    this.clientService.addSamplingStepSecond(step2Data)
      .subscribe(data => {
        console.log('Step 2 data Added-->', data)
      })

    this.clientService.submitStep3Data(newformData)
      .subscribe(data => {
        console.log('step3 Data is added-->', data)
      },
        err => {
          console.log(err)
        })

  }


  genarateDataForSamplingType2(samplingData) {
    // let samplingData2 = []

    let tempData = {}
    let checkTrade = {}
    samplingData.forEach(data => {

      if (tempData[data.contractor]) {
        if (!tempData[data.contractor].samplingData[data.tradeId]) {
          tempData[data.contractor].samplingData[data.tradeId] = data
        }
      } else {
        tempData[data.contractor] = {
          contractorId: data.contractor,
          contractorName: data.contractorName,
          staffId: data.staff,
          samplingData: {}
        }
        if (!tempData[data.contractor].samplingData[data.tradeId]) {
          tempData[data.contractor].samplingData[data.tradeId] = data
        }
      }
      checkTrade[data.tradeId] = true
      // samplingData2.push(tempData)
    })

    console.log(tempData)
    this.type2step3data = tempData

    // for (const item in this.step2Data) {
    //   let data = this.step2Data[item]
    //   this.stageData[data.tradeId] = data.allocatedArea
    //   this.persentageData[data.tradeId] = this.sampledUnitPersentage
    // }

    // for (const key in this.persentageData) {
    //   let units = this.persentageData[key] * this.stageData[key].length / 100
    //   units < 1 ? units = 1 : units = Math.round(units)
    //   this.sampledUnitnumber[key] = units
    // }
    for (const key in tempData) {
      samplingData = tempData[key].samplingData
      let tradeData = {}
      let persentageData = {}
      for (let keyy in samplingData) {
        tradeData[keyy] = samplingData[keyy].allocatedArea
        persentageData[keyy] = this.sampledUnitPersentage
        // console.log(samplingData[keyy])
      }

      this.type2StageData[key] = tradeData
      this.type2PersentageData[key] = persentageData
    }

    console.log(this.type2StageData)
    console.log(this.type2PersentageData)

    for (const contractor in this.type2PersentageData) {
      let persentageTrade = this.type2PersentageData[contractor]
      let sampleUnitNumber = {}
      for (const trade in persentageTrade) {
        let units = persentageTrade[trade] * this.type2StageData[contractor][trade].length / 100
        units < 1 ? units = 1 : units = Math.round(units)
        sampleUnitNumber[trade] = units
      }

      this.type2SampledUnitnumber[contractor] = sampleUnitNumber
    }

    console.log('type2 stage-->', this.type2StageData)
    console.log('type2 persentage-->', this.type2PersentageData)
    console.log('type2 sampled unit number-->', this.type2SampledUnitnumber)
    console.log('type2 random area-->', this.type2RandomSampledArea)



  }

  Type2submitStep3Data() {
    let contractorRow = document.querySelectorAll('.contractorId')
    let contractorIds = []
    let tradeRow = document.querySelectorAll('.type2trades')
    let tradeIds = []
    // let newformData = []
    contractorRow.forEach((item) => {
      contractorIds.push(Number((<HTMLSpanElement>item).title))
    })
    tradeRow.forEach((item) => {
      tradeIds.push(Number((<HTMLSpanElement>item).title))
    })
    console.log(contractorIds)
    console.log(tradeIds)

    let dataWrapper = {}

    let contractorWiseData = []
    contractorIds.forEach(contractor => {

      let staffId = document.getElementById(`staffId_${contractor}`)
      tradeIds.forEach(trade => {
        if (this.type2PersentageData[contractor][trade] && this.type2RandomSampledArea[contractor]) {
          if (this.type2RandomSampledArea[contractor][trade]) {
            let data = {
              projectId: this.SelProject,
              structureId: this.SelStructure,
              fromDate: this.reportDate,
              toDate: this.inspectionDate,
              masterId: this.masterData.masterId,
              cycleOfInspection: this.Selcycle,
              contractorId: contractor,
              staffId: (<HTMLInputElement>staffId).value,
              tradeId: trade,
              samplingType: this.samplingType,
              stageFrom: [this.type2StageData[contractor][trade][0]],
              stageTo: [this.type2StageData[contractor][trade][this.type2StageData[contractor][trade].length - 1]],
              samplUnitPersentage: this.type2PersentageData[contractor][trade],
              sampledUnitNumber: this.type2SampledUnitnumber[contractor][trade],
              randomStages: this.type2RandomSampledArea[contractor][trade]
            }

            contractorWiseData.push(data)
          }
        }



      })
    })

    dataWrapper = {
      clientWise: null,
      contractorWise: contractorWiseData
    }

    console.log(contractorWiseData)
    console.log('step  2----->', this.steptracker.step2.data)

    let step2Data = this.steptracker.step2.data.map(step2 => {
      step2.allocatedArea = ''
      return step2
    })

    this.clientService.addSamplingStepSecond(step2Data)
      .subscribe(data => {
        console.log('Step 2 data Added-->', data)
      })

    this.clientService.submitStep3Data(contractorWiseData)
      .subscribe(data => {
        console.log('step 3 sub,ited-->', data)
      })

  }


  goToGenerateReport() {
    console.log(this.SelProject, this.SelClientId, this.Selcycle, this.location, this.inspectionDate, this.reportDate)
    this.clientService.generateSamplingFinalReport(this.SelClientId, this.SelProject, this.inspectionDate, this.Selcycle, this.reportDate, this.location)
      .subscribe(data => {
        console.log('report generated')
      })
  }
}
