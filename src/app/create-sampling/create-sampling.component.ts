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

  samplingId: number
  projects: ProjectView[]
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
  SelContractorId: number
  samplingType = 1;
  submitted = false

  contratorData: ContractorData[]
  staffData: clientStaffData
  tradeRowData: TradeRowDataForSamplingStep
  contractorDataTradeWise = {}


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
    // {
    //   id: 1,
    //   tradegroupName: 'test 1'
    // },
    // {
    //   id: 2,
    //   tradegroupName: 'test 2'
    // },
    // {
    //   id: 3,
    //   tradegroupName: 'test 3'
    // }
  ]

  // tgTds = [1, 2, 3]

  testTrade = {
    // 1: [
    //   {
    //     tradeId: 23,
    //     tradeNane: 'trade 1'
    //   },
    //   {
    //     tradeId: 24,
    //     tradeNane: 'trade 2'
    //   }
    // ],
    // 2: [
    //   {
    //     tradeId: 56,
    //     tradeNane: 'trade 56'
    //   },
    //   {
    //     tradeId: 54,
    //     tradeNane: 'trade 54'
    //   },
    //   {
    //     tradeId: 57,
    //     tradeNane: 'trade 57'
    //   },
    // ],
    // 3: [
    //   {
    //     tradeId: 566,
    //     tradeNane: 'trade 566'
    //   },

    // ]
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
  constructor(
    private commanService: CommonService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    console.log(this.allocatedarea)

    this.samplingId = this.route.snapshot.params['id']

    if (this.samplingId != -1) {
      let samplingData;
      this.clientService.retriveSampling(this.samplingId)
        .pipe(first())
        .subscribe(
          data => {
            samplingData = data
            console.log(data)
            this.commanService.getStructureByProjectId(samplingData.projectId).subscribe(data => this.structures = data)

            this.tradeService.getProjectTrades(samplingData.projectId).subscribe(data => this.trades = data, err => console.log(err))

            this.commanService.getStagesByStructureId(samplingData.structureId).subscribe(data => this.stages = data)

            this.tradeService.getQuestionGroupBytradeId(samplingData.tradeId).subscribe(data => this.questionGroup = data)

            this.samplingForm.patchValue(data)
          },
          err => console.log(err))
    }

    this.clientService.getAllProject()
      .subscribe(data => {
        console.log('projects ==>', data)
        this.projects = data;
      })


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

  get f() {
    return this.samplingForm.controls;
  }


  getStructure() {
    console.log(this.SelProject)
    console.log(this.samplingType)
    this.commanService.getStructureByProjectId(this.SelProject)
      .subscribe(
        (data) => {
          console.log('Structure Data==', data)
          this.structures = data;

        }, (err) => {
          console.log('-----> err', err);
        })

    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(
        data => {
          console.log('trades-->', data)
          this.trades = data
        }
      )


    if (this.samplingType === 1) {
      // console.log('hh')
      // this.clientService.getAllClients().subscribe(data => {
      //   console.log('Clinet data-->', data)
      //   this.clients = data
      // })

      this.clientService.getClientByProjectId(this.SelProject)
        .subscribe(data => this.clients = data)

    } else {
      this.clientService.getContractorsForSamplingStep(this.SelProject)
        .subscribe(data => {
          console.log(data);
          this.convertContractorRowObjet(data)
        })

      this.clientService.getClientStaffByProjectId(this.SelProject).subscribe(data => this.staffData = data)
    }


    this.clientService.getTradesForSamplingStepFirst(this.SelProject)
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
    if (!e.target.checked) {
      //FOR REMOVE STAGE FROM AREA
      let stageId = e.target.value
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
        tradeId: item,
        status: (<HTMLSelectElement>statusValue).value,
        contractorId: (<HTMLSelectElement>contractorValue).value,
        staff: (<HTMLSelectElement>staffValue).value,
        workAreaWithName
      }

      newformData.push({
        ...data,
        allocatedArea: this.step2workArea[item] ? this.step2workArea[item] : [],
      })

      samplingStepFirstSubmitData.push({...data, samplingType:this.samplingType})
    })
    // console.log(newformData)
    this.steptracker.step2.data = newformData
    console.log('sampling step 2-->',samplingStepFirstSubmitData)
    this.clientService.addSamplingStepSecond(samplingStepFirstSubmitData)
      .subscribe(data => {
        console.log('Step 2 data Added-->', data)
      })

    this.commanService.setSamplingStepData(this.steptracker)
    this.isThirdStep = true


    // this.steptracker.step2.status = true
    // if (this.steptracker.step2.status) {
    //   this.generateDataForStep2(this.steptracker.step1.data)
    //   this.title = "step2"
    // }
  }


  step2workArea = {}
  addStep2WorkArea(e, tradeId) {
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



}
