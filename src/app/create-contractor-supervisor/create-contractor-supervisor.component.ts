import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientData } from "../client/client.component";
import { ClientServiceService } from "../service/client-service.service";
import { CommonService } from "../common.service";
import { first } from "rxjs/operators";
import { ContractorData } from "../contractor-forman/contractor-forman.component";
import { data } from "jquery";
export class ContractorSupervisor {
  constructor(
    public supervisorId: number,
    public contractorId: number,
    public supervisorName: string,
    public isActive: boolean
  ) { }
}

@Component({
  selector: "app-create-contractor-supervisor",
  templateUrl: "./create-contractor-supervisor.component.html",
  styleUrls: ["./create-contractor-supervisor.component.css"],
})
export class CreateContractorSupervisorComponent implements OnInit {
  SelClientId: string = "0";
  supervisorForm: FormGroup;
  submitted = false;
  clients: ContractorData[];
  id: number;
  contractorId: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commanService: CommonService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];

    if (this.id != -1) {
      this.clientServiceService
        .retrieveSupervisor(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.supervisorForm.patchValue(x)
          this.contractorId = x.contractorId
        });
    }

    this.commanService.getContractorsList().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.clients = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.supervisorForm = this.formBuilder.group({
      contractorId: ["", Validators.required],
      supervisorName: ["", Validators.required],
    });
  }

  get f() {
    return this.supervisorForm.controls;
  }

  onSubmit() {

    this.submitted = true

    if (this.supervisorForm.invalid) {
      // console.log(this.f.contractorId.errors.required);
      return;
    }

    console.log("Id==");
    console.log(this.supervisorForm.value);
    if (this.id == -1) {
      this.supervisorForm.value.isActive = true
      this.clientServiceService
        .createSupervisor(this.supervisorForm.value)
        .subscribe((data) => {
          console.log("supervisor added");
        });
    } else {
      this.supervisorForm.value.isActive = true
      this.clientServiceService
        .updateSupervisor(this.supervisorForm.value, this.id)
        .subscribe((data) => {
          console.log("updated successfully");
        });
    }
  }
}
