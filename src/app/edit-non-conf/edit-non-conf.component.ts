import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ClientData } from "../client/client.component";
import { CommonService } from "../common.service";
import { ProjectData } from "../project/project.component";
import { ClientServiceService } from "../service/client-service.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TradeMaintanceService } from "../trade-maintance.service";
import { Trade } from "../trade/trade.component";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

export class CheckListView {
  constructor(
    public tradeIdChecklist: number,
    public checkistIdChecklist: number,
    public checklistNameChecklist: string
  ) {}
}

export class EditNcsListView {
  constructor(
    public id: number,
    public remark: string,
    public location: any,
    public floorNo: number,
    public ansDate: string,
    public ncDescriptio: string
  ) {}
}

@Component({
  selector: "app-edit-non-conf",
  templateUrl: "./edit-non-conf.component.html",
  styleUrls: ["./edit-non-conf.component.css"],
})
export class EditNonConfComponent implements OnInit {

  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<EditNcsListView> = new Subject();

  SelClientId: string = "0";
  SelProjectId: string = "0";
  SelStructureId: string = "0";
  SelStageId: string = "0";
  SelTradeId: string = "0";
  SelChecklistId: string = "0";
  SelQuestionGroupId: string = "0";
  SelQuestionId: string = "0";
  projects: ProjectData[];
  structures: any;
  fromDate: any;
  toDdate: any;

  stages: any;
  trades: any;
  checklists: any;
  // registerForm: FormGroup;
  checklist: any;
  questiongroups: any;
  questions: any;
  clients: ClientData[];
  submitted = false;

  allTrades: Trade[];
  editNcsList: EditNcsListView[];

  constructor(
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tradeService: TradeMaintanceService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      scrollX: true,
    };
    this.clientServiceService.getAllClients().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.clients = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.tradeService.getAllTrades().subscribe(
      (data) => (this.allTrades = data),
      (err) => console.log(err)
    );
  }

  getProjects() {
    alert(this.SelClientId);
    this.commonService.getClientProject(this.SelClientId).subscribe(
      (data) => {
        console.log("Project Data==", data);
        this.projects = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  getStructures() {
    alert(this.SelProjectId);
    this.commonService
      .getStructures(this.SelClientId, this.SelProjectId)
      .subscribe(
        (data) => {
          console.log("Structure Data==", data);
          this.structures = data;
        },
        (err) => {
          console.log("-----> err", err);
        }
      );
  }

  getStages() {
    alert("Structure =" + this.SelProjectId + " stage=" + this.SelStructureId);
    this.commonService
      .getStages(this.SelClientId, this.SelProjectId, this.SelStructureId)
      .subscribe(
        (data) => {
          console.log("stage Data==", data);
          this.stages = data;
        },
        (err) => {
          console.log("-----> err", err);
        }
      );
  }

  getTrades() {
    alert("Structure =" + this.SelProjectId + " stage=" + this.SelStructureId);
    this.commonService
      .getTrades(this.SelProjectId, this.SelStructureId)
      .subscribe(
        (data) => {
          console.log("stage Data==", data);
          this.trades = data;
        },
        (err) => {
          console.log("-----> err", err);
        }
      );
  }

  getChecklist() {
    alert("Structure =" + this.SelProjectId + " stage=" + this.SelStructureId);
    this.tradeService.getChecklistByTrade(this.SelTradeId).subscribe(
      (data) => {
        console.log("checklist Data==", data);
        this.checklists = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  getQuestionGroup() {
    this.tradeService.getQuestiongroupById(this.SelChecklistId).subscribe(
      (data) => {
        console.log("Question group Data==", data);
        this.questiongroups = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  getQuestions() {
    alert("Structure =" + this.SelProjectId + " stage=" + this.SelStructureId);
    this.tradeService.getQuestionById(this.SelQuestionGroupId).subscribe(
      (data) => {
        console.log("Question Data==", data);
        this.questions = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  // get f() {
  //   return this.registerForm.controls;
  // }

  onSubmit() {
    console.log("SUCCESS!!");
    let formData = {
      clientID: this.SelClientId,
      projectId: this.SelProjectId,
      structureId: this.SelStructureId,
      stageId: this.SelStageId,
      tradeId: this.SelTradeId,
      checklistId: this.SelChecklistId,
      questionGroupId: this.SelQuestionGroupId,
      questionID: this.SelQuestionId,
      fromDate: this.fromDate,
      toDate: this.toDdate,
    };
    console.log(formData);

    this.tradeService
      .getEditNcsReportList(this.SelStageId, this.fromDate)
      .subscribe((data) => {
        console.log(data);
        this.editNcsList = data;
        this.dtTrigger.next()
      },
      err => {
        console.log(err)
      });
  }
}
