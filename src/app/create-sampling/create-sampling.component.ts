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

  tgTds = [1, 2, 3]

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

  allocatedarea = {

  }

  constructor(
    private commanService: CommonService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {

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
  }
  getStages() {
    this.commanService.getStagesByStructureId(this.SelStructure)
      .subscribe(
        data => {
          this.stages = data
          console.log(this.stages)
        }
      )
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
  onSubmit() {

    let stautsSelect = document.querySelectorAll('.tradename')
    let tradeIds = []
    let newformData = []
    stautsSelect.forEach((item) => {
      tradeIds.push(Number((<HTMLSpanElement>item).title))
    })
    console.log(tradeIds)
    tradeIds.forEach((item) => {
      let statusValue = document.querySelector(`.tradeStatusSelect_${item}`)
      // console.log()
      newformData.push(
        {
          tradeId: item,
          status: (<HTMLSelectElement>statusValue).value,
          allocatedArea: this.allocatedarea[item] ? this.allocatedarea[item] : []
        })
    })
    console.log(newformData)
    return

    this.submitted = true;

    if (this.samplingForm.invalid) {
      return;
    }

    let formData = {
      projectId: this.samplingForm.value.projectId,
      tradeGroupId: this.samplingForm.value.tradeGroupId,
      tradeId: this.samplingForm.value.tradeId,
      structureId: this.samplingForm.value.structureId,
      completePercentage: this.samplingForm.value.completePercentage,
      stageId: this.samplingForm.value.stageId.toString()
    }
    console.log(JSON.stringify(formData))
    // return

    if (this.samplingId != -1) {
      this.clientService.updateSampling(formData, this.samplingId)
        .subscribe(
          data => console.log('updated', data),
          err => console.log(err)
        )
    } else {
      this.clientService.createSampling(formData)
        .subscribe(data => {
          console.log(data)
        },
          err => console.log(err)
        )
    }
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


  addStageToArea(tradeId) {
    console.log(tradeId)
    // let selectedStages = []
    let stageIds = document.querySelectorAll(`.stagesCheckbox_${tradeId}`)
    stageIds.forEach(item => {
      if ((<HTMLInputElement>item).checked) {
        let stageId = (<HTMLInputElement>item).value
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
    })
    console.log(this.allocatedarea)
  }
}
