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
  tradeGroups: TradeGroup[]
  clients: ClientData[]
  trades: any
  questionGroup: QuestionGroupView
  samplingForm: FormGroup;
  stages: StageData[]
  structures: any
  SelStructure: any
  SelClientId: any
  SelProject: any
  SelStage: any
  selTrade: any
  submitted = false

  contratorData: ContractorData[]
  staffData: clientStaffData


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
    {
      id: 1,
      tradegroupName: 'test 1'
    },
    {
      id: 2,
      tradegroupName: 'test 2'
    },
    {
      id: 3,
      tradegroupName: 'test 3'
    }
  ]

  // tgTds = [1, 2, 3]

  testTrade = {
    1: [
      {
        tradeId: 23,
        tradeNane: 'trade 1'
      },
      {
        tradeId: 24,
        tradeNane: 'trade 2'
      }
    ],
    2: [
      {
        tradeId: 56,
        tradeNane: 'trade 56'
      },
      {
        tradeId: 54,
        tradeNane: 'trade 54'
      },
      {
        tradeId: 57,
        tradeNane: 'trade 57'
      },
    ],
    3: [
      {
        tradeId: 566,
        tradeNane: 'trade 566'
      },

    ]
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
  isStepFirstFormField: boolean = false
  isStepSecondFormField: boolean = false
  title = "step1"
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
    })

  }

  get f() {
    return this.samplingForm.controls;
  }


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

    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(
        data => {
          console.log('trades-->', data)
          this.trades = data
        }
      )

    this.commanService.getAllContractors().subscribe(data => this.contratorData = data)
    this.clientService.getClientStaffByProjectId(22).subscribe(data => this.staffData = data)
  }
  getStages() {
    this.statusData = [
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


  samplingStep1Submit() {

    // console.log(Object.keys(this.allocatedarea).length)

    let stautsSelect = document.querySelectorAll('.tradename')
    this.tradeIds = []
    let newformData = []
    stautsSelect.forEach((item) => {
      this.tradeIds.push(Number((<HTMLSpanElement>item).title))
    })
    console.log(this.tradeIds)
    this.tradeIds.forEach((item) => {
      let statusValue = document.querySelector(`.tradeStatusSelect_${item}`)
      let contractorValue = document.querySelector(`.contractorSelect_${item}`)
      let staffValue = document.querySelector(`.staffSelect_${item}`)
      // console.log()
      newformData.push(
        {
          projectId: this.SelProject,
          structureId: this.SelStructure,
          tradeId: item,
          status: (<HTMLSelectElement>statusValue).value,
          contractor: (<HTMLSelectElement>contractorValue).value,
          staff: (<HTMLSelectElement>staffValue).value,
          allocatedArea: this.allocatedarea[item] ? this.allocatedarea[item] : []
        })
    })
    // console.log(newformData)
    this.steptracker.step1.data = newformData
    console.log(this.steptracker)

    this.steptracker.step2.status = true
    if (this.steptracker.step2.status) {
      this.generateDataForStep2(this.steptracker.step1.data)
      this.title = "step2"
    }

    // return

    // this.submitted = true;

    // if (this.samplingForm.invalid) {
    //   return;
    // }

    // let formData = {
    //   projectId: this.samplingForm.value.projectId,
    //   tradeGroupId: this.samplingForm.value.tradeGroupId,
    //   tradeId: this.samplingForm.value.tradeId,
    //   structureId: this.samplingForm.value.structureId,
    //   completePercentage: this.samplingForm.value.completePercentage,
    //   stageId: this.samplingForm.value.stageId.toString()
    // }
    // console.log(JSON.stringify(formData))
    // // return

    // if (this.samplingId != -1) {
    //   this.clientService.updateSampling(formData, this.samplingId)
    //     .subscribe(
    //       data => console.log('updated', data),
    //       err => console.log(err)
    //     )
    // } else {
    //   this.clientService.createSampling(formData)
    //     .subscribe(data => {
    //       console.log(data)
    //     },
    //       err => console.log(err)
    //     )
    // }
  }

  // getStructure(){
  //   console.log(this.SelProject)
  //   this.commanService.getStructures(this.SelClientId,this.SelProject)
  //   .subscribe(
  //     (data) => {
  //     console.log('Structure Data==',data)
  //     this.structures= data;

  //   }, (err) => {
  //     console.log('-----> err', err);
  //   })
  // }


  addStageToArea(e, tradeId) {
    // console.log(tradeId)
    // let selectedStages = []
    // let stageIds = document.querySelectorAll(`.stagesCheckbox_${tradeId}`)
    if (!e.target.checked) {
      //FOR REMOVE STAGE FROM AREA
      let stageId = e.target.value
      let isExist = this.allocatedarea[tradeId] && this.allocatedarea[tradeId].find(stage => {
        return stage === stageId ? true : false
      })
      if (isExist) {
        this.allocatedarea[tradeId] = this.allocatedarea[tradeId].filter(stage => {
          return stage != stageId
        })
      }
      if (this.allocatedarea[tradeId].length === 0) {
        delete this.allocatedarea[tradeId]
      }
    } else {
      //FOR ADD STAGE FROM AREA
      let stageId = e.target.value
      let isExist = this.allocatedarea[tradeId] && this.allocatedarea[tradeId].find(stage => {
        return stage === stageId ? true : false
      })
      if (!isExist) {
        // selectedStages.push()
        if (this.allocatedarea[tradeId]) {
          this.allocatedarea[tradeId].push(stageId)
        } else {
          this.allocatedarea[tradeId] = []
          this.allocatedarea[tradeId].push(stageId)
        }
      }
    }
    // stageIds.forEach(item => {
    //   if ((<HTMLInputElement>item).checked) {
    //     let stageId = (<HTMLInputElement>item).value
    //     let isExist = this.allocatedarea[tradeId] && this.allocatedarea[tradeId].find(stage => {
    //       return stage === stageId ? true : false
    //     })
    //     if (!isExist) {
    //       // selectedStages.push()
    //       if (this.allocatedarea[tradeId]) {
    //         this.allocatedarea[tradeId].push(stageId)
    //       } else {
    //         this.allocatedarea[tradeId] = []
    //         this.allocatedarea[tradeId].push(stageId)
    //       }
    //     }
    //   }
    // })
    console.log(this.allocatedarea)
    if (Object.keys(this.allocatedarea).length != 0) {
      this.isStepFirstFormField = true
    } else {
      this.isStepFirstFormField = false

    }
  }

  generateDataForStep2(step1Data) {
    this.step2formRenderData
    step1Data.forEach(data => {
      if (data.status != 'notStarted' && data.status != 'na') {
        this.step2StatusData
        [data.tradeId] = {
          id: data.status,
          name: data.status
        }
      }
    })

    for (const key in this.testTrade) {

      this.step2formRenderData[key] = []
      for (const trade of this.testTrade[key]) {
        if (this.step2StatusData
        [trade.tradeId]) {
          this.step2formRenderData[key].push({
            tradeId: trade.tradeId,
            tradeNane: trade.tradeNane
          })
        }
      }
    }

    console.log(this.step2formRenderData)
    console.log(this.step2StatusData)

  }


  samplingStep2Submit() {
    let stautsSelect = document.querySelectorAll('.step2Tradename')
    this.tradeIds = []
    let newformData = []
    stautsSelect.forEach((item) => {
      this.tradeIds.push(Number((<HTMLSpanElement>item).title))
    })
    console.log(this.tradeIds)
    this.tradeIds.forEach((item) => {
      let statusValue = document.querySelector(`.step2TradeStatusSelect_${item}`)
      // console.log()
      newformData.push(
        {
          projectId: this.SelProject,
          structureId: this.SelStructure,
          tradeId: item,
          status: (<HTMLSelectElement>statusValue).value,
          workArea: this.workArea[item] ? this.workArea[item] : []
        })
    })

    console.log(newformData)
  }

  addStep2WorkArea(e, tradeId) {
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
          this.workArea[tradeId].push(stageId)
        } else {
          this.workArea[tradeId] = []
          this.workArea[tradeId].push(stageId)
        }
      }
    }


    if (Object.keys(this.workArea).length != 0) {
      this.isStepSecondFormField = true
    } else {
      this.isStepSecondFormField = false

    }
  }

}
