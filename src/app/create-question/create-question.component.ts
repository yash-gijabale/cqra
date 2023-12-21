import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Trade } from "../trade/trade.component";
import { ClientData } from "../client/client.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientServiceService } from "../service/client-service.service";
import { SubgroupView } from "../subgroup/subgroup.component";
import { data } from "jquery";
import { QuestionGroupView } from "../question-group/question-group.component";
import { QuestionHeadingView } from "../question-heading/question-heading.component";
@Component({
  selector: "app-create-question",
  templateUrl: "./create-question.component.html",
  styleUrls: ["./create-question.component.css"],
})
export class CreateQuestionComponent implements OnInit {
  SelTrade: string = "0";
  SelSubgroup: string = "0";
  SelQuestionGroup: string = "0";
  questionFrom: FormGroup;
  trades: Trade[];
  subgroups: SubgroupView
  questionGroups: QuestionGroupView
  questionHeading: any
  clients: ClientData[];
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder
  ) { }

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

    this.clientServiceService.getAllClients().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.clients = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );


    this.questionFrom = this.formBuilder.group({
      tardeId: ['', Validators.required],
      subgroupId: ['', Validators.required],
      questionGroupId: ['', Validators.required],
      questionType: ['', Validators.required],
      questionHeadingId: ['', Validators.required],
      qualityRequiement: ['', Validators.required],
      ncDescription: ['', Validators.required],
      reference: ['', Validators.required],
      typeOfCheck: ['', Validators.required],
      workInstruction: ['', Validators.required],
      sampleSize: ['', Validators.required],
      tolerance: ['', Validators.required],
      minimumObservation: ['', Validators.required],
      impactOfNc: ['', Validators.required],
      ncRectification: ['', Validators.required],
      subSection: ['', Validators.required],
      category: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
      image3: ['', Validators.required],
      image4: ['', Validators.required],
      captured: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      option5: ['', Validators.required],
      option6: ['', Validators.required]
    })
  }

  get f() {
    return this.questionFrom.controls;
  }

  onSubmit() {
    console.log("Id==");
    console.log(this.questionFrom.value)
  }

  getSubgroups() {
    this.tradeMaintanceService.getSubgroupsByTrades(this.SelTrade)
      .subscribe(
        data => {
          console.log(data)
          this.subgroups = data
        }

      )
  }

  getQuestionGroup() {
    this.tradeMaintanceService.getQuestiongroupBySubgroup(this.SelSubgroup)
      .subscribe(data => this.questionGroups = data)
  }

  getQuestionHeading() {
    this.tradeMaintanceService.getQuestionHeadingByQuestionGroup(this.SelQuestionGroup)
      .subscribe(data => {
        console.log(data)
        this.questionHeading = data
      })
  }
}
