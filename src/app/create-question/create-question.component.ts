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
import { first } from "rxjs/operators";
import { error } from "console";
import { SnackBarComponent } from "../loader/snack-bar/snack-bar.component";


export class QuestionData {
  constructor(
    public tradeId: number,
    public subgroupId: number,
    public questionGroupId: number,
    public questionType: number,
    public questionHeadingId: number,
    public questionText: string,
    public ncDescription: string,
    public reference: string,
    public typeOfCheck: string,
    public workInstruction: string,
    public sampleSize: string,
    public sampleUnit: string,
    public tolerance: string,
    public minimumobservation: number,
    public impactOnQuality: string,
    public ncRectification: string,
    public subSection: string,
    public category: string,
    public goodImage1: string,
    public goodImage2: string,
    public ncImage1: string,
    public ncImage2: string,
    public dataToBeCaptured: number,
    // public option1: string,
    // public option2: string,
    // public option3: string,
    // public option4: string,
    // public option5: string,
    // public option6: string,
    public mandatory: boolean,
    public unitOfMeasurement: string,
  ) { }
}

@Component({
  selector: "app-create-question",
  templateUrl: "./create-question.component.html",
  styleUrls: ["./create-question.component.css"],
})

export class CreateQuestionComponent implements OnInit {
  SelTrade: string = "0";
  SelSubgroup: string = "0";
  SelQuestionGroup: string = "0";
  selQuestionType: number
  questionFrom: FormGroup;
  trades: Trade[];
  subgroups: SubgroupView
  questionGroups: QuestionGroupView
  questionHeading: any
  clients: ClientData[];
  submitted = false;
  isOptionShow = false;
  questionHeadingId: number;
  questionId: number

  unitsOfmeadure:any = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder,
    private snackbar: SnackBarComponent
  ) { }

  ngOnInit() {
    this.questionId = this.route.snapshot.params['id']
    let questionData;
    if (this.questionId != -1) {
      this.tradeMaintanceService.retriveQuestion(this.questionId)
        .pipe(first())
        .subscribe(data => {
          console.log(data);
          questionData = data
          this.tradeMaintanceService.getSubgroupsByTrades(questionData.tradeId).subscribe(data => this.subgroups = data)
          this.tradeMaintanceService.getQuestiongroupBySubgroup(questionData.subgroupId).subscribe(data => this.questionGroups = data)
          this.tradeMaintanceService.getQuestionHeadingByQuestionGroup(questionData.questionGroupId).subscribe(data => this.questionHeading = data)
          console.log(data)
          this.questionFrom.patchValue(data)
          if (questionData.questionType == 2) {
            this.isOptionShow = true
          }
        })
    }
    this.tradeMaintanceService.getAllTrades().subscribe(
      (data) => {
        console.log("----> office service : TRADE", data);
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

    this.tradeMaintanceService.getAllUnitOfMeasurement()
      .subscribe(data => {
        console.log(data)
        this.unitsOfmeadure = data
      })


    this.questionFrom = this.formBuilder.group({
      tradeId: ['', Validators.required],
      subgroupId: ['', Validators.required],
      questionGroupId: ['', Validators.required],
      questionType: ['', Validators.required],
      questionHeadingId: ['', Validators.nullValidator],
      questionText: ['', Validators.required],
      ncDescription: ['', Validators.required],
      refStdPract: ['', Validators.required],
      typeOfCheck: ['', Validators.required],
      workInstruction: ['', Validators.nullValidator],
      sampleSize: ['', Validators.nullValidator],
      sampleUnit: ['', Validators.nullValidator],
      tolerance: ['', Validators.nullValidator],
      minimumobservation: ['', Validators.nullValidator],
      impactOnQuality: ['', Validators.nullValidator],
      ncRectification: ['', Validators.nullValidator],
      subSection: ['', Validators.nullValidator],
      category: ['', Validators.nullValidator],
      goodImage1: ['', Validators.nullValidator],
      goodImage2: ['', Validators.nullValidator],
      ncImage1: ['', Validators.nullValidator],
      ncImage2: ['', Validators.nullValidator],
      dataToBeCaptured: ['', Validators.nullValidator],
      // option1: ['', Validators.nullValidator],
      // option2: ['', Validators.nullValidator],
      // option3: ['', Validators.nullValidator],
      // option4: ['', Validators.nullValidator],
      // option5: ['', Validators.nullValidator],
      // option6: ['', Validators.nullValidator],
      mandatory: ['', Validators.nullValidator],
      unitOfMeasurement: ['', Validators.nullValidator],
      nil: ['', Validators.nullValidator],
      mild: ['', Validators.nullValidator],
      modrate: ['', Validators.nullValidator],
      severe: ['', Validators.nullValidator],
      verySevere: ['', Validators.nullValidator],
      critical: ['', Validators.nullValidator]
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

  showOptions() {
    if (this.selQuestionType == 2) {
      this.isOptionShow = true
    } else {
      this.isOptionShow = false
    }
  }


  submitLoad: boolean = false
  onSubmit() {

    this.submitted = true
    // IF VALDATION IS FALSE THEN RETUN AND SHOW ERRORS
    if (this.questionFrom.invalid) {
      console.log(this.questionFrom)
      return
    }
    this.submitLoad = true



    console.log("Id==");
    console.log(this.questionFrom.value)
    let formData = {
      ...this.questionFrom.value,
      questionHeadingId: this.questionFrom.value.questionHeadingId ? this.questionFrom.value.questionHeadingId : 0,
      isActive: 1
    }
    if (this.questionId != -1) {
      console.log(this.questionId)
      this.tradeMaintanceService.updateQuestion(formData, this.questionId)
        .subscribe(data => {
          console.log('q updated-->', data)
          this.submitLoad = false
          this.snackbar.showSuccess('Question Updated!')
          this.router.navigate(['/question']);

        }, err => {
          this.submitLoad = false
          this.snackbar.showSnackError()
        });
    } else {
      this.tradeMaintanceService.createQuestions(formData)
        .subscribe(data => {
          console.log(data)
          this.submitLoad = false
          this.snackbar.showSuccess('Question Added!')
          // this.router.navigate(['/question']);

        }, err => {
          this.submitLoad = false
          this.snackbar.showSnackError()
        });

    }
  }
}
