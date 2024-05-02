import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generate } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
@Component({
  selector: 'app-test-new-sampling',
  templateUrl: './test-new-sampling.component.html',
  styleUrls: ['./test-new-sampling.component.css']
})
export class TestNewSamplingComponent implements OnInit {


  constructor(
    private _formBuilder: FormBuilder,
    private commanService: CommonService,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService

  ) { }

  masterData: any
  structures: any
  SelStructure: any
  SelClientId: any
  SelProject: any
  selTrade: any
  location: any
  Selcycle: any
  reportDate: any
  inspectionDate: any
  trades: any
  testTG: any
  tradeWiseData: any
  clients: any
  staffData: any
  samplingType = 1;
  pannel = 1

  tradeNameData: any = {}
  cycleOfInspection: any = []
  ngOnInit() {
    this.masterData = JSON.parse(localStorage.getItem('mData'))
    console.log(this.masterData)
    this.getInitialData(this.masterData.projectId, this.samplingType)

  }

  changePannel(type) {
    this.pannel = type
  }

  getSamplingInitialData(e) {
    this.getInitialData(this.masterData.projectId, Number(e.target.value))
  }

  getInitialData(projectId, samplingType) {
    // this.loader = 
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

  contractorDataTradeWise: any
  convertRowObjet(data) {
    let tradeGroupArray = {}
    let tradeObject = {}

    data.forEach(item => {

      this.tradeNameData[item.tradeId] = item.tradeName

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

        tradeGroupArray[item.tradeggroupId] = item.tradeGroupName

        tradeObject[item.tradeggroupId] = []
        let tradeData = {
          tradeId: item.tradeId,
          tradeNane: item.tradeName
        }
        tradeObject[item.tradeggroupId].push(tradeData)
      }
    })


    console.log(tradeObject)
    console.log(tradeGroupArray)
    this.testTG = tradeGroupArray
    this.tradeWiseData = tradeObject

  }

  tradeHeigth = {}

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

    for (const key in contractorObject) {
      this.tradeHeigth[key] = 10 * contractorObject[key].length + 80
    }

