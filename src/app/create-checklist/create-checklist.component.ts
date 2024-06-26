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
import { SnackBarComponent } from "../loader/snack-bar/snack-bar.component";


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
  questionGroup: any[];
  qList: Qlist[];
  SelSubgroup: any
  questionGroups: any

  // finalCheckList = FinalCheckList[];
  submitted = false;
  tradeId: String = "0"

  checkListId: Number

  checkedQuestionObj = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarComponent
  ) {
    this.finalQuestion = [];
    this.getListFormData = [];
    this.questionGroup = [];
    this.tempQuestions = [];
    this.questionList2 = [];
    // this.finalCheckList = [];
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
            questionGroup: data.questionGroup
          }
          this.tradeMaintanceService.getSubgroupsByTrades(data.tradeId).subscribe(data => this.subgroups = data)

          this.commonService.getQuestionByTrade(data.tradeId, data.subgroupId).subscribe(data => { this.renderQuestions2(data) });
          this.tradeMaintanceService.getQuestiongroupBySubgroup(data.subgroupId).subscribe(
            data => this.questionGroups = data
          )
          this.registerForm.patchValue(formData)
        })

      this.commonService.getAllocatedQuestion(this.checkListId)
        .subscribe(data => {
          let allocatedQ = data
          console.log('pre-->', data)
          let e = {
            target: {
              checked: true
            }
          }
          allocatedQ.forEach(item => {
            this.onMoveCheck(item.questionGroup, e, item)

            if (this.checkedQuestionObj[item.questionGroup]) {
              this.checkedQuestionObj[item.questionGroup][item.questionId] = true
            } else {
              this.checkedQuestionObj[item.questionGroup] = {}
              this.checkedQuestionObj[item.questionGroup][item.questionId] = true
            }
          })

          this.assignQuestions = this.selectedQuestions
          console.log(this.checkedQuestionObj)
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
      // questionGroup: ["", Validators.required]
    });

    // console.log(this.formData);


  }

  // addToCheckList() {
  //   this.tempQuestions.forEach((q) => {
  //     let index = this.questionList2.indexOf(q);
  //     this.questionList2.splice(index, 1);
  //     this.finalQuestion.push(q);
  //   });
  //   this.tempQuestions = [];
  //   console.log('final list', this.finalQuestion)
  // }

  assignQuestions = {}
  addToCheckList() {
    this.assignQuestions = this.selectedQuestions
  }

  removeFromCheckList() {
    // this.tempQuestions.forEach((q) => {
    //   let index = this.finalQuestion.indexOf(q);
    //   this.finalQuestion.splice(index, 1);
    //   this.questionList2.push(q);
    // });
    // this.tempQuestions = [];
    for (const key in this.deSelect) {
      this.deSelect[key].forEach(q => {

        delete this.checkedQuestionObj[key][q]

        this.assignQuestions[key] = this.assignQuestions[key].filter(aq => {
          return q != aq.questionId
        })
      })
    }

    this.deSelect = {}
  }

  //OLD
  // onMoveCheck(question: Question, isChecked: boolean) {
  //   if (isChecked) {
  //     this.tempQuestions.push(question);
  //   } else {
  //     let removed = this.tempQuestions.filter((q, ind) => {
  //       return q.questionId === question.questionId ? ind : "";
  //     });
  //     let index = this.tempQuestions.indexOf(removed[0]);
  //     this.tempQuestions.splice(index, 1);
  //   }

  //   console.log('added', this.tempQuestions)
  // }

  // NEW
  onMoveCheck(groupId, e, q) {
    if (e.target.checked) {
      if (this.selectedQuestions[groupId]) {
        this.selectedQuestions[groupId].push(q)

      } else {
        this.selectedQuestions[groupId] = []
        this.selectedQuestions[groupId].push(q)
      }

      if (this.checkedQuestionObj[q.questionGroup]) {
        this.checkedQuestionObj[q.questionGroup][q.questionId] = true
      } else {
        this.checkedQuestionObj[q.questionGroup] = {}
        this.checkedQuestionObj[q.questionGroup][q.questionId] = true
      }

    } else {

      this.selectedQuestions[groupId] = this.selectedQuestions[groupId].filter(quetion => {
        return quetion.questionId != q.questionId
      })

      delete this.checkedQuestionObj[q.questionGroup][q.questionId]
    }

    console.log(this.selectedQuestions)
  }

  // onRemoveCheck(question: Question, isChecked: boolean) {
  //   if (isChecked) {
  //     this.tempQuestions.push(question);
  //   } else {
  //     let removed = this.tempQuestions.filter((q, ind) => {
  //       return q.questionId === question.questionId ? ind : "";
  //     });
  //     let index = this.tempQuestions.indexOf(removed[0]);
  //     this.tempQuestions.splice(index, 1);
  //   }
  // }

  deSelect = {}
  onRemoveCheck(groupId, e, q) {
    if (e.target.checked) {
      if (this.deSelect[groupId]) {
        this.deSelect[groupId].push(q.questionId)
      } else {
        this.deSelect[groupId] = []
        this.deSelect[groupId].push(q.questionId)
      }
    } else {
      this.deSelect[groupId] = this.deSelect[groupId].filter(qu => {
        return qu != q.questionId
      })

      if (this.deSelect[groupId].length === 0) {
        delete this.deSelect[groupId]
      }

    }

    console.log(this.deSelect)
  }


  deselectAll(groupId, e) {
    // console.log(this.assignQuestions, groupId)
    if (e.target.checked) {
      this.assignQuestions[groupId].forEach(q => {
        if (this.deSelect[groupId]) {
          this.deSelect[groupId].push(q.questionId)
        } else {
          this.deSelect[groupId] = []
          this.deSelect[groupId].push(q.questionId)
        }
      })

    } else {
      delete this.deSelect[groupId]
    }

    console.log(this.deSelect)
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

  listLoad: boolean = false
  onGetListSubmit() {
    let getForm = this.registerForm.value;
    this.getListFormData = getForm;
    console.log(getForm)
    this.listLoad = true
    this.commonService.getQuestionByTrade(getForm.fkTradeId, getForm.fkSubgroupId).subscribe(
      // this.commonService.getQuestionByTrade(118, 222).subscribe(
      (data) => {
        // this.renderQuestions(data)
        this.renderQuestions2(data)
        this.listLoad = false
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  submitLoad: boolean = false
  sendCheckList() {
    // this.finalQuestion.length ? console.log(this.finalQuestion) : "";
    let questionlist = []
    for (const key in this.assignQuestions) {
      questionlist = [...questionlist, ...this.assignQuestions[key]]
    }
    let finalCheckList = {
      formDataList: [this.getListFormData],
      // checklistQuestionDataList: this.finalQuestion,
      checklistQuestionDataList: questionlist,
    }
    console.log(questionlist)
    // return
    // console.log(JSON.stringify(finalCheckList));
    // return
    this.submitLoad = true
    if (this.checkListId != -1) {
      let finalCheckList = {
        formDataList: [{
          fkTradeId: this.registerForm.value.fkTradeId,
          fkSubgroupId: this.registerForm.value.fkSubgroupId,
          checklistName: this.registerForm.value.checklistName,
          // questionGroup: this.registerForm.value.questionGroup

        }],
        checklistQuestionDataList: questionlist,
      }

      console.log(finalCheckList)
      this.commonService.updateChecklist(finalCheckList, this.checkListId)
        .subscribe(data => {
          console.log('checklist updated', data)
          this.submitLoad = false
          this.snackBar.showSuccess('Checklist updated')

        }, err => {
          this.submitLoad = false
          this.snackBar.showSnackError()
        })
    } else {

      this.commonService.addCheckList(finalCheckList)
        .subscribe(
          data => {
            console.log(data)
            this.submitLoad = false
            this.snackBar.showSuccess('Checklist updated')
          },
          err => {
            this.submitLoad = false
            this.snackBar.showSnackError()
          }
        )
    }

  }

  // renderQuestions(data) {
  //   this.questionList2 = data;
  //   console.log(data)

  //   this.questionList2.forEach((question) => {
  //     if (this.questionGroup.length == 0) {
  //       let newArr = {
  //         subgroupId: this.questionList2[0].questionGroupId,
  //         questions: [
  //           {
  //             questionId: this.questionList2[0].questionId,
  //             questionText: this.questionList2[0].questionText,
  //             questionGroup: this.questionList2[0].questionGroupId
  //           },
  //         ],
  //       };
  //       this.questionGroup.push(newArr);
  //     } else {
  //       let found = this.questionGroup.find(function (element) {
  //         if (element.subgroupId == question.questionGroupId) return element;
  //       });

  //       // console.log('found', found)
  //       if (found) {
  //         let neqQ = {
  //           questionId: question.questionId,
  //           questionText: question.questionText,
  //           questionGroup: question.questionGroupId,
  //         };
  //         found.questions.push(neqQ);
  //         this.questionGroup = [...this.questionGroup, found]
  //       } else {
  //         let newG = {
  //           subgroupId: question.questionGroupId,
  //           questions: [
  //             {
  //               questionId: question.questionId,
  //               questionText: question.questionText,
  //               questionGroup: question.questionGroupId,

  //             },
  //           ],
  //         };
  //         this.questionGroup.push(newG);
  //       }
  //     }
  //   });

  //   console.log(this.questionGroup)
  // }

  questionGroup2 = {}
  renderQuestions2(data) {
    console.log(data)
    data.forEach(question => {
      if (this.questionGroup2[question.questionGroupId]) {
        if (!this.questionGroup2[question.questionGroupId][question.questionHeadingId]) {

          this.questionGroup2[question.questionGroupId][question.questionHeadingId] = {}
          this.questionGroup2[question.questionGroupId][question.questionHeadingId]['heading'] = question.questionHeadingId
          this.questionGroup2[question.questionGroupId][question.questionHeadingId]['questions'] = []
        } else {

          this.questionGroup2[question.questionGroupId][question.questionHeadingId]['questions'].push(
            {
              questionId: question.questionId,
              questionText: question.questionText,
              questionGroup: question.questionGroupId
            })

        }

      } else {
        this.questionGroup2[question.questionGroupId] = {}
        this.questionGroup2[question.questionGroupId]['questionGroup'] = question.questionGroupId

        this.questionGroup2[question.questionGroupId][question.questionHeadingId] = {}
        this.questionGroup2[question.questionGroupId][question.questionHeadingId]['heading'] = question.questionHeadingId
        this.questionGroup2[question.questionGroupId][question.questionHeadingId]['questions'] = []
        this.questionGroup2[question.questionGroupId][question.questionHeadingId]['questions'].push(
          {
            questionId: question.questionId,
            questionText: question.questionText,
            questionGroup: question.questionGroupId
          })

      }
    })

    console.log('headingwise', this.questionGroup2)
  }

  getQuestionGroup() {
    this.tradeMaintanceService.getQuestiongroupBySubgroup(this.SelSubgroup)
      .subscribe(data => this.questionGroups = data)
  }



  selectedQuestions = {}
  addAllGroupQuestion(e, groupId) {
    if (e.target.checked) {

      let headingQuestion = this.questionGroup2[groupId]
      this.selectedQuestions[groupId] = headingQuestion.questions
      // console.log(headingQuestion)
      this.selectedQuestions[groupId] = []
      for (const key in headingQuestion) {
        if (headingQuestion[key]['questions']) {
          this.selectedQuestions[groupId].push(...headingQuestion[key]['questions'])
        }
      }

      $(`.question${groupId}`).prop('checked', true)


      for (const key in this.selectedQuestions) {
        let question = this.selectedQuestions[key]
        question.forEach(q => {
          if (this.checkedQuestionObj[key]) {
            this.checkedQuestionObj[key][q.questionId] = true
          } else {
            this.checkedQuestionObj[key] = {}
            this.checkedQuestionObj[key][q.questionId] = true
          }
        })
      }

    } else {
      delete this.selectedQuestions[groupId]

      $(`.question${groupId}`).prop('checked', false)
    }
    console.log(this.selectedQuestions)
    console.log(this.checkedQuestionObj)

  }

}
