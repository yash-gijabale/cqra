import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EquipmentList } from "src/app/user-equipment/user-equipment.component";
import { ClientServiceService } from "src/app/service/client-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-create-equip-used-by-contractor',
  templateUrl: './create-equip-used-by-contractor.component.html',
  styleUrls: ['./create-equip-used-by-contractor.component.css']
})
export class CreateEquipUsedByContractorComponent implements OnInit {
  snapAuditId: number;
  equipmentId: number;
  equipmentList: EquipmentList[];
  equipmentForm: FormGroup;
  submitted:boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params["id"];
    this.equipmentId = this.route.snapshot.params["id2"];

    this.equipmentForm = this.formBuilder.group({
      description: ["", Validators.required],
      remark: ["", Validators.required],
      image1: ["", Validators.required],
      image2: ["", Validators.required],
    });

    if(this.equipmentId != -1){
    this.clientService.retriveEquipmentUsedByContractor(this.equipmentId)
      .pipe(first())
      .subscribe((data) => {
        this.equipmentForm.patchValue(data);
      });
    }
  }

  get f() {
    return this.equipmentForm.controls;
  }

  onSubmit() {
    console.log(this.equipmentForm.value);
    if (this.equipmentId != -1) {
      let formData = {
        snapAuditId: this.snapAuditId,
        description: this.equipmentForm.value.description,
        remark: this.equipmentForm.value.remark,
        image1: this.equipmentForm.value.image1.replace(/^.*[\\\/]/, ""),
        image2: this.equipmentForm.value.image2.replace(/^.*[\\\/]/, ""),
      };
      console.log(formData);
      this.clientService.updateWquipmentUsedByContractor(formData, this.equipmentId)
      .subscribe(data => {
        console.log('updated')
      })
    }
  }

}
