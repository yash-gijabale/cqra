import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "../common.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs"
export class AnswerView {
  constructor(
  public  pkAnswerIds: Number,
  public  schemeIdU: Number,
  public  buildingIdPkU: Number,
  public  fkTradeIdU: Number,
  public  pkSubgroupIdU: Number,
  public  questionHeadingIdU: Number,
  public  pkQuestionGroupIdU: Number,
  public  fkQuestionTypeIdU: Number,
  public  pkFloorIdU: Number,
  public  locationU: Number,
  public  pkUserIdU: Number,
  public  pkQuestionIdU: Number,
  public  answerU: String,
  public  remarkU: String,
  public  ans_date_u: String,
  public  usernameU: String,
  public  stageNameU: String,
  public  projectNameU: String,
  public  structureNameU: String,
  public  tradeNameU: String,
  public  subgroupNameU: String,
  public  questionGroupTextU: String,
  public  questionTextU: String
  ) {}
}

@Component({
  selector: "app-userlog-report-view",
  templateUrl: "./userlog-report-view.component.html",
  styleUrls: ["./userlog-report-view.component.css"],
})
export class UserlogReportViewComponent implements OnInit {
  data: string;
  pkAnswedIdJson: string;
  pkAnswerData : any

  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<AnswerView> = new Subject();
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };
    this.commonService.getMessage.subscribe((msg) => {
      this.pkAnswedIdJson = msg;
    });
    this.commonService.setMessage(this.pkAnswedIdJson);
    console.log(this.pkAnswedIdJson);

    this.commonService
      .getUserLogAnswers(JSON.parse(this.pkAnswedIdJson))
      .subscribe(
        (data) => {
          console.log(data)
          this.pkAnswerData = data
          this.dtTrigger.next()
        },
        (err) => console.log(err)
      );
}
}