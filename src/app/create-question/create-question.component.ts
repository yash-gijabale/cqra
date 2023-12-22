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
  selQuestionType :number
  questionFrom: FormGroup;
  trades: Trade[];
  subgroups: SubgroupView
  questionGroups: QuestionGroupView
  questionHeading: any
  clients: ClientData[];
  submitted = false;
  isOptionShow = false;
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
      tradeId: ['', Validators.required],
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
      sampleUnit: ['', Validators.required],
      tolerance: ['', Validators.required],
      minimumobservation: ['', Validators.required],
      impactOnQuality: ['', Validators.required],
      ncRectification: ['', Validators.required],
      subSection: ['', Validators.required],
      category: ['', Validators.required],
      goodImage1: ['', Validators.required],
      goodImage2: ['', Validators.required],
      ncImage1: ['', Validators.required],
      ncImage2: ['', Validators.required],
      dataToBeCaptured: ['', Validators.required],
      option1: ['', Validators.nullValidator],
      option2: ['', Validators.nullValidator],
      option3: ['', Validators.nullValidator],
      option4: ['', Validators.nullValidator],
      option5: ['', Validators.nullValidator],
      option6: ['', Validators.nullValidator],
      mandatory: ['', Validators.nullValidator],
      measureUnit: ['', Validators.nullValidator],
    })
  }

  get f() {
    return this.questionFrom.controls;
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

  showOptions(){
    if(this.selQuestionType == 2){
      this.isOptionShow = true
    }else{
      this.isOptionShow = false
    }
  }

  
  onSubmit() {
    console.log("Id==");
    console.log(this.questionFrom.value)
    this.tradeMaintanceService.createQuestions(this.questionFrom.value)
    .subscribe(data => console.log(data))
  }
}
