import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { UserView } from '../user-log/user-log.component';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";

import { InspectorTraning } from '../service/inspectionTraining.service';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';


// import SignaturePad from 'signature_pad';

export class AssestView {
  constructor(
    public id: number,
    public assetName: string,
  ) {

  }
}

export class AssetListView {
  constructor(
    public id: number,
    public assetTypeId: number,
    public assetName: string,
    public userBy: string,
    public cost: number,
    public asset_type_name: String
  ) {

  }
}


export class EquipmentView {
  constructor(
    public equipmentId: number,
    public assetName: string,
    public id: number,
    public description: string,
    public assetSerialNo: string,
    public remark: string,
    public dateOfCalibration: string,
    public assignTo: number,
    public assignedBy: number,
    public dateOfAssign: string,
    public cqraAssetId: string,
    public status: boolean,
    public eImage: string,
    public ccImage: string
  ) { }
}

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Array<Object>> = new Subject<Array<Object>>();

  equipmentForm: FormGroup

  newAssetForm: FormGroup

  users: UserView[]
  assets: AssestView
  allAssetlist: Array<any>
  equipmentId: number
  signPad: any

  isLoading: boolean = false

  equipemtData: any

  usedBy: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private commanService: CommonService,
    private userService: UserService,
    private route: ActivatedRoute,
    private inspectionTraning: InspectorTraning,
    private snakBar: SnackBarComponent


  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };
    this.equipmentId = this.route.snapshot.params['id']

    this.equipmentForm = this.formBuilder.group({
      id: ['', Validators.required],
      assetName: ['', Validators.required],
      assetSerialNo: ['', Validators.nullValidator],
      dateOfCalibration: ['', Validators.required],
      assignTo: ['', Validators.required],
      assignedBy: ['', Validators.required],
      cqraAssetId: ['', Validators.required],
      cost: ['', Validators.required]
      // dateOfAssign: ['', Validators.required],
    })

    this.newAssetForm = this.formBuilder.group({
      assetTypeId: ['', Validators.required],
      assetName: ['', Validators.required],
      cost: ['', Validators.required],
      description: ['', Validators.required],
      remark: ['', Validators.required],

    })

    if (this.equipmentId != -1) {
      this.isLoading = true
      this.userService.retriveEquipemnt(this.equipmentId)
        .pipe(first())
        .subscribe(data => {
          this.isLoading = false
          console.log(data)
          this.equipemtData = data
          this.userService.getEquipmentByAssetType(data.id)
            .subscribe(x => {
              console.log(x)
              this.assetsData = x
            })
          this.equipmentForm.patchValue(data)
          this.equipmentForm.patchValue({ dateOfCalibration: new Date(data.dateOfCalibration).toISOString().substring(0, 10) })

        })

    }

    this.commanService.getAllUsers()
      .subscribe(data => {
        this.users = data
      })

    this.userService.getAllAssetes()
      .subscribe(data => this.assets = data)

    // let canas = document.querySelector('#signature') as HTMLCanvasElement
    // this.signPad = new SignaturePad(canas);
  }



  submitLoad = false
  imageToLarge: boolean = false
  imageWarning = {
    eimage: false,
    cimage: false
  }
  imageMessage = 'File size must less than 1MB !'
  onSubmit() {
    this.submitLoad = true
    this.imageWarning.eimage = false
    this.imageWarning.cimage = false
    console.log(this.equipmentForm.value)
    let formData = { ...this.equipmentForm.value, status: true }
    let image1 = document.querySelector('#image1') as HTMLInputElement
    let image2 = document.querySelector('#image2') as HTMLInputElement
    let img1: File = image1.files[0]
    let img2: File = image2.files[0]

    if (img1 && img1.size > 1048576) {
      this.imageWarning.eimage = true
      this.submitLoad = false
      return
    }

    if (img2 && img2.size > 1048576) {
      this.imageWarning.cimage = true
      this.submitLoad = false
      return
    }

    let fileData = {
      img1,
      img2
    }

    console.log(fileData)
    // return

    if (this.equipmentId != -1) {
      this.userService.updateEquipemt(formData, this.equipmentId)
        .subscribe(data => {
          console.log('updated==>', data)
          this.submitLoad = false
          let equipment: any = data
          this.snakBar.showSuccess('Equipment updated')
        }, err => {
          this.submitLoad = false
          this.snakBar.showSnackError()
        })

      if (img1 && img2) {
        this.inspectionTraning.uploadEquipment(this.equipmentId, fileData).subscribe(data => {
          console.log('updaloa', data)
          this.snakBar.showSuccess('Image uploaded')
        })
      }

    } else {

      this.userService.addEquipment(formData)
        .subscribe(data => {
          console.log('equipment addded-->', data)
          this.submitLoad = false
          let equipment: any = data
          this.inspectionTraning.uploadEquipment(equipment.equipmentId, fileData).subscribe(data => {
            console.log('updaloa', data)
          })
          this.snakBar.showSuccess('Equipmwnt created')
        }, err => {
          this.submitLoad = false
          this.snakBar.showSnackError()
        })

    }
  }



  newAssetLoad: boolean = false
  addNewAsset() {
    this.newAssetLoad = true
    // let usedBy = []
    let check = document.querySelectorAll('.usedBy')
    check.forEach(c => {
      let checkbox = <HTMLInputElement>c
      if (checkbox.checked) {
        this.usedBy.push(checkbox.value)
      }
    })

    let formData = { ...this.newAssetForm.value, userBy: this.usedBy.toString() }
    console.log(formData)
    // return
    if (this.isUpdate) {
      this.userService.updateAsset(this.assetId, formData)
        .subscribe(data => {
          console.log('data updated', data)
          this.newAssetLoad = false
          this.snakBar.showSuccess('Asset updated successfully')
        }, err => {
          this.snakBar.showSnackError()
        })
    } else {
      this.userService.newAsset(formData)
        .subscribe(data => {
          console.log('aded', data)
          this.newAssetLoad = false
          this.snakBar.showSuccess('Asset added successfully')
          this.resetForm()
        }, err => {
          this.snakBar.showSnackError()
        })
    }
  }

  assetData: any = {}
  isUpdate: boolean = false
  assetId: number
  getAssetData(assetId) {
    this.assetId = assetId
    this.userService.getAssetById(assetId)
      .subscribe(data => {
        this.isUpdate = true
        data.userBy = data.userBy.split(',')
        this.assetData = data
        // this.assetData.userBy = this.assetData.userBy.split(',')
        console.log(this.assetData)
        this.newAssetForm.patchValue(this.assetData)
      })
  }

  assetListLoad = false
  assetList() {
    this.assetListLoad = true
    this.userService.getAssetsList()
      .subscribe(data => {
        // this.dtTrigger.next()

        this.assetListLoad = false
        let srNo = 0
        this.allAssetlist = data.map(d => {
          srNo += 1
          let usedBy = d.userBy ? d.userBy.split(',') : [];
          console.log(usedBy)
          return {
            srNo: srNo,
            ...d,
            userBy: usedBy
          }
        })
        console.log(this.allAssetlist);
        this.dtTrigger.next()
      })

  }

  deleteAsset(assetId) {
    let isDelete = confirm('Are you sure want to delete ?')
    if (isDelete) {
      this.userService.deleteAsset(assetId)
        .subscribe(data => {
          console.log('deleted')
          this.assetList()
        })
    }
  }
  assetsData: Array<any> = []
  getAssets(e) {
    console.log(e.target.value)
    this.userService.getEquipmentByAssetType(e.target.value)
      .subscribe(data => {
        console.log(data)
        this.assetsData = data
      })
  }

  resetForm() {
    this.newAssetForm.reset(),
      this.usedBy = []


  }

}
