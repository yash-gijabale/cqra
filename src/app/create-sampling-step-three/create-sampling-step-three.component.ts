import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ProjectView } from '../project/project.component';
import { StructureData } from '../wbs/wbs.component';
import { ClientServiceService } from '../service/client-service.service';
import { CycleOfInspection } from '../ncclosure-sa/ncclosure-sa.component';
import { forEach } from '@angular/router/src/utils/collection';

class Steps {
  constructor(
    public data: any,
    public status: boolean,
  ) {

  }
}
export class StepTrackerData {
  constructor(
    public step1: Steps,
    public step2: Steps,
    public step3: Steps
  ) { }
}



@Component({
  selector: 'app-create-sampling-step-three',
  templateUrl: './create-sampling-step-three.component.html',
  styleUrls: ['./create-sampling-step-three.component.css']
})
export class CreateSamplingStepThreeComponent implements OnInit {
  projects: ProjectView[]
  structures: StructureData[]
  SelStructure = 0;
  SelProject = 0
  Selcycle = 0
  fromDate = ''
  toDate = ''
  cycles: CycleOfInspection[]

  sampledUnitPersentage = 5

  step2Data = {}

  testTG = [
    {
      id: 1,
      tradegroupName: 'test 1'
    },
    {
      id: 2,
      tradegroupName: 'test 2'
    },
  ]

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
        tradeId: 57,
        tradeNane: 'trade 57'
      },
    ],

  }


  stageData = {}
  persentageData = {}
  randomSampledArea = {}
  sampledUnitnumber = {}

  constructor(
    private commanService: CommonService,
    private ClientService: ClientServiceService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commanService.getSamplingStepData.subscribe(data => {
      this.step2Data = data.step2.data
      console.log(this.step2Data)
    })

    this.ClientService.getAllProject()
      .subscribe(data => {
        console.log('projects ==>', data)
        this.projects = data;
      })

    this.commonService.getAllCycleOfInspection()
      .subscribe(data => this.cycles = data)


    // for (const key in this.testTrade) {
    //   this.tradeIds.push(...this.testTrade[key])
    // }

    // console.log(this.tradeIds)

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


  lessPersentage(tradeId) {
    if (this.persentageData[tradeId] && this.persentageData[tradeId] > 5) {
      let units = this.persentageData[tradeId] * this.stageData[tradeId].length / 100
      units < 1 ? units = 1 : units = Math.round(units)
      this.sampledUnitnumber[tradeId] = units
      this.persentageData[tradeId] -= 5
      this.tradeTracker = 0

    }
  }

  // stageAreas = []
  getRandomStage(tradeId) {
    let stageAreas = []
    this.allocatedArea = {}
    stageAreas = this.stageData[tradeId]
    console.log('inital stages--',stageAreas)

    let unit = this.sampledUnitnumber[tradeId]

    if (unit === this.stageData[tradeId].length) {
      this.randomSampledArea[tradeId] = this.stageData[tradeId]
      return
    }

    stageAreas.forEach(item => {
      this.allocatedArea[item.stageId] = item
    })

    console.log('allocated area-->',this.allocatedArea)

    let area = []
    for (let i = 1; i <= unit; i++) {
        let keysArray = Object.keys(this.allocatedArea)
        let randomKey = keysArray[Math.floor(Math.random() * keysArray.length)]
        area.push(this.allocatedArea[randomKey])
        delete this.allocatedArea[randomKey]
      }
    
    console.log('random area-->',area)

    this.randomSampledArea[tradeId] = area
      
      console.log(this.randomSampledArea)

    //single click random
    // let randomStage = this.stageAreas[Math.floor(Math.random() * this.stageAreas.length)]
    // if (!this.allocatedArea[tradeId]) {
    //   this.allocatedArea[tradeId] = []
    //   this.allocatedArea[tradeId].push(randomStage)

    //   this.stageAreas = this.stageAreas.filter(stage => {
    //     return stage.stageId != randomStage.stageId
    //   })
    // }

    // let isExist = this.allocatedArea[tradeId] && this.allocatedArea[tradeId].find(stage => {
    //   return stage.stageId === randomStage.stageId ? true : false
    // })
    // if (!isExist) {
    //   if (unit > this.allocatedArea[tradeId].length) {
    //     this.allocatedArea[tradeId].push(randomStage)
    //     this.stageAreas = this.stageAreas.filter(stage => {
    //       return stage.stageId != randomStage.stageId
    //     })
    //   }
    // }
    // console.log(randomStage)
    // console.log('allocated atra random', this.allocatedArea)
    // this.randomSampledArea = this.allocatedArea



    // if (this.tradeTracker != tradeId) {
    //   this.tradeTracker = tradeId
    //   let areas = this.stageData[tradeId]
    //   this.allocatedArea = {}
    //   areas.forEach(area => {
    //     this.allocatedArea[area.stageId] = area
    //   })
    //   console.log('new')
    // }

    // console.log(this.allocatedArea)
    // // return

    // let unit = this.sampledUnitnumber[tradeId]

    // //if unit number and total flats are same then return same object of falts
    // if (unit === this.stageData[tradeId].length) {
    //   console.log(this.stageData[tradeId])
    //   this.randomSampledArea = this.stageData[tradeId]
    //   return
    // }


    // let area = []
    // for (let i = 1; i <= unit; i++) {
    //   let keysArray = Object.keys(this.allocatedArea)
    //   let randomKey = keysArray[Math.floor(Math.random() * keysArray.length)]
    //   area.push(this.allocatedArea[randomKey])
    //   delete this.allocatedArea[randomKey]
    // }
    // this.randomSampledArea[tradeId] = area
    // console.log(this.randomSampledArea)


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
        cycleId: this.Selcycle,
        fromDate: this.fromDate,
        toDate: this.toDate,
        stageFrom: this.stageData[trade][0],
        stageTo: this.stageData[trade][this.stageData[trade].length - 1],
        UnitPersentage: this.persentageData[trade],
        randomStage: this.randomSampledArea[trade]
      }
      newformData.push(formdata)
    })

    console.log(newformData)
  }


}
