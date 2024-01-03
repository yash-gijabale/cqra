import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';


export class Question{
  constructor(
    public tardeId:number,
    public tradegroupId: number,
    public subgroupId:number,
    public questionGroupId:number,
    public questionHeadingId:number,
    public questionId:number,
    public questionText:string,
    public questionHeadingText:string,
    public questionGroupText:string,
    public tradeName:string,
    public subgroupName:string,

    public ncDescription:string,
    public impactOnQuality:string,
    public ncIdentification:string,
    public ncRectification:string,
    public goodImage1:string,
    public goodImage2:string,
    public ncImage1:string,
    public ncImage2:string,
    public minimumobservation:number,
    public option1:string,
    public option2:string,
    public option3:string,
    public option4:string,
    public option5:string,
    public option6:string,
    public refStdPract:string,
    public tolerance:string,
    public typeOfCheck:string,
    public sampleSize:string,
    public dataToBeCaptured:string,
    public subSection:string,
    public category:string,
    public concernRaised:number,
    public nil:string,
    public mild:string,
    public modrate:string,
    public severe:string,
    public verySevere:string,
    public critical:string,
    public updatedBy:number,
    public updatedOn:Date,
    public status: boolean
    
  ){

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
  questions:Question[];
  isLoading: boolean

  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService) { }

  ngOnInit() {
    this.isLoading = true
    this.tradeMaintanceService.getAllQuestions().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.questions= data;
      this.dtTrigger.next();
      this.isLoading = false
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }


  editQuestion(id){
    this.router.navigate(['createQuestion', id])
  }
  }

