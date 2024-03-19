import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { UserView } from '../user-log/user-log.component';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { DataTableDirective } from 'angular-datatables';
import { EMPTY, Subject } from "rxjs";
import { data } from 'jquery';


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
    public asset_type_name : String
  ) {

  }
}

export class AssetById{
  constructor(
    public id: number,
    public assetTypeId: number,
    public assetName: string,
    public userBy: string,
    public cost: number,
    public asset_type_name : String,
    public asset_id:number
  ){}
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
    public dateOfAssign: string,
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
  dtTrigger: Subject<AssetListView> = new Subject<AssetListView>();

  equipmentForm: FormGroup

  newAssetForm: FormGroup

  users: UserView[]
  assets: AssestView
  allAssetlist: Array<any>
  equipmentId: number
  signPad: any

  constructor(
    private formBuilder: FormBuilder,
    private commanService: CommonService,
    private userService: UserService,
    private route: ActivatedRoute,


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
      description: ['', Validators.required],
      assetSerialNo: ['', Validators.required],
      dateOfCalibration: ['', Validators.required],
      assignTo: ['', Validators.required],
      remark: ['', Validators.required],
      eImage: ['', Validators.required],
      ccImage: ['', Validators.required],
      dateOfAssign: ['', Validators.required],
    })


    this.newAssetForm = this.formBuilder.group({
      assetTypeId: ['', Validators.required],
      assetName: ['', Validators.required],
      cost: ['', Validators.required],
    })

    if (this.equipmentId != -1) {
      this.userService.retriveEquipemnt(this.equipmentId)
        .pipe(first())
        .subscribe(data => this.equipmentForm.patchValue(data))

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
  onSubmit() {
    console.log(this.equipmentForm.value)
    this.submitLoad = true

    if (this.equipmentId != -1) {
      this.userService.updateEquipemt(this.equipmentForm.value, this.equipmentId)
        .subscribe(data => console.log('updated==>', data))
        this.submitLoad = false

    } else {

      this.userService.addEquipment(this.equipmentForm.value)
        .subscribe(data => console.log('equipment addded-->', data))
        this.submitLoad = false

    }
  }


  newAssetLoad = false
  addNewAsset() {
    this.newAssetLoad = true
    // console.log(this.signPad.toSVG())
    // let idv = document.querySelector(`#show`) as HTMLDivElement
    // let sign = this.signPad.toSVG()
    // idv.innerHTML = sign
    let usedBy = []
    let check = document.querySelectorAll('.usedBy')
    check.forEach(c => {
      let checkbox = <HTMLInputElement>c
      if (checkbox.checked) {
        usedBy.push(checkbox.value)
      }
    })

    let formData = { ...this.newAssetForm.value, userBy: usedBy.toString() }
    console.log(formData)
    this.userService.newAsset(formData)
      .subscribe(data => {
        console.log('aded', data)
        this.newAssetLoad =  false
        // this.assetList()
      })
  }


  assetListLoad = false
  assetList() {
    this.assetListLoad = true
    this.userService.getAssetsList()
      .subscribe(data => {
        this.assetListLoad = false
        let srNo = 0
        this.allAssetlist = data.map(d =>{
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


  assetByIdv:any = []
  assetbyIdget(id){

    this.userService.getAssetById(id).subscribe(data =>{
      // console.log(data)
      this.assetByIdv = data;
      console.log(this.assetByIdv)
    })
    }

    assetByIdupdate(asset: any, id: number){
      this.userService.updateAssetById(asset,id).subscribe(data=>{
        console.log('Asset Updated',data)
      })

    }


  



    // deleteAssetLoad = false
  deleteAsset(id){
    // this.deleteAssetLoad = true
    this.userService.deleteAssetByID(id).subscribe(data=>{
      // this.deleteAssetLoad = false
      console.log('Asset Deleted Successfully!,',data)
      this.assetList()
    })
  }


  assetsData:Array<any> = []
  getAssets(e){
    console.log(e.target.value)
    this.userService.getEquipmentByAssetType(e.target.value)
    .subscribe(data =>{
      console.log(data)
      this.assetsData = data
    })
  }
}