    console.log(this.tradeHeigth)

  }

  stages: any
  statusData: any
  stageNameData: any = {}
  workArea: any = {}

  preStep1Data = {}

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
    console.log(this.stageNameData)


    this.clientService.getSamplingStep1Data(this.masterData.masterId, this.SelProject, this.SelStructure)
      .subscribe(data => {
        this.preStep1Data = {}
        this.applicabaleArea = {}
        console.log(data)
        for (const trade in data) {
          if (data[trade].length) {
            let stages = {}
            this.applicabaleArea[trade] = []
            data[trade].forEach(stage => {
              stages[stage.stageId] = true
              this.applicabaleArea[trade].push(stage.stageId)
            })
            this.preStep1Data[trade] = stages
          }
        }

        console.log(this.preStep1Data)
        console.log(this.applicabaleArea)

      })

    this.clientService.getPreSamplingStep2Data(this.masterData.masterId, this.SelProject, this.SelStructure)
      .subscribe(data => {
        console.log("pre step2 data-->", data)
        if (data.length) {

          this.samplingType = Number(data[0].samplingType)
          this.getInitialData(this.SelProject, this.samplingType)
          this.generateStep2PreData(data)
        }
      }, err => {
        console.log(err)
      })

    this.clientService.getPreSamplingStep3Data(this.masterData.masterId, this.SelProject, this.SelStructure)
      .subscribe(data => {
        console.log("pre step 3 data-->", data)
        if (data.length) {

          this.samplingType = Number(data[0].samplingType)
          this.generateStep3PreData(data)
        }
      }, err => {
        console.log(err)
      })
  }

  generateStep2PreData(data) {
    let preStep2Area = {}
    let preCompletedArea = {}

    // console.log()
    //For Step 2 work area
    console.log(data)
    if (data[0].samplingType != 1 ) {
      data.forEach(item => {
        if (preStep2Area[item.tradeId]) {
          if (preStep2Area[item.tradeId][item.contractorId]) {
            preStep2Area[item.tradeId][item.contractorId].push(item.stageId)
          } else {
            preStep2Area[item.tradeId][item.contractorId] = []
            preStep2Area[item.tradeId][item.contractorId].push(item.stageId)
          }
        } else {
          preStep2Area[item.tradeId] = {}
          preStep2Area[item.tradeId][item.contractorId] = []
          preStep2Area[item.tradeId][item.contractorId].push(item.stageId)
        }
      })
    } else {
      data.forEach(item => {
        if (preStep2Area[item.tradeId]) {
          preStep2Area[item.tradeId].push(item.stageId)
        } else {
          preStep2Area[item.tradeId] = []
          preStep2Area[item.tradeId].push(item.stageId)

        }
      })
    }

    //For step 1 completed area
    data.forEach(item => {
      if (preCompletedArea[item.tradeId]) {
        preCompletedArea[item.tradeId].push(item.stageId)
      } else {
        preCompletedArea[item.tradeId] = []
        preCompletedArea[item.tradeId].push(item.stageId)

      }
    })

    console.log("pre step 2 area -->", preStep2Area)
    console.log("pre step 1 complted  -->", preCompletedArea)
    this.step2workArea = preStep2Area
    this.completedStages = preCompletedArea

  }

  preSampledUnitnumber = {}
  preSampledUnitPersentage = {}
  generateStep3PreData(data) {
    //Generating random pre data
    let randomPreData = {}
    data.forEach(item => {
      let stage = {
        stageId: item.stageid,
        stageName: item.stagename
      }

      if (randomPreData[item.contractorid]) {

        if (randomPreData[item.contractorid][item.tradeid]) {
          randomPreData[item.contractorid][item.tradeid].push(stage)
        } else {
          randomPreData[item.contractorid][item.tradeid] = []
          randomPreData[item.contractorid][item.tradeid].push(stage)

        }
      } else {
        randomPreData[item.contractorid] = {}
        randomPreData[item.contractorid][item.tradeid] = []
        randomPreData[item.contractorid][item.tradeid].push(stage)
      }
    })

    console.log('pre stape 3 random', randomPreData)
    this.type2RandomSampledArea = randomPreData

    //Generating Sample Unit Number
    let preSampleUnitNumber = {}
    data.forEach(item => {

      if (preSampleUnitNumber[item.contractorid]) {
        preSampleUnitNumber[item.contractorid][item.tradeid] = item.sampledUnitNumber

      } else {
        preSampleUnitNumber[item.contractorid] = {}
        preSampleUnitNumber[item.contractorid][item.tradeid] = item.sampledUnitNumber
      }
    })
    console.log('pre stape 3 sample unit number', preSampleUnitNumber)
    this.preSampledUnitnumber = preSampleUnitNumber

    //Generating Sample unit persentage
    let prePersentage  = {}
    data.forEach(item => {

      if (prePersentage[item.contractorid]) {
        prePersentage[item.contractorid][item.tradeid] = item.samplUnitPersentage

      } else {
        prePersentage[item.contractorid] = {}
        prePersentage[item.contractorid][item.tradeid] = item.samplUnitPersentage
      }
    })
    console.log('pre stape 3 sample unit percentage', prePersentage)
    // this.persentageData = prePersentage
    this.preSampledUnitPersentage = prePersentage


  }
  applicabaleArea: any = {}
  addApplicableArea(e, tradeId) {
    if (!e.target.checked) {
      let stage = Number(e.target.value)
      let isExist = this.applicabaleArea[tradeId] && this.applicabaleArea[tradeId].find(stageId => {
        return stageId === stage ? true : false
      })

      if (isExist) {
        this.applicabaleArea[tradeId] = this.applicabaleArea[tradeId].filter(stageId => {
          return stageId != stage
        })
      } else {
        this.applicabaleArea[tradeId].push(stage)
      }

      if (this.applicabaleArea[tradeId].length === 0) {
        delete this.applicabaleArea[tradeId]
      }
    } else {
      let stage = Number(e.target.value)
      if (!this.applicabaleArea[tradeId]) {
        this.applicabaleArea[tradeId] = []
      }
      this.applicabaleArea[tradeId].push(stage)
    }
    console.log(this.applicabaleArea)
  }


  completedStages: any = {}
  addCompletedStages(e, tradeId, stageId) {
    if (e.target.value == 1) {
      if (this.completedStages[tradeId]) {
        let isExist = this.completedStages[tradeId].find(stage => {
          return stage == stageId ? true : false
        })
        if (!isExist) {
          this.completedStages[tradeId].push(Number(stageId))
        }

      } else {
        this.completedStages[tradeId] = []
        this.completedStages[tradeId].push(Number(stageId))
      }
    } else {
      if (this.completedStages[tradeId]) {
        this.completedStages[tradeId] = this.completedStages[tradeId].filter(stage => {
          return stage != stageId
        })
      }

      if (this.completedStages[tradeId].length == 0) {
        delete this.completedStages[tradeId]
      }
    }

    console.log(this.completedStages)
  }

  allStepData: any = {}

  submitSamplingStep1() {

    let tradeIds = []
    for (const key in this.applicabaleArea) {
      tradeIds.push(key)
    }

    let sampingData = []

    tradeIds.forEach(trade => {
      let workAreaWithName = []
      this.applicabaleArea[trade] && this.applicabaleArea[trade].forEach(stage => {
        let workAreaName = {
          stageId: stage,
          stageName: this.stageNameData[stage]
        }
        workAreaWithName.push(workAreaName)
      })

      let data = {
        projectId: this.SelProject,
        structureId: Number(this.SelStructure),
        masterId: this.masterData.masterId,
        tradeId: Number(trade),
        // status: (<HTMLSelectElement>statusValue).value,
        workAreaWithName,
        // workArea: this.applicabaleArea[trade] ? this.applicabaleArea[trade] : [],

      }

      sampingData.push(data)

    })

    console.log(sampingData)
    this.allStepData = {
      step1: sampingData
    }

    this.generateDataForStep2()
    this.pannel = 2
  }

  step2formRenderData: any = {}
  tradeGroupRowSpan: any = {}

  generateDataForStep2() {
    for (const key in this.tradeWiseData) {
      this.step2formRenderData[key] = []
      for (const trade of this.tradeWiseData[key]) {
        if (this.completedStages[trade.tradeId] && this.completedStages[trade.tradeId].length) {
          this.step2formRenderData[key].push({
            tradeId: trade.tradeId,
            tradeNane: trade.tradeNane
          })
        }
      }
    }

    for (const key in this.step2formRenderData) {
      if (this.step2formRenderData[key].length == 0) {
        delete this.step2formRenderData[key]
      }
    }

    // calculating rowspan
    if (this.samplingType != 1) {
      for (const key in this.step2formRenderData) {
        let count = Number(this.step2formRenderData[key].length)
        console.log(count)
        this.step2formRenderData[key].forEach(trade => {
          // console.log(this.contractorDataTradeWise[trade].length)
          count += this.contractorDataTradeWise[trade.tradeId] ? Number(this.contractorDataTradeWise[trade.tradeId].length) : 0
        })

        this.tradeGroupRowSpan[key] = count
      }
    }

    console.log(this.step2formRenderData)
    console.log(this.tradeGroupRowSpan)
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

    }

    console.log(this.step2workArea)
  }

  addStep2type1WorkArea(e, tradeId) {
    if (!e.target.checked) {
      //FOR REMOVE STAGE FROM AREA
      let stageId = Number(e.target.value)
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
      let stageId = Number(e.target.value)
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
    console.log(this.step2workArea)

    // console.log(this.allocatedarea)
    // if (Object.keys(this.step2workArea).length != 0) {
    //   this.isStepSecondFormField = true
    // } else {
    //   this.isStepSecondFormField = false

    // }
  }


  contractorAssignedStages = {}
  getAssignStagesByContractor(tradeId, contractorId) {
    if (!this.contractorAssignedStages[contractorId]) {
      this.contractorAssignedStages[contractorId] = {}
      if (!this.contractorAssignedStages[contractorId][tradeId]) {
        this.contractorAssignedStages[contractorId][tradeId] = []
        this.getAssignedStages(contractorId, tradeId)
      }

    } else {
      if (!this.contractorAssignedStages[contractorId][tradeId]) {
        this.contractorAssignedStages[contractorId][tradeId] = []
        this.getAssignedStages(contractorId, tradeId)
      }
    }

  }

  getAssignedStages(contractorId, tradeId) {
    this.clientService.getContratorAssignedStages(this.SelProject, this.SelStructure, contractorId, tradeId)
      .subscribe(data => {
        this.contractorAssignedStages[contractorId][tradeId] = data
        if (!this.step2workArea[tradeId]) {
          this.step2workArea[tradeId] = {}
        }
        if (!this.step2workArea[tradeId].hasOwnProperty(contractorId)) {
          this.step2workArea[tradeId][contractorId] = []
        }

        data.forEach(stage => {
          if (this.completedStages[tradeId].includes(stage)) {
            this.step2workArea[tradeId][contractorId].push(stage)
          }

        })

        console.log(this.contractorAssignedStages)
        console.log(this.step2workArea)
      })
  }

  submitStep2Sampling() {
    let tradeElement = document.querySelectorAll('.step2Tarde')
    let tradeIds = []
    let samplingStep2Data = []
    tradeElement.forEach(t => {
      tradeIds.push((<HTMLTableElement>t).title)
    })
    if (this.samplingType != 1) {
      tradeIds.forEach(tradeId => {

        let contractors = this.contractorDataTradeWise[tradeId] ? this.contractorDataTradeWise[tradeId] : []

        contractors.forEach(contractor => {
          let workAreaWithName = []
          let contractorId = contractor.contractorId
          this.step2workArea[tradeId][contractorId] && this.step2workArea[tradeId][contractorId].forEach(stage => {
            let workAreaName = {
              stageId: stage,
              stageName: this.stageNameData[stage]
            }
            workAreaWithName.push(workAreaName)
          })

          let data = {
            projectId: this.SelProject,
            structureId: Number(this.SelStructure),
            masterId: this.masterData.masterId,
            tradeId: Number(tradeId),
            // status: (<HTMLSelectElement>statusValue).value,
            contractorId: contractorId,
            contractor: contractorId,
            contractorName: contractor.contractorName,
            workAreaWithName,
            staff: 0,
            // allocatedArea: workAreaWithName,
            offerStatus: this.notOfferdArea[tradeId] ? false : true

          }

          samplingStep2Data.push({ ...data, samplingType: Number(this.samplingType) })
        })

      })
    } else if (this.samplingType == 1) {
      console.log(tradeIds)
      tradeIds.forEach(tradeId => {

        // let contractors = this.contractorDataTradeWise[tradeId]

        let workAreaWithName = []
        let contractorId = this.clients[0].clientId
        this.step2workArea[tradeId] && this.step2workArea[tradeId].forEach(stage => {
          let workAreaName = {
            stageId: stage,
            stageName: this.stageNameData[stage]
          }
          workAreaWithName.push(workAreaName)
        })

        let data = {
          projectId: this.SelProject,
          structureId: Number(this.SelStructure),
          masterId: this.masterData.masterId,
          tradeId: Number(tradeId),
          // status: (<HTMLSelectElement>statusValue).value,
          contractorId: contractorId,
          contractor: contractorId,
          contractorName: this.clients[0].clientName,
          workAreaWithName,
          staff: 0,
          // allocatedArea: workAreaWithName,
          offerStatus: this.notOfferdArea[tradeId] ? false : true

        }

        samplingStep2Data.push({ ...data, samplingType: Number(this.samplingType) })

      })
    }

    console.log(samplingStep2Data)

    this.genarateDataForStep3(samplingStep2Data)
    this.allStepData['step2'] = samplingStep2Data
    this.pannel = 3

  }

  notOfferdArea = {}
  setNotOfferedArea(e, tradeId) {
    if (e.target.checked) {
      this.notOfferdArea[tradeId] = true
    } else {
      delete this.notOfferdArea[tradeId]
    }
  }


  // STEP 3
  step3RenderData = {}
  sampledUnitPersentage = 5
  persentageData = {}
  randomSampledArea = {}
  sampledUnitnumber = {}
  step3Stages = {}
  type2RandomSampledArea = {}
  genarateDataForStep3(step2Data) {
    // let tempData = {}
    this.step3RenderData = {}
    console.log('sdfsdfsd-->', step2Data)
    step2Data.forEach(data => {
      if (data.workAreaWithName.length && data.offerStatus == true) {
        if (this.step3RenderData[data.contractorId]) {
          if (!this.step3RenderData[data.contractor].samplingData[data.tradeId]) {
            this.step3RenderData[data.contractorId].samplingData[data.tradeId] = data
          }

        } else {
          this.step3RenderData[data.contractor] = {
            contractorId: data.contractor,
            contractorName: data.contractorName,
            staffId: data.staff,
            samplingData: {}
          }
          if (!this.step3RenderData[data.contractor].samplingData[data.tradeId]) {
            this.step3RenderData[data.contractor].samplingData[data.tradeId] = data
          }
        }
      }
    })

    console.log(this.step3RenderData)

    if (this.samplingType != 1 || this.samplingType == 1) {
      // generating persentage data
      for (const key in step2Data) {
        let data = step2Data[key]
        if (data.workAreaWithName.length) {
          let contractorId = data.contractorId
          let tradeId = data.tradeId
          if (this.persentageData[contractorId]) {
            this.persentageData[contractorId][tradeId] = this.preSampledUnitPersentage[contractorId] ? this.preSampledUnitPersentage[contractorId][tradeId] : 5

            this.step3Stages[contractorId][tradeId] = data.workAreaWithName

          } else {
            this.persentageData[contractorId] = {}
            this.persentageData[contractorId][tradeId] = this.preSampledUnitPersentage[contractorId] ? this.preSampledUnitPersentage[contractorId][tradeId] : 5

            this.step3Stages[contractorId] = {}
            this.step3Stages[contractorId][tradeId] = data.workAreaWithName

          }


        }
      }

      //Generating SampleUnit number
      for (const key in step2Data) {
        let data = step2Data[key]
        if (data.workAreaWithName.length) {
          let contractorId = data.contractorId
          let tradeId = data.tradeId
          let units = this.persentageData[contractorId][tradeId] * this.step3Stages[contractorId][tradeId].length / 100
          units < 1 ? units = 1 : units = Math.round(units)

          if (this.sampledUnitnumber[contractorId]) {
            this.sampledUnitnumber[contractorId][tradeId] = this.preSampledUnitnumber[contractorId] ? this.preSampledUnitnumber[contractorId][tradeId] : units

          } else {
            this.sampledUnitnumber[contractorId] = {}
            this.sampledUnitnumber[contractorId][tradeId] = this.preSampledUnitnumber[contractorId] ? this.preSampledUnitnumber[contractorId][tradeId] :  units
          }
        }
      }
      console.log(this.persentageData)
      console.log(this.step3Stages)
      console.log(this.sampledUnitnumber)
    }
  }

  addPercentage(contractorId, tradeId, type) {
    console.log(contractorId, tradeId, type)
    let trade = Number(tradeId)
    if (this.persentageData[contractorId][trade]) {

      if (type == 'add' && this.persentageData[contractorId][trade] < 100) {
        this.persentageData[contractorId][trade] += 5
      }

      if (type == 'less' && this.persentageData[contractorId][trade] > 5) {
        this.persentageData[contractorId][trade] -= 5
      }

      let units = this.persentageData[contractorId][trade] * this.step3Stages[contractorId][trade].length / 100
      units < 1 ? units = 1 : units = Math.round(units)
      this.sampledUnitnumber[contractorId][trade] = units
    }

    console.log(this.sampledUnitnumber)
    console.log(this.persentageData)
  }

  type2GetRandomStage(contractorId, trade) {
    let tradeId = Number(trade)
    console.log(contractorId, tradeId)
    let stageAreas = []
    console.log(contractorId, tradeId)
    let allocatedArea = {}
    stageAreas = this.step3Stages[contractorId][tradeId]
    console.log('inital stages--', stageAreas)

    let unit = this.sampledUnitnumber[contractorId][tradeId]

    if (unit === this.step3Stages[contractorId][tradeId].length) {
      this.type2RandomSampledArea[contractorId] = { ...this.type2RandomSampledArea[contractorId] }
      this.type2RandomSampledArea[contractorId][tradeId] = this.step3Stages[contractorId][tradeId]
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
    let finalData = []

    for (const contractor in this.step3RenderData) {

      for (const trade in this.step3RenderData[contractor].samplingData) {
        let data = {
          projectId: this.SelProject,
          structureId: this.SelStructure,
          fromDate: this.reportDate,
          toDate: this.inspectionDate,
          masterId: this.masterData.masterId,
          cycleOfInspection: this.Selcycle,
          contractorId: contractor,
          tradeId: trade,
          samplingType: this.samplingType,
          stageFrom: [this.step3Stages[contractor][trade][0]],
          stageTo: [this.step3Stages[contractor][trade][this.step3Stages[contractor][trade].length - 1]],
          samplUnitPersentage: this.persentageData[contractor][trade],
          sampledUnitNumber: this.sampledUnitnumber[contractor][trade],
          randomStages: this.type2RandomSampledArea[contractor][trade]
        }

        finalData.push(data)
      }

    }

    console.log(finalData)
    this.allStepData['step3'] = finalData
    console.log('all data ->', this.allStepData)

    this.clientService.addSamplingStepFirst(this.allStepData['step1'])
      .subscribe(data => {
        console.log('Step 1 data Added-->', data)
      })

    this.clientService.addSamplingStepSecond(this.allStepData['step2'])
      .subscribe(data => {
        console.log('Step 2 data Added-->', data)
      })

    this.clientService.submitStep3Data(finalData)
      .subscribe(data => {
        console.log('step 3 sub,ited-->', data)
        // this.type2Step3submitLoad = false
      })
  }

}


