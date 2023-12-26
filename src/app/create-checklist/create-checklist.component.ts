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
  SelTrade: string = "0";
  SelClientId: string = "0";
  registerForm: FormGroup;
  trades: Trade[];
  clients: ClientData[];
  subgroups: SubgroupView[];
  formData: FormGroup;
  form!: FormGroup;
  id: number;
  checklistForm: FormGroup;
  getListFormData: checklistFormTemp[];
  questionList: Question[];
  questionList2: Question[];
  finalQuestion: Question[];
  tempQuestions: Question[];
  q: Question[];
  questionGroup: QuestionGroup[];
  qList: Qlist[];

  // finalCheckList = FinalCheckList[];
  submitted = false;

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
    this.tradeMaintanceService.getAllTrades().subscribe(
      (data) => {
        console.log("----> office Trdae : get all data", data);
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

    this.tradeMaintanceService.getAllSubgroups()
      .subscribe(data => {
        console.log('subgroups',data);
        this.subgroups = data;
      })

    this.registerForm = this.formBuilder.group({
      selTrade: ["", Validators.required],
      checkListName: ["", Validators.required],
      subgroupId: ["", Validators.required],
      groupId: ["", Validators.required],
    });

    // console.log(this.formData);


  }

  get f() {
    return this.registerForm.controls;
  }

  onGetListSubmit() {
    let getForm = this.registerForm.value;
    this.getListFormData = getForm;
    console.log(getForm)
    this.commonService.getQuestionByTrade(getForm.selTrade, getForm.subgroupId).subscribe(
      (data) => {
        // this.structures= data;
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
              };
              found.questions.push(neqQ);
            } else {
              let newG = {
                subgroupId: question.subgroupId,
                questions: [
                  {
                    questionId: question.questionId,
                    questionText: question.questionText,
                  },
                ],
              };
              this.questionGroup.push(newG);
            }
          }
        });
        // console.log(this.questionGroup);

        // console.log("checklist questions Data==", this.questionList2);
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }
  sendCheckList() {
    // this.finalQuestion.length ? console.log(this.finalQuestion) : "";
    let finalCheckList = [{
      formData: this.getListFormData,
      checkList: this.finalQuestion,
    }]
    // console.log(JSON.stringify(finalCheckList));
    this.commonService.addCheckList(finalCheckList)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      )

  }
}
