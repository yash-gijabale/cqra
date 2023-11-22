import { Component, OnInit, Input} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { KeyValue } from "@angular/common";
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { NgForOf } from "@angular/common";
import { forEach } from "@angular/router/src/utils/collection";
import { exit } from "process";
import { element } from "protractor";
import { Question } from "../question/question.component";

import { CommonService } from "../common.service";

export class QuestionList {
  constructor(
    public questionId: number,
    public questionText: string,
    public subgroupId: number
  ) {}
}
export class checklistFormTemp {
  constructor(
    public selTrade: number,
    public clientName: string,
    public clientId: number,
    public groupId: number
  ) {}
}
export class Qlist {
  constructor(public questionId: number, public questionText: string) {}
}

export class QuestionGroup {
  constructor(public subgroupId: Number, public questions: Qlist[]) {}
}

@Component({
  selector: "app-create-checklist-card",
  templateUrl: "./create-checklist-card.component.html",
  styleUrls: ["./create-checklist-card.component.css"],
  // standalone: true,
  // imports: [CdkDropList, CdkDrag],
})
export class CreateChecklistCardComponent implements OnInit {
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  @Input() formData: any;
  form!: FormGroup;
  id: number;
  finalQuestionList:any;
  questionList2List:any;
  checklistForm: FormGroup;
  checklistTemp: checklistFormTemp[];
  questionList: Question[];
  questionList2: Question[];
  finalQuestion: Question[];
  tempQuestions: Question[];
  q: Question[];
  questionGroup: QuestionGroup[];
  qList: Qlist[];
  private onCompare(
    _left: KeyValue<any, any>,
    _right: KeyValue<any, any>
  ): number {
    return -1;
  }
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {
    // console.log(this.questionList)
    this.finalQuestion = [];
    this.checklistTemp = [];
    this.questionGroup = [];
    this.tempQuestions = [];
    this.questionList2 = [];
    // let isPresent:boolean;
    
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
    this.commonService.getQuestionByTrade("104", "183").subscribe(
      (data) => {
        // this.structures= data;
        this.questionList2 = data;
        
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
    console.log(this.questionGroup);

        // console.log("checklist questions Data==", this.questionList2);
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

  }

  onSubmit() {
    console.log("submiteded");
    console.log(this.checklistForm.value);
    this.checklistTemp = this.checklistForm.value;
  }
  
  sendCheckList() {
    console.log(this.formData);
    this.finalQuestion.length ? console.log(this.finalQuestion) : "";
    console.log(this.checklistForm.value);

    // this.finalQuestion.forEach((finalQ)=>{
    //     console.log({...this.checklistForm.value,...finalQ})
    // })
  }
}
