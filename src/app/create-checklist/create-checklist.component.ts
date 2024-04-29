import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Trade } from "../trade/trade.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientData } from "../client/client.component";
import { ClientServiceService } from "../service/client-service.service";
import { Question } from "../question/question.component";
import { SubgroupView } from "../subgroup/subgroup.component";
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { CommonService } from "../common.service";
import { first } from "rxjs/operators";


export class ChecklistData {
  constructor(
    public checklistMasterId: Number,
    public subgroupId: Number,
    public tradeId: Number,
    public checklistName: String,
    public actDea: Number
  ) { }
}

export class checklistFormTemp {
  constructor(
    public selTrade: number,
    public clientName: string,
    public clientId: number,
    public groupId: number
  ) { }
}
export class Qlist {
  constructor(public questionId: number, public questionText: string) { }
}

export class QuestionGroup {
  constructor(public subgroupId: Number, public questions: Qlist[]) { }
}

export class FinalCheckList {
  constructor(public formData: checklistFormTemp[], public checkList: Question[]) { }
}


@Component({
  selector: "app-create-checklist",
  templateUrl: "./create-checklist.component.html",
  styleUrls: ["./create-checklist.component.css"],
})
export class CreateChecklistComponent implements OnInit {
  SelTrade: string = "118";
  SelClientId: string = "222";
  registerForm: FormGroup;
  trades: Trade[];
  clients: ClientData[];
  subgroups: SubgroupView;
  formData: FormGroup;
  form!: FormGroup;
  id: number;
  checklistForm: FormGroup;
  getListFormData: checklistFormTemp[];
  questionList: any;
  questionList2: any;
  finalQuestion: Array<any>;
  tempQuestions: any;
  q: Question[];
  questionGroup: QuestionGroup[];
  qList: Qlist[];
  SelSubgroup: any
  questionGroups: any

  // finalCheckList = FinalCheckList[];
  submitted = false;
  tradeId: String = "0"

