import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Trade } from "../trade/trade.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

export class SubgroupData {
  constructor(
    public subgroupId: number,
    public tardeId: number,
    public subgroupName: number
  ) {}
}

@Component({
  selector: "app-create-subgroup",
  templateUrl: "./create-subgroup.component.html",
  styleUrls: ["./create-subgroup.component.css"],
})
export class CreateSubgroupComponent implements OnInit {
  SelTrade: string = "0";
  registerForm: FormGroup;
  trades: Trade[];
  submitted = false;
  subgroupId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subgroupId = this.route.snapshot.params["id"];
    if (this.subgroupId != -1) {
      this.tradeMaintanceService
        .retirveSubgroup(this.subgroupId)
        .pipe(first())
        .subscribe((data) => {
          this.registerForm.patchValue(data);
        });
    }

    this.tradeMaintanceService.getAllTrades().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.trades = data;
        // ADD THIS
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.registerForm = this.formBuilder.group({
      tardeId: ["", Validators.required],
      subgroupName: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log("Id==");
    console.log(this.registerForm.value);

    if (this.subgroupId != -1) {
      let updatedData = {
        subgroupId: this.subgroupId,
        tardeId: this.registerForm.value.tardeId,
        subgroupName: this.registerForm.value.subgroupName,
      };
      this.tradeMaintanceService
        .updateSubgroup(updatedData, this.subgroupId)
        .subscribe((data) => {
          console.log("updated--->", data);
        });
    } else {
      this.tradeMaintanceService
        .createSubgroup(this.registerForm.value)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => console.log(err)
        );
    }
  }
}
