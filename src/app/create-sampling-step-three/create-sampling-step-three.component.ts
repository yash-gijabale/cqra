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

  type2step3data = {}
  type2StageData = {}
  type2PersentageData = {}
  type2RandomSampledArea = {}
  type2SampledUnitnumber = {}

  samplingType = 1

  constructor(
    private commanService: CommonService,
    private ClientService: ClientServiceService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commanService.getSamplingStepData.subscribe(data => {
      this.step2Data = data.step2.data
      console.log(this.step2Data)
      if (this.step2Data[0].samplingType === 2) {
        this.samplingType = 2;
        this.genarateDataForSamplingType2(this.step2Data)
      }
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

  type2addPersentage(contractorId, tradeId){
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

  type2lessPersentage(contractorId, tradeId){
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
    let stageAreas = []
    let allocatedArea = {}
    stageAreas = this.type2StageData[contractorId][tradeId]
    console.log('inital stages--', stageAreas)

    let unit = this.type2SampledUnitnumber[contractorId][tradeId]

    if (unit === this.type2StageData[contractorId][tradeId].length) {
      this.type2RandomSampledArea[contractorId][tradeId] = this.type2StageData[contractorId][tradeId]
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

    console.log('random area-->', area )
    let randomstages = {...this.type2RandomSampledArea[contractorId]}

    randomstages[tradeId] = area 
    this.type2RandomSampledArea[contractorId]= randomstages

    console.log('type 2 random area-->',this.type2RandomSampledArea)

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


  genarateDataForSamplingType2(samplingData) {
    // let samplingData2 = []

    let tempData = {}
    samplingData.forEach(data => {

      if (!tempData[data.contractor]) {
        tempData[data.contractor] = {
          contractorId: data.contractor,
          contractorName: data.contractorName,
          samplingData: [data]
        }
      } else {
        tempData[data.contractor].samplingData.push(data)
      }

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
      samplingData.forEach(data => {
        tradeData[data.tradeId] = data.allocatedArea
        persentageData[data.tradeId] = this.sampledUnitPersentage
      })

      this.type2StageData[key] = tradeData
      this.type2PersentageData[key] = persentageData
    }


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



  }

  Type2submitStep3Data(){
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
  }

}
