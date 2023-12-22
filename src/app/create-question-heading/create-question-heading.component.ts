import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Trade } from "../trade/trade.component";
import { QuestionGroup } from "../question-group/question-group.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SubgroupView } from "../subgroup/subgroup.component";
import { QuestionGroupView } from "../question-group/question-group.component";
import { first } from "rxjs/operators";

export class QuesHeadingData {
  constructor(
    public questionHeadingId: number,
    public questionHeadingText: string,
    public questionGroupId: number,
    public subgroupId: number,
    public tardeId: number
  ) { }
}

@Component({
  selector: "app-create-question-heading",
  templateUrl: "./create-question-heading.component.html",
  styleUrls: ["./create-question-heading.component.css"],
})
export class CreateQuestionHeadingComponent implements OnInit {
  SelTrade: string = "0";
  SelSubgroup: string = "0";
  SelQuestionGp: string = "0";
  registerForm: FormGroup;
  trades: Trade[];
  subGroups: SubgroupView;
  questionGroup: QuestionGroupView;
  submitted = false;
  questionHeadingId: number;

  constructor(
    private route: ActivatedRoute,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.questionHeadingId = this.route.snapshot.params["id"];

    if (this.questionHeadingId != -1) {
      this.tradeMaintanceService
        .retriveQuestionHeading(this.questionHeadingId)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(data)
            this.registerForm.patchValue(data)
          },
          (err) => console.log(err)
        );
    }

    this.tradeMaintanceService.getAllTrades().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.trades = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    
    this.registerForm = this.formBuilder.group({
      tardeId: ["", Validators.required],
      subgroupId: ["", Validators.required],
      questionGroupId: ["", Validators.required],
      questionHeadingText: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    console.log("Id==");

    console.log(this.registerForm.value);

    if (this.questionHeadingId != -1) {
      console.log("update");
      let formData = {
        questionHeadingId: this.questionHeadingId,
        questionHeadingText: this.registerForm.value.questionHeadingText,
        questionGroupId: this.registerForm.value.questionGroupId,
        subgroupId: this.registerForm.value.subgroupId,
        tardeId: this.registerForm.value.tardeId,
      };

      this.tradeMaintanceService.updateQuestionHeading(formData, this.questionHeadingId)
        .subscribe(
          data => console.log('updated', data),
          err => console.log(err)
        )

    } else {
      this.tradeMaintanceService
        .createQuestionHeading(this.registerForm.value)
        .subscribe(
          (data) => console.log("heading created-->", data),
          (err) => console.log(err)
        );
    }
  }

  getSubgroups(){
    this.tradeMaintanceService.getSubgroupsByTrades(this.SelTrade).subscribe(data => this.subGroups = data)
  }

  getQuestionGroups(){
    this.tradeMaintanceService.getQuestiongroupBySubgroup(this.SelSubgroup).subscribe(data => this.questionGroup = data)
  }
}
