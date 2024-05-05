import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import { TradeMaintanceService } from '../trade-maintance.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export class InspectionView {
  constructor(
    public id: number,
    public clientName: string,
    public projectName: string,
    public reportName: string,
    public assessmentDate: string,

  ) {

  }
}
@Component({
  selector: 'app-inspection-report',
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.css']
})
export class InspectionReportComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<InspectionView> = new Subject();

  snapAuditDetails: InspectionView;
  reports: InspectionView[];
  snapAuditId: number;
  isLoading: boolean

  drawingForm: FormGroup

  constructor(
    private router: Router, 
    private tradeMaintanceService: TradeMaintanceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.isLoading = true
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      scrollX: true

    };

    this.tradeMaintanceService.getAllInspectionReports().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.reports = data;
      this.dtTrigger.next();
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    })


    this.drawingForm = this.formBuilder.group({
      tradeId: ["", Validators.required],
      details: ["", Validators.required],
      number: ["", Validators.required],
      revision: ["", Validators.required],
    });
  }

  editReport(id) {
    // alert("SA ==" + id);
    this.router.navigate(['createinspection', id])

  }


  saveReport(filename: number): void {
    this.snapAuditDetails = this.reports.find(item => item.id === filename);
    this.tradeMaintanceService
      .saveReport(this.snapAuditDetails)
      .subscribe(blob => saveAs(blob, "Test.pdf"));
  }

  notifyClient(id) {

  }

  openNC(id) {

  }

  addFirstNote(id) {
    this.router.navigate(['firstNote', id])
  }
  getOfferdAerea(id) {
    this.router.navigate(['offredArea', id])

  }
  assessorNote(id) {
    this.router.navigate(['assessorName', id])
  }
  activityNotAvailable(id) {
    this.router.navigate(['activityNotAvailableDuringInspection', id])
  }

  getSampledArea(id) {
    this.router.navigate(['sampledArea', id])

  }

  getReferenceReport(id) {
    this.router.navigate(['referenceNote', id])

  }

  stageOfWork(id) {
    this.router.navigate(['stageOfWork', id])
  }

  getRemark(id) {
    this.router.navigate(['remarks', id])
  }

  getEquipUsedByCqra(id) {
    this.router.navigate(['userEquipment', id])
  }
  getEquipUsedByClient(id) {
    this.router.navigate(['equipUsedByClient', id])
  }
  getEquipUsedByContractor(id) {
    this.router.navigate(['equipUsedByContractor', id])

  }

  preSnapAuditProcess(id) {
    this.router.navigate(['preSnapAuditProccess', id])

  }

  currentSAId: Number
  setSnapId(id) {

    this.currentSAId = Number(id)

  }
}