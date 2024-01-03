import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { UserView } from '../user-log/user-log.component';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


export class AssestView {
  constructor(
    public id: number,
    public assetName: string,
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

  equipmentForm: FormGroup
  users: UserView[]
  assets: AssestView
  equipmentId: number
  constructor(
    private formBuilder: FormBuilder,
    private commanService: CommonService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
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
      dateOfAssign: ['', Validators.required]
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
  }

  onSubmit() {
    console.log(this.equipmentForm.value)

    if (this.equipmentId != -1) {
      this.userService.updateEquipemt(this.equipmentForm.value, this.equipmentId)
      .subscribe(data => console.log('updated==>', data))

    } else {

      this.userService.addEquipment(this.equipmentForm.value)
        .subscribe(data => console.log('equipment addded-->', data))
    }
  }

}
