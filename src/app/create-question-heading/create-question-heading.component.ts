import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Trade } from "../trade/trade.component";
import { QuestionGroup } from "../question-group/question-group.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SubgroupView } from "../subgroup/subgroup.component";
import { QuestionGroupView } from "../question-group/question-group.component";
import { data } from "jquery";

@Component({
  selector: "app-create-question-heading",
  templateUrl: "./create-question-heading.component.html",
  styleUrls: ["./create-question-heading.component.css"],
})
export class CreateQuestionHeadingComponent implements OnInit {
  SelTrade: string = "0";
  SelQuestionGp: string = "0";
  registerForm: FormGroup;
  trades: Trade[];
  questionGroups: QuestionGroup[];
  subGroups: SubgroupView[];
  questionGroup: QuestionGroupView[]
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.tradeMaintanceService.getAllTrades().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.trades = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.tradeMaintanceService.getAllSubgroups()
    .subscribe(
      (data) => (this.subGroups = data),
      (err) => console.log(err)
    );

    this.tradeMaintanceService.getAllQuestionGroups()
    .subscribe(
      data => this.questionGroup = data,
      err => console.log(err)
    )


    this.registerForm = this.formBuilder.group({
      tardeId: ['', Validators.required],
      subgroupId: ['', Validators.required],
      questionGroupId: ['', Validators.required],
      questionHeadingText: ['', Validators.required]
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log("Id==");

    console.log(this.registerForm.value)
  }
}
