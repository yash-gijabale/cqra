import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientServiceService } from "src/app/service/client-service.service";

export class RefereneceReport {
  constructor(
    public referenceReportId: number,
    public snapAuditId: number,
    public referenceReportName: string
  ) { }
}
@Component({
  selector: "app-reference-report",
  templateUrl: "./reference-report.component.html",
  styleUrls: ["./reference-report.component.css"],
})
export class ReferenceReportComponent implements OnInit {
  title: "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<RefereneceReport> = new Subject();

  snapAuiditId: number;
  referenceReport: RefereneceReport[];
  isLoading: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true,
    };

    this.snapAuiditId = this.route.snapshot.params["id"];
    this.clientService.getAllReferenceReport(this.snapAuiditId).subscribe((data) => {
      console.log(data);
      this.referenceReport = data;
      this.dtTrigger.next();
      this.isLoading = false

      // setTimeout(
      //   function () {
      //     this.dtTrigger.next();
      //   }.bind(this)
      // );
    });
  }

  editReport(id) {
    this.router.navigate(['createReferenceNote', this.snapAuiditId, id])
  }
  deActive(id) {
    let isDelete = confirm('Are you sure want to delete ?')
    if (isDelete) {
      this.clientService.deleteReferenceReport(id)
        .subscribe(data => {
          console.log('deleted')
          location.reload()
        })
    }
  }
}
