import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { TradeMaintanceService } from "../trade-maintance.service";

export class QuestionHeading {
  constructor(
    public tardeId: number,
    public tradegroupId: number,
    public subgroupId: number,
    public questionGroupId: number,
    public questionHeadingId: number,
    public questionHeadingText: string,
    public status: boolean
  ) {}
}

export class QuestionHeadingView {
  constructor(
    public questionHeadingId: number,
    public questionHeadingText: string,
    public questionGroupText: string,
    public subgroupName: string,
    public tradeName: string
  ) {}
}

@Component({
  selector: "app-question-heading",
  templateUrl: "./question-heading.component.html",
  styleUrls: ["./question-heading.component.css"],
})
export class QuestionHeadingComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<QuestionHeadingView> = new Subject();

  questionHeaadings: QuestionHeading[];

  questionHeaadingsView: QuestionHeadingView[];

  constructor(
    private router: Router,
    private tradeMaintanceService: TradeMaintanceService
  ) {}

  ngOnInit() {
    this.tradeMaintanceService.getAllQuestionHeadings().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.questionHeaadingsView = data;

        // ADD THIS
        this.dtTrigger.next();
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  editQuestionHeading(id) {
    this.router.navigate(['createQuestionheading', id])
  }

  deActive(id)
  {
    let isDelete = confirm('Are you sure to delete ?')
    if(isDelete)
    {
      this.tradeMaintanceService.deleteQuestionHeading(id)
      .subscribe(
        data => {
          console.log('deleted')
          location.reload()
        },
        err => console.log(err)
      )
    }
  }
}
