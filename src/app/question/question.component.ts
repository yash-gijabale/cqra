import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';
import { SubgroupView } from '../subgroup/subgroup.component';
import { QuestionGroupView } from '../question-group/question-group.component';


export class Question {
  constructor(
    public tardeId: number,
    public tradegroupId: number,
    public subgroupId: number,
    public questionGroupId: number,
    public questionHeadingId: number,
    public questionId: number,
    public questionText: string,
    public questionHeadingText: string,
    public questionGroupText: string,
    public tradeName: string,
    public subgroupName: string,

    public ncDescription: string,
    public impactOnQuality: string,
    public ncIdentification: string,
    public ncRectification: string,
    public goodImage1: string,
    public goodImage2: string,
    public ncImage1: string,
    public ncImage2: string,
    public minimumobservation: number,
    public option1: string,
    public option2: string,
    public option3: string,
    public option4: string,
    public option5: string,
    public option6: string,
    public refStdPract: string,
    public tolerance: string,
    public typeOfCheck: string,
    public sampleSize: string,
    public dataToBeCaptured: string,
    public subSection: string,
    public category: string,
    public concernRaised: number,
    public nil: string,
    public mild: string,
    public modrate: string,
    public severe: string,
    public verySevere: string,
    public critical: string,
    public updatedBy: number,
    public updatedOn: Date,
    public status: boolean

  ) {

  }
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Question> = new Subject();
  questions: Question[];
  isLoading: boolean
  selectedQuestion: Question;

  trades: Trade[] = []
  subgroups: SubgroupView
  questionGroups: QuestionGroupView
  questionHeading: any

  SelTrade: Number = 0
  SelSubgroup: Number = 0
  SelQuestionGroup: Number = 0
  SelQuestionHeading: Number = 0
  SelQuestionType: Number = 0

  constructor(
    private router: Router, 
    private tradeMaintanceService: TradeMaintanceService,
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      processing: true,
      deferRender: true,
      destroy: true
    };
    this.tradeMaintanceService.getAllQuestions().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.questions = data;
      this.dtTrigger.next();
      this.isLoading = false
    }, (err) => {
      console.log('-----> err', err);
    })

    this.tradeMaintanceService.getAllTrades()
      .subscribe(data => {
        this.trades = data

      })
  }


  editQuestion(id) {
    this.router.navigate(['createQuestion', id])
  }



  editforQuestion(id) {
    let queId = id
    // console.log('queId', queId)
    localStorage.setItem('queId', queId.toString());

    let que = this.questions.find(question => question.questionId === queId);
    console.log(que);
    this.selectedQuestion = que;
    this.router.navigate(['createQuestion', -1]);
  }

  getSubgroups() {
    this.tradeMaintanceService.getSubgroupsByTrades(this.SelTrade)
      .subscribe(
        data => {
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

  filterLoad:boolean = false
  filterQuestions() {
    this.filterLoad = true
    this.tradeMaintanceService.getQuestionByFilter(this.SelTrade, this.SelSubgroup, this.SelQuestionGroup, this.SelQuestionHeading, this.SelQuestionType)
      .subscribe(data => {
        this.questions = data
        this.filterLoad = false
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy()
          this.dtTrigger.next()
        });

      })
  }


  // editforQuestion(id,){
  //   this.router.navigate(['createQuestion',id])
  // }




  deActivateQuestion(id) {
    let isDeactivate = confirm('Are you sure want to deactivate?')
    if (isDeactivate) {
      this.tradeMaintanceService.deActivateQuestion(id)
        .subscribe(data => {
          console.log('Deactivated')
          location.reload()
        })
    }
  }

}

