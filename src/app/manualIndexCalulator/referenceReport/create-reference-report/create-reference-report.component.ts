import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClientServiceService } from "src/app/service/client-service.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

export class referenceReportData {
  constructor(
    public snapAuditId: number,
    public referenceReportName: string
  ) { }
}

@Component({
  selector: "app-create-reference-report",
  templateUrl: "./create-reference-report.component.html",
  styleUrls: ["./create-reference-report.component.css"],
})
export class CreateReferenceReportComponent implements OnInit {
  snapAduditId: number;
  referenceReportId: number;
  reportForm: FormGroup;
  isLoad: boolean
  buttonLoad: boolean = false;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.snapAduditId = this.route.snapshot.params["id"];
    this.referenceReportId = this.route.snapshot.params["id2"];
    if (this.referenceReportId != -1) {
      this.isLoad = true
      this.clientService.retirveReferenceReport(this.referenceReportId)
        .pipe(first())
        .subscribe((x) => {
          this.reportForm.patchValue(x);
          this.isLoad = false;
          // this.loader = "";
        });
    }

    this.reportForm = this.formBuilder.group({
      referenceReportName: ["", Validators.required],
    });
  }
  get f() {
    return this.reportForm.controls;
  }

  onSubmit() {
    this.submitted = true
    if (this.reportForm.invalid) {
      return
    }
    let fromData = {
      snapAuditId: this.snapAduditId,
      referenceReportName: this.reportForm.value.referenceReportName,
    };
    console.log(fromData);
    if (this.referenceReportId != -1) {
      this.buttonLoad = true;
      this.clientService.updateReferenceNote(fromData, this.referenceReportId)
        .subscribe(data => {
          console.log('updated')
          this.buttonLoad = false
        })
    }else{
      this.clientService.createReferenceReport(fromData)
      .subscribe(
        data => console.log('created-->', data),
        err => console.log(err)
      )
    }
  }


}
