import { Component, OnInit } from '@angular/core';
import { InspectorTraning } from 'src/app/service/inspectionTraining.service';
import { CommonService } from 'src/app/common.service';
import { CycleOfInspection } from 'src/app/ncclosure-sa/ncclosure-sa.component';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-equipment-maintenance-form',
  templateUrl: './equipment-maintenance-form.component.html',
  styleUrls: ['./equipment-maintenance-form.component.css']
})
export class EquipmentMaintenanceFormComponent implements OnInit {


  userId: number = Number(localStorage.getItem('id'))
  equipementList: Array<Object>
  cycles: any = {}
  masterIds: Array<any>

  masterData: any = {
    masterId: '',
    clientId: '',
    projectId: '',
    fromDate: '',
    toDate: '',
    cycleId: '',
    clientName: '',
    projectName: ''
  }

  constructor(
    private inspectionTraining: InspectorTraning,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('id'))

    this.masterData = JSON.parse(localStorage.getItem('mData'))
    console.log(this.masterData)
    this.getMasterDetails(this.masterData.masterId)

    this.inspectionTraining.getUserEquipmentList(this.userId)
      .subscribe(data => {
        console.log(data)
        let srNo = 0
        this.equipementList = data.map(d =>{
          srNo += 1
          return {
            ...d,
            srNo
          }
        })
      })

    this.inspectionTraining.getMasterIdsByUserId(this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterIds = data

      })

  }


  masterID: string
  isDeclarationFormFiled: boolean
  showForm: boolean = false
  loadDeclaration: boolean = false
  message = 'Please fill the declaration from'
  isEquipementFormdata: boolean = false
  equipmentFormData = {}
  getMasterDetails(e) {
    this.loadDeclaration = true
    console.log(e)
    this.masterID = e
    this.inspectionTraining.getMasterDetails(e, this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterData = data[0]
        this.masterData.fromDate = new Date(this.masterData.fromDate).toISOString().substring(0, 10)
        this.masterData.toDate = new Date(this.masterData.toDate).toISOString().substring(0, 10)

        this.inspectionTraining.getEquipmentForm(this.masterID, this.userId)
          .subscribe(data => {
            console.log('pre', data)
            if (data.length) {
              this.isEquipementFormdata = true
              data.forEach(d => {
                this.equipmentFormData[d.equipmentId] = d
              })
            }
            console.log(this.equipmentFormData)
            console.log(this.isEquipementFormdata)
          })

        this.inspectionTraining.checkUserDeclarationForProject(this.userId, this.masterData.projectId)
          .subscribe(data => {
            this.showForm = true
            this.loadDeclaration = false
            console.log(data)
            if (data[0].userStatus) {
              if (data[0].dtmStatus) {
                if (data[0].dtmStatus == 1) {
                  this.isDeclarationFormFiled = true
                }

              } else {
                this.isDeclarationFormFiled = false
                this.message = 'Your approval is pending'
              }
            } else {
              this.isDeclarationFormFiled = false
            }
          })
      })

    this.commonService.getAllCycleOfInspection()
      .subscribe(data => {
        data.forEach(cycle => {
          this.cycles[cycle.cycle_id] = cycle.cycle_name
        })
      })

  }

  submitLoad: boolean = false
  submitEquipmentForm() {
    this.submitLoad = true
    let formData = []
    this.equipementList.forEach((eq: any) => {
      let physicalCondition = document.querySelector(`#physical_condition_${eq.equipmentId}`) as HTMLInputElement
      let analogCondition = document.querySelector(`#analog_condition_${eq.equipmentId}`) as HTMLInputElement
      let batteryCondition = document.querySelector(`#battery_condition_${eq.equipmentId}`) as HTMLInputElement
      let digitalCondition = document.querySelector(`#digital_condition_${eq.equipmentId}`) as HTMLInputElement
      let calibrationCondition = document.querySelector(`#calibration_condition_${eq.equipmentId}`) as HTMLInputElement
      let fesibleCondition = document.querySelector(`#fesible_condition_${eq.equipmentId}`) as HTMLInputElement
      let hingeCondition = document.querySelector(`#hinge_condition_${eq.equipmentId}`) as HTMLInputElement
      let faultCondition = document.querySelector(`#fault_condition_${eq.equipmentId}`) as HTMLInputElement
      let remark = document.querySelector(`#remark_${eq.equipmentId}`) as HTMLInputElement

      let data = {
        masterId: this.masterID,
        userId: this.userId,
        equipmentId: eq.equipmentId,
        assetNo: eq.assetSerialNo,
        physicalConditionOfEqu: physicalCondition.value,
        analogTools: analogCondition.value,
        batteriesForDigitalTool: batteryCondition.value,
        digitalToolsAndEqu: digitalCondition.value,
        validCalibration: calibrationCondition.value,
        validationOfEqu: fesibleCondition.value,
        hingeRevertare: hingeCondition.value,
        noFault: faultCondition.value,
        remark: remark.value
      }

      formData.push(data)

    })

    console.log(formData)

    if (this.isEquipementFormdata) {
      this.inspectionTraining.updateEquipementForm(this.masterID, this.userId, formData)
        .subscribe(data => {
          console.log('updasha', data)
          this.submitLoad = false
        })
    } else {
      this.inspectionTraining.addEquipmentMaintenanceForm(formData)
        .subscribe(data => {
          console.log('form added-->', data)
          this.submitLoad = false

        })
    }
  }

}
