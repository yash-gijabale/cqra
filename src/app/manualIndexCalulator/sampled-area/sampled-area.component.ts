import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientServiceService } from "src/app/service/client-service.service";

export class SampledArea {
  constructor(
    public sampledAreaId: number,
    public snapAuditId: number,
    public sampledAreaName: string
  ) {}
}
@Component({
  selector: "app-sampled-area",
  templateUrl: "./sampled-area.component.html",
  styleUrls: ["./sampled-area.component.css"],
})
export class SampledAreaComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SampledArea> = new Subject();

  snapAuditId: number;
  sampledAreaData: SampledArea;
  submitted:boolean = true;
  isLoading: boolean

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientServiceService,
    private router : Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };

    this.snapAuditId = this.route.snapshot.params["id"];
    this.clientService.getSampledAreaBySanapId(this.snapAuditId).subscribe(
      (data) => {
        console.log(data);
        this.sampledAreaData = data;
        this.dtTrigger.next();
        this.isLoading = false
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.snapAuditId);
  }


  editSampledArea(id)
  {
    this.router.navigate(['createSampledArea', this.snapAuditId, id])
  }

  deActivate(id)
  {
    let isDelete = confirm('Are your sure want to delete ?')
    if(isDelete)
    {
      this.clientService.deleteSampledArea(id)
      .subscribe(data =>{
        console.log('deleted')
        location.reload()
      })
    }
  }
}