  checkListId: Number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder
  ) {
    this.finalQuestion = [];
    this.getListFormData = [];
    this.questionGroup = [];
    this.tempQuestions = [];
    this.questionList2 = [];
    // this.finalCheckList = [];
  }

  addToCheckList() {
    this.tempQuestions.forEach((q) => {
      let index = this.questionList2.indexOf(q);
      this.questionList2.splice(index, 1);
      this.finalQuestion.push(q);
    });
    this.tempQuestions = [];
    console.log('final list', this.finalQuestion)
  }
  removeFromCheckList() {
    this.tempQuestions.forEach((q) => {
      let index = this.finalQuestion.indexOf(q);
      this.finalQuestion.splice(index, 1);
      this.questionList2.push(q);
    });
    this.tempQuestions = [];
  }
  onMoveCheck(question: Question, isChecked: boolean) {
    if (isChecked) {
      this.tempQuestions.push(question);
    } else {
      let removed = this.tempQuestions.filter((q, ind) => {
        return q.questionId === question.questionId ? ind : "";
      });
      let index = this.tempQuestions.indexOf(removed[0]);
      this.tempQuestions.splice(index, 1);
    }
  }

  onRemoveCheck(question: Question, isChecked: boolean) {
    if (isChecked) {
      this.tempQuestions.push(question);
    } else {
      let removed = this.tempQuestions.filter((q, ind) => {
        return q.questionId === question.questionId ? ind : "";
      });
      let index = this.tempQuestions.indexOf(removed[0]);
      this.tempQuestions.splice(index, 1);
    }
  }
  drop(event: CdkDragDrop<object[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnInit() {

    this.checkListId = this.route.snapshot.params['id']

    if (this.checkListId != -1) {
      this.commonService.getCheckList(this.checkListId)
        .pipe(first())
        .subscribe(data => {
          console.log('retrive checlist-->', data)
          let formData = {
            fkTradeId: data.tradeId,
            fkSubgroupId: data.subgroupId,
            checklistName: data.checklistName,
            questionGroup:  data.questionGroup
          }
          this.tradeMaintanceService.getSubgroupsByTrades(data.tradeId).subscribe(data => this.subgroups = data)

          this.commonService.getQuestionByTrade(data.tradeId, data.subgroupId).subscribe(data => this.renderQuestions(data));
          this.tradeMaintanceService.getQuestiongroupBySubgroup(data.subgroupId).subscribe(
            data => this.questionGroups = data
          )
          this.registerForm.patchValue(formData)
        })

      this.commonService.getAllocatedQuestion(this.checkListId)
        .subscribe(data => {
          let allocatedQ = data
          console.log(data)
          allocatedQ.forEach(item => {
            this.finalQuestion.push(item)
          })
        })

    }

    this.tradeMaintanceService.getAllTrades().subscribe(
      (data) => {
        console.log("----> office Trdae : get all data", data);
        this.trades = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.registerForm = this.formBuilder.group({
      fkTradeId: ["", Validators.required],
      checklistName: ["", Validators.required],
      fkSubgroupId: ["", Validators.required],
      questionGroup: ["", Validators.required]
    });

    // console.log(this.formData);


  }

  get f() {
    return this.registerForm.controls;
  }

  getSubgroups() {
    this.tradeMaintanceService.getSubgroupsByTrades(this.tradeId)
      .subscribe(data => {
        console.log('subgroups --> ', data)
        this.subgroups = data
      })
  }

  onGetListSubmit() {
    let getForm = this.registerForm.value;
    this.getListFormData = getForm;
    console.log(getForm)
    this.commonService.getQuestionByTrade(getForm.fkTradeId, getForm.fkSubgroupId).subscribe(
      // this.commonService.getQuestionByTrade(118, 222).subscribe(
      (data) => {
        this.renderQuestions(data)
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }
  sendCheckList() {
    // this.finalQuestion.length ? console.log(this.finalQuestion) : "";
    let finalCheckList = {
      formDataList: [this.getListFormData],
      checklistQuestionDataList: this.finalQuestion,
    }
    console.log(finalCheckList)
    // console.log(JSON.stringify(finalCheckList));
    if (this.checkListId != -1) {
      let finalCheckList = {
        formDataList: [{
          fkTradeId: this.registerForm.value.fkTradeId,
          fkSubgroupId: this.registerForm.value.fkSubgroupId,
          checklistName: this.registerForm.value.checklistName,
          questionGroup: this.registerForm.value.questionGroup

        }],
        checklistQuestionDataList: this.finalQuestion,
      }
      this.commonService.updateChecklist(finalCheckList, this.checkListId)
        .subscribe(data => {
          console.log('checklist updated', data)
        })
    } else {

      this.commonService.addCheckList(finalCheckList)
        .subscribe(
          data => console.log(data),
          err => console.log(err)
        )
    }

  }

  renderQuestions(data) {
    this.questionList2 = data;
    console.log(data)

    this.questionList2.forEach((question) => {
      if (this.questionGroup.length == 0) {
        if (this.questionList2.length != 0) {
          let newArr = {
            subgroupId: this.questionList2[0].subgroupId,
            questions: [
              {
                questionId: this.questionList2[0].questionId,
                questionText: this.questionList2[0].questionText,
                questionGroup: this.questionList2[0].questionGroupId
              },
            ],
          };
          this.questionGroup.push(newArr);
        }
      } else {
        let found = this.questionGroup.find(function (element) {
          return element.subgroupId == question.subgroupId;
        });
        if (found) {
          let neqQ = {
            questionId: question.questionId,
            questionText: question.questionText,
            questionGroup: question.questionGroupId,
          };
          found.questions.push(neqQ);
        } else {
          let newG = {
            subgroupId: question.subgroupId,
            questions: [
              {
                questionId: question.questionId,
                questionText: question.questionText,
                questionGroup: question.questionGroupId,

              },
            ],
          };
          this.questionGroup.push(newG);
        }
      }
    });

    console.log(this.questionGroup)
  }

  getQuestionGroup() {
    this.tradeMaintanceService.getQuestiongroupBySubgroup(this.SelSubgroup)
      .subscribe(data => this.questionGroups = data)
  }

}
