
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Trade } from "../trade/trade.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { SubgroupView } from "../subgroup/subgroup.component";

export class QuestionGroupData {
  constructor(
    public questionGroupId: number,
    public tardeId: number,
    public subgroupId: number,
    public questionGroupText: number
  ) { }
}

@Component({
  selector: "app-create-question-group",
  templateUrl: "./create-question-group.component.html",
  styleUrls: ["./create-question-group.component.css"],
})
export class CreateQuestionGroupComponent implements OnInit {
  SelTrade: string = "0";
  registerForm: FormGroup;
  trades: Trade[];
  submitted = false;
  subgroups: SubgroupView;
  questionGroupId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.questionGroupId = this.route.snapshot.params["id"];

    if (this.questionGroupId != -1) {
      let groupData;
      this.tradeMaintanceService
        .retriveQuestionGroup(this.questionGroupId)
        .pipe(first())
        .subscribe((data) => {
          groupData = data
          this.registerForm.patchValue(data);
          this.tradeMaintanceService.getSubgroupsByTrades(groupData.tardeId).subscribe(data => this.subgroups = data)
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
      subgroupId: ["", Validators.required],
      questionGroupText: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  isload: boolean = false
  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    this.isload = true
    console.log("Id==");
    console.log(this.registerForm.value);

    if (this.questionGroupId != -1) {
      let formData = {
        questionGroupId: this.questionGroupId,
        tardeId: this.registerForm.value.tardeId,
        subgroupId: this.registerForm.value.subgroupId,
        questionGroupText: this.registerForm.value.questionGroupText,
        status: true,
      };

      this.tradeMaintanceService.updateQuestionGroup(formData, this.questionGroupId)
        .subscribe(data => {
          console.log('updated-->', data)
          this.isload = false
        }, err => console.log(err))

    } else {
      this.tradeMaintanceService
        .createQuestionGroup({ ...this.registerForm.value, status: true })
        .subscribe(
          (data) => {
            console.log(data)
            this.isload = false

          },
          (err) => console.log(err)
        );
    }
  }

  getSubgroups() {
    this.tradeMaintanceService.getSubgroupsByTrades(this.SelTrade)
      .subscribe(data => {
        this.subgroups = data
        console.log(data)
      })

  }
}
