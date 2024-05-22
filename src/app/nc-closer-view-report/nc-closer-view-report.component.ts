import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TradeMaintanceService } from "../trade-maintance.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Trade } from "../trade/trade.component";
import { SnackBarComponent } from "../loader/snack-bar/snack-bar.component";
// import { error } from "console";
export class NcReportDetails {
  constructor(
    public id: number,
    public projectId: number,
    public structureId: number,
    public stage: number,
    public answer_id: number,
    public queGroup: number,
    public subgroupId: number,
    public tradeId: number,
    public severity: string,
    public ncNumber: number,
    public status: string,
    public ncOpenDate: string,
    public contractorId: number,
    public fcReason: string,
    public fcReason1: string,
    public ncImage1: string,
    public ncImage2: string,
    public image1: string,
    public image2: string,
    public firstLevelAnalysis: string,
    public secondLevelAnalysis: string,
    public thirdLevelAnalysis: string,
    public fourthLevelAnalysis: string,
    public fifthLevelAnalysis: string,
    public sixthLevel: string,
    public priReason: number,
    public priExtra: string,
    public secReason: number,
    public secExtra: string,
    public technicalSolution: string,
    public managemantSolution: string,
    public resourceRequired: string,
    public planAction: string,
    public responsiblePerson: string,
    public targetDate: string,
    public actionTaken: string,
    public tillDate: string,
    public correctiveAction: string,
    public ncClosureDate: string,
    public ncClosureComment: string,
    public ncUpdateDate: string,
    public contractorName: string,
    public rectification: string,
    public rectStatus: string,
    public extQue: string,
    public impactOnQuality: string,
    public extNcText: string,
    public location: string,
    public remark: string,
    public ncType: number,
    public sendBack: string,
    public sendBack1: string,
    public enteredBy: string,
    public closerEmail: string,
    public ncClosureComment1: string,
    public pkAnswerIds: string,
    public snapAuditId: number,
    public image3: string,
    public image4: string,
    public image5: string,
    public image6: string,
    public correctiveActionForNonRecurrence: string,
    public preventiveActionPlanForNonoccurence: string,
    public technicalSolution2: string,
    public costImpact: string,
    public managementSolution: string,
    public approvedPlan: string,
    public fileName: string,
    public approverId: number,
    public reviewerId: number,
    public cycleId: number,
    public frq: string,
    public projectName: string,
    public tradeName: string
  ) { }
}

@Component({
  selector: "app-nc-closer-view-report",
  templateUrl: "./nc-closer-view-report.component.html",
  styleUrls: ["./nc-closer-view-report.component.css"],
})
export class NcCloserViewReportComponent implements OnInit {
  ncReportId: number;
  ncReportForm: FormGroup;
  trades: Trade[];
  submitted: boolean

  nscReport: NcReportDetails[];
  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeMaintanceService,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {
    this.ncReportId = this.route.snapshot.params["id"];

    this.tradeService
      .getNcReportById(this.ncReportId)
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        this.ncReportId = data[0].id
        this.ncReportForm.patchValue(data[0]);
      });

    this.tradeService.getAllTrades().subscribe(
      (data) => {
        console.log("trades --->", data);
        this.trades = data;
      },
      (err) => console.log(err)
    );

    this.ncReportForm = this.formBuilder.group({
      ncOpenDate: ["", Validators.required],
      ncNumber: ["", Validators.required],
      tradeId: ["", Validators.required],
      ncClosureComment: ["", Validators.required],
      severity: ["", Validators.required],
      frq: ["", Validators.required],
      rectification: ["", Validators.required],
      rectStatus: ["", Validators.required],
      priReason: ["", Validators.required],
      firstLevelAnalysis: ["", Validators.required],
      secondLevelAnalysis: ["", Validators.required],
      thirdLevelAnalysis: ["", Validators.required],
      secReason: ["", Validators.required],
      fourthLevelAnalysis: ["", Validators.required],
      fifthLevelAnalysis: ["", Validators.required],
      sixthLevel: ["", Validators.required],
      technicalSolution: ["", Validators.required],
      resourceRequired: ["", Validators.required],
      responsiblePerson: ["", Validators.required],
      correctiveAction: ["", Validators.required],
      costImpact: ["", Validators.required],
      enteredBy: ["", Validators.required],
      reviewerId: ["", Validators.required],
      ncClosureDate: ["", Validators.required],
      ncId: ["", Validators.required],
    });
  }

  get f() {
    return this.ncReportForm.controls;
  }

  submitLoad: boolean = false
  onSubmit() {
    this.submitLoad = true
    console.log(this.ncReportId);
    let id = this.ncReportId;
    let form = { ...this.ncReportForm.value, id: Number };
    form.id = id;
    // let form = {
    // correctiveAction: this.ncReportForm.value.correctiveAction,
    // costImpact: this.ncReportForm.value.costImpact,
    // enteredBy: this.ncReportForm.value.enteredBy,
    // fifthLevelAnalysis: this.ncReportForm.value.fifthLevelAnalysis,
    // firstLevelAnalysis: this.ncReportForm.value.firstLevelAnalysis,
    // fourthLevelAnalysis: this.ncReportForm.value.fourthLevelAnalysis,
    // frq: this.ncReportForm.value.frq,
    // id: this.ncReportId,
    // ncClosureComment: this.ncReportForm.value.ncClosureComment,
    // ncClosureDate: this.ncReportForm.value.ncClosureDate,
    // ncNumber: this.ncReportForm.value.ncNumber,
    // ncOpenDate: this.ncReportForm.value.ncOpenDate,
    // priReason: this.ncReportForm.value.priReason,
    // rectStatus: this.ncReportForm.value.rectStatus,
    // rectification: this.ncReportForm.value.rectification,
    // resourceRequired: this.ncReportForm.value.resourceRequired,
    // responsiblePerson: this.ncReportForm.value.responsiblePerson,
    // reviewerId: this.ncReportForm.value.reviewerId,
    // secReason:  this.ncReportForm.value.secReason,
    // secondLevelAnalysis:  this.ncReportForm.value.secondLevelAnalysis,
    // severity:  this.ncReportForm.value.severity,
    // sixthLevel:  this.ncReportForm.value.sixthLevel,
    // technicalSolution: this.ncReportForm.value.technicalSolution,
    // thirdLevelAnalysis: this.ncReportForm.value.thirdLevelAnalysis,
    // tradeId: this.ncReportForm.value.tradeId
    // }
    console.log(form);

    this.tradeService.updateNcReport(form, this.ncReportId).subscribe(
      (data) => {
        console.log("updaeted->>>", data)
        this.submitLoad = false
        this.snackBar.showSuccess('Nc Updated')
      },
      (err) => {
        console.log(err)
        this.submitLoad = false
        this.snackBar.showSnackError()
      }
    );
  }
}
