import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientServiceService } from "../service/client-service.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-create-user-equipment",
  templateUrl: "./create-user-equipment.component.html",
  styleUrls: ["./create-user-equipment.component.css"],
})
export class CreateUserEquipmentComponent implements OnInit {
  equipmentFrom: FormGroup;

  SelEquipmentType: string = "0";
  submitted = false;
  SelUser: string = "0";
  snapAuditId: number
  equipmentId: number

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']
    this.equipmentId = this.route.snapshot.params['id2']

    this.equipmentFrom = this.formBuilder.group({
      description: ['', Validators.required],
      remark: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required]

    })

    if (this.equipmentId != -1) {
      this.clientServiceService.retriveEquipment(this.equipmentId)
        .pipe(first())
        .subscribe(data => {
          console.log(data)
          this.equipmentFrom.patchValue(data)
        })
    }
  }
  get f() {
    return this.equipmentFrom.controls;
  }

  onSubmit() {
    this.submitted = true
    if(this.equipmentFrom.invalid){
      return
    }
    console.log("Id==");
    console.log(this.equipmentFrom.value)
    let formData = {
      snapAuditId: this.snapAuditId,
      description: this.equipmentFrom.value.description,
      remark: this.equipmentFrom.value.remark,
      image1: this.equipmentFrom.value.image1.replace(/^.*[\\\/]/, ''),
      image2: this.equipmentFrom.value.image2.replace(/^.*[\\\/]/, '')
    }

    if (this.equipmentId != -1) {
      console.log(formData)
      this.clientServiceService.updateWquipment(formData, this.equipmentId)
        .subscribe(data => {
          console.log('upated')
        })
    }else{
      this.clientServiceService.createEquipementUsedByCQRA(formData)
      .subscribe(
        data =>  console.log('created-->', data),
        err => console.log(err)
      )
    }
  }
}
