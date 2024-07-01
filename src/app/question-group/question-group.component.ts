import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';


export class QuestionGroup {
  constructor(
    public tardeId: number,
    public tradegroupId: number,
    public subgroupId: number,
    public questionGroupId: number,
    public questionGroupText: string,
    public status: boolean

  ) {

  }
}

export class QuestionGroupView {
  constructor(

    public questionGroupId: number,
    public questionGroupText: string,
    public tradeName: string,
    public subgroupName: string,

  ) {

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
  questionGroups: QuestionGroup[];
  questionGroupsView: QuestionGroupView[];

  isLoading: boolean
  constructor(private router: Router, private tradeMaintanceService: TradeMaintanceService) { }

  ngOnInit() {

    this.isLoading = true
    this.tradeMaintanceService.getAllQuestionGroups().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.questionGroupsView = data;
      this.dtTrigger.next();
      this.isLoading = false
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  editQuestionGroup(id) {
    this.router.navigate(['createQuestiongroup', id])
  }

  // deActivate(id) {
  //   let isDelete = confirm('Are you sure want to delete ?')
  //   if (isDelete) {
  //     this.tradeMaintanceService.deactivateQuestionGroup(id)
  //       .subscribe(
  //         (data) => {
  //           console.log('Deactivated')
  //           location.reload()
  //         },
  //         (err) => console.log(err)
  //       )
  //   }
  // }

  deactivateQgroup(id) {
    let deactive = confirm('Are you sure want to deactive ?')
    if (deactive) {
      this.tradeMaintanceService.deactivateQuestionGroup(id, false)
        .subscribe(
          (data) => {
            console.log('Deactivated', data)
            location.reload()
          },
          (err) => console.log(err)
        )
    }
  }

  activateQgroup(id) {
    let active = confirm('Are you sure want to active ?')
    if (active) {
      this.tradeMaintanceService.deactivateQuestionGroup(id, true)
        .subscribe(
          (data) => {
            console.log('activated', data)
            location.reload()
          },
          (err) => console.log(err)
        )
    }
  }

}
