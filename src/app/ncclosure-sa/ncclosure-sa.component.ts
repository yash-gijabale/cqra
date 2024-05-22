import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { CommonService } from "../common.service";
import { ProjectData } from "../project/project.component";
import { TradeMaintanceService } from "../trade-maintance.service";
import { Trade } from "../trade/trade.component";
import { data } from "jquery";



export class NcBeanSAView {
  constructor(
    public ncNumber: number,
    public reportName: string,
    public projectName: string,
    public tradeName: string,
    public ncDescription: string,
    public status: string
  ) {}
}

export class NcBeanData{
  constructor(
      public  id_nc_bean_sa:  number,
      public  projectIdNcBeanSa: number,
      public  tradeIdNcBeanSa: number,
      public  statusNcBeanSa: string,
      public  cycleINcBeanSa: number,
      public  locationNcBeanSa: string,
      public  nc_number_nc_bean_sa: string,
      public  projectNameProjects: string,
      public  tradeNameTrade:String,
      public  remarkNcBeanSa: string,
      public  ncClosureDateNcBeanSa: string,
      public  nc_closure_comment_nc_bean_sa: string
  ){}
}

export class RegionList{
  constructor(
    public regionId: number,
    public regionName: string,
    public displayName: string
  ) {}
}

export class CycleOfInspection{
  constructor(
    public cycle_id : number,
    public cycle_name: string,
    public cycle_type: string
  ){}
}

@Component({
  selector: "app-ncclosure-sa",
  templateUrl: "./ncclosure-sa.component.html",
  styleUrls: ["./ncclosure-sa.component.css"],
})
export class NCClosureSAComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<NcBeanSAView> = new Subject();
  projects: ProjectData[];
  cycles;
  status;
  SelCycleId: any;
  trades: any;
  SelStatusId: any;
  selRegion:any

  reports: NcBeanSAView[];
  SelProjectId: string = "0";
  SelTradeId: string = "0";
  SelstatusId: string = "0";
  ncsReports: NcBeanData[];
  
  regions:RegionList[]
  cycleOfInspection: CycleOfInspection[]
  constructor(
    private router: Router,
    private tradeMaintanceService: TradeMaintanceService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.cycles = [
      { cycleId: "0", cycleName: "Please select" },
      { cycleId: "1", cycleName: "Monthly" },
      { cycleId: "2", cycleName: "Quartly" },
      { cycleId: "3", cycleName: "Annually" },
    ];

    this.status = [
      {statusId:'o', statusName:'Open'},
      {statusId:'IR', statusName:'Send For Review'},
      {statusId:'RS', statusName:'Sent Back by Reviewer'},
      {statusId:'AS', statusName:'Sent Back by Approver'},
      {statusId:'RA', statusName:'Sent for Approval'},
      {statusId:'c', statusName:'Closed'},
    ];

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      scrollX: true,
    };

    this.commonService.getAllProject().subscribe(
      (data) => {
        // console.log("Project Data==", data);
        this.projects = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.commonService.getAllRegions()
    .subscribe(data => {
      console.log('region--->', data)
      this.regions = data;
    })

    this.commonService.getAllCycleOfInspection()
    .subscribe(data =>{
      console.log('cycle of inspection',data)
      this.cycleOfInspection = data
    })

    this.tradeMaintanceService.getAllNCsforSA().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.reports = data;

        // ADD THIS
        this.dtTrigger.next();
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  getProjectTrades() {
    this.tradeMaintanceService.getProjectTrades(this.SelProjectId)
    .subscribe(data => {
      console.log(data)
      this.trades = data
    })
  }

  getNCs() {
    // alert("called=="+this.SelProjectId+"Cycle Id=="+this.SelCycleId);
    let formData = {
      locationNcBeanSa:Number(this.selRegion),
      projectIdNcBeanSa: Number(this.SelProjectId),
      cycleINcBeanSa: Number(this.SelCycleId),
      tradeIdNcBeanSa: Number(this.SelTradeId),
      statusNcBeanSa: this.SelStatusId
    };

    this.tradeMaintanceService.getNcsByReportId(this.SelProjectId, this.SelTradeId, this.SelStatusId , this.SelCycleId, this.selRegion)
    .subscribe(data => {
      console.log(data)
      this.ncsReports = data
    })
    console.log(formData);
  }
  editReport(id)
  {
    console.log(id)
    this.router.navigate(['editNcCloserReport',id])
    
  }
}
