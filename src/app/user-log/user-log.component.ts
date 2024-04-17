import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { CommonService } from "../common.service";
import { ProjectData, ProjectView } from "../project/project.component";
import { ClientServiceService } from "../service/client-service.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { NavigationExtras } from "@angular/router";
export class UserView {
  constructor(
    public userId: number,
    public userName: string,
    public userFullName: string,
    public email: string
  ) { }
}

export class UserLogDataView {
  constructor(
    public userIdU: number,
    public tradeIdU: number,
    public projectIdU: number,
    public structureIdU: number,
    public ansDateU: string,
    public usernameU: string,
    public projectNameU: String,
    public tradeNameU: string,
    public structureNameU: string,
    public c: number
  ) { }
}

export class navState {
  constructor(public state: string) { }
}

@Component({
  selector: "app-user-log",
  templateUrl: "./user-log.component.html",
  styleUrls: ["./user-log.component.css"],
})
export class UserLogComponent implements OnInit {
  SelClientId: string = "0";
  SelProjectId = [];
  SelRuserId = [];
  fromDate: string = "0";
  toDdate: string = "0";
  users: UserView[];
  reginalmanagerUsers: UserView[];
  projectForm: FormGroup;
  rProjects: ProjectData[];

  userLogDetails: UserLogDataView[];

  submitted = false;

  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<UserLogDataView> = new Subject();

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };
    this.projectForm = this.formBuilder.group({
      userId: ["", Validators.required],
      projectStartDate: ["", Validators.required],
      projectEndDate: ["", Validators.required],
    });

    this.clientService.getRegionalManagers().subscribe(
      (data) => {
        console.log("Rgional Manager Data==", data);
        // this.users= data;
        this.reginalmanagerUsers = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.commonService.getUsers().subscribe(
      (data) => {
        console.log("User Data==", data);
        this.users = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }
  getProjects() {
    alert(this.SelClientId);
    this.commonService.getAllProject().subscribe(
      (data) => {
        console.log("Project Data==", data);
        this.rProjects = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  get f() {
    return this.projectForm.controls;
  }

  loadUserLog: boolean = false
  onSubmit() {
    alert(
      this.SelProjectId +
      " TO " +
      this.SelRuserId +
      " Date " +
      this.fromDate +
      "To" +
      this.toDdate
    );

    this.loadUserLog = true

    this.commonService.getUserLogData(this.SelProjectId, this.SelRuserId, this.fromDate, this.toDdate).subscribe(
      (data) => {
        // console.log(data)
        this.userLogDetails = data;
        this.dtTrigger.next();
        this.loadUserLog = false
      },
      (err) => {
        console.log(err)
        this.loadUserLog = false

      }
    );
  }

  getList(data) {
    const pkAnswerIds = JSON.parse("[" + data + "]");

    const jsonData = JSON.stringify({
      pkAnswerIds,
    });

    this.commonService.setMessage(jsonData);
    sessionStorage.setItem("pkId", jsonData);
    this.router.navigate(["userlogReportView"]);
  }
}
