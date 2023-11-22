import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';


export class QuestionGroup{
  constructor(
    public tardeId:number,
    public tradegroupId: number,
    public subgroupId:number,
    public questionGroupId:number,
    public questionGroupText:string,
    public status: boolean
    
  ){

  }
}

export class QuestionGroupView{
  constructor(
    
    public questionGroupId:number,
    public questionGroupText:string,
    public tradeName:string,
    public subgroupName:string,
    
  ){

  }
}

@Component({
  selector: 'app-question-group',
  templateUrl: './question-group.component.html',
  styleUrls: ['./question-group.component.css']
})
export class QuestionGroupComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<QuestionGroup> = new Subject();
  questionGroups:QuestionGroup[];

  questionGroupsView:QuestionGroupView[];
  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService) { }

  ngOnInit() {
    
    this.tradeMaintanceService.getAllQuestionGroups().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.questionGroupsView= data;
    
      // ADD THIS
      this.dtTrigger.next();
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }

}
