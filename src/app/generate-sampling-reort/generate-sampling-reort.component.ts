import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { ClientData } from '../client/client.component';
@Component({
  selector: 'app-generate-sampling-reort',
  templateUrl: './generate-sampling-reort.component.html',
  styleUrls: ['./generate-sampling-reort.component.css']
})
export class GenerateSamplingReortComponent implements OnInit {

  SelClient: string
  SelProject: string
  inspectionDate: string
  Selcycle: string
  reportDate: string
  cycles: any = []

  projects: ProjectData[]
  clients: ClientData[]

  isLoading = false
  isShow = false

  constructor(
    private commanService: CommonService,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients()
      .subscribe(data => {
        this.clients = data
      })

    this.commanService.getAllCycleOfInspection()
      .subscribe(data => {
        this.cycles = data
      })

  }

  getProject() {

    this.commanService.getClientProject(this.SelClient)
      .subscribe(data => {
        this.projects = data
      })


  }

  getStep3RowData() {
    this.isLoading = true
    console.log(this.SelProject)
    this.clientService.getDataFromGenearteSamplingStep4(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.genearetDataForUse(data)
        this.isLoading = false
        this.isShow = true
      })
  }

  stageObject = {}
  contractors = {}
  tradeData = {}
  contractorWithStage = {}
  genearetDataForUse(data) {
    //stage data
    let rowStageData = data.stages
    rowStageData.forEach(data => {
      this.stageObject[data[0].clientwiseId] = data
    })
    console.log('-->stage dat', this.stageObject)


    //tradegroup object
    let rowTradeData = data.Step3
    let tradeGroupData = {}
    rowTradeData.forEach(data => {
      tradeGroupData[data.tradeGroupId] = {
        tradeGroupName: data.tradeGroupName,
        trade: []
      }

    })

    rowTradeData.forEach(data => {
      tradeGroupData[data.tradeGroupId].trade.push({
        tradeId: data.tradeId,
        tradeName: data.tradeName
      })
    })

    console.log('trade group-->', tradeGroupData)
    this.tradeData = tradeGroupData


    //contractor data 
    let contractorData = {}
    rowTradeData.forEach(data => {
      contractorData[data.contractorId] = {
        contractorId: data.contractorId,
        contractorName: data.contractorName
      }
    })
    console.log('contractor data-->', contractorData)
    this.contractors = contractorData


    //contractor data stage wise
    let contractorStage = {}
    rowTradeData.forEach(data => {
      if (contractorStage[data.contractorId] && contractorStage[data.contractorId][data.tradeId]) {
        this.stageObject[data.id].forEach(stage => {
          contractorStage[data.contractorId][data.tradeId].push(stage)
        })

      } else {
        if (contractorStage[data.contractorId]) {
          contractorStage[data.contractorId][data.tradeId] = []
          contractorStage[data.contractorId][data.tradeId] = [...this.stageObject[data.id]]
        } else {
          contractorStage[data.contractorId] = {}
          contractorStage[data.contractorId][data.tradeId] = []
          contractorStage[data.contractorId][data.tradeId] = [...this.stageObject[data.id]]
        }
      }
    })

    console.log(contractorStage)
    this.contractorWithStage = contractorStage

  }




  tradeDataContractor = {}
  structureByTrade = {}
  stageByTrade = {}
  isContractorShow = false
  contractorName = ''
  getContractorData(contractorId) {
    this.clientService.getContractorSamplingData(contractorId, this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.generateDataForContractor(data)
        this.isContractorShow = true
      })

  }
  generateDataForContractor(data) {
    //tradegroup object
    let RrowData = data
    let rowTradeData = data.Step3
    this.contractorName = rowTradeData[0].contractorName
    let tradeGroupData = {}
    rowTradeData.forEach(data => {
      tradeGroupData[data.tradeGroupId] = {
        tradeGroupName: data.tradeGroupName,
        trade: []
      }

    })

    rowTradeData.forEach(data => {
      tradeGroupData[data.tradeGroupId].trade.push({
        tradeId: data.tradeId,
        tradeName: data.tradeName
      })
    })

    console.log('trade group contractor-->', tradeGroupData)
    this.tradeDataContractor = tradeGroupData


    //structure data
    rowTradeData = data.Step3
    let strucutreData = {}
    rowTradeData.forEach(data => {
      let key = `Structure${data.id}`
      console.log(key)
      strucutreData[data.tradeId] = {
        structureId: RrowData[key][0].structureId,
        structureName: RrowData[key][0].structureName
      }

      let a = this.stageByTrade[data.tradeId] ? [...this.stageByTrade[data.tradeId]] : []
      RrowData[key].forEach(stage => {
        a.push(stage)
      })

      this.stageByTrade[data.tradeId] = a
      // this.stageByTrade[data.tradeId].push(...RrowData[key])
    })
    console.log(strucutreData)
    this.structureByTrade = strucutreData
  }

}
