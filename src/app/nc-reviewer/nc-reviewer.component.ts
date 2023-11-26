import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from '../common.service';
import { NcBeanSAView } from '../ncclosure-sa/ncclosure-sa.component';
import { ProjectData } from '../project/project.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { RegionList, CycleOfInspection, NcBeanData } from '../ncclosure-sa/ncclosure-sa.component';
@Component({
  selector: 'app-nc-reviewer',
  templateUrl: './nc-reviewer.component.html',
  styleUrls: ['./nc-reviewer.component.css']
})
export class NcReviewerComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<NcBeanSAView> = new Subject();
  projects: ProjectData[];
  cycles;
  status;
  SelCycleId:any;
  trades:any;
  reports:NcBeanSAView[];
  SelProjectId:string="0";
  selRegion:any
  SelTradeId:any
  SelStatusId:any

  regions:RegionList[]
  cycleOfInspection: CycleOfInspection[]
  ncsReports: NcBeanData[];

  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService,private commonService :CommonService) { }

  ngOnInit() {
    

    this.cycles=[{"cycleId":"0","cycleName":"Please select"},{"cycleId":"1","cycleName":"Monthly"},
    {"cycleId":"2","cycleName":"Quartly"},
    {"cycleId":"3","cycleName":"Annually"},
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
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      scrollX: true
    };

    this.commonService.getAllProject()
    .subscribe(
      (data) => {
      console.log('Project Data==',data)
      this.projects= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })

    this.tradeMaintanceService.getAllNCsforSA().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.reports= data;
    
      // ADD THIS
      this.dtTrigger.next();
    
    }, (err) => {
      console.log('-----> err', err);
    })

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
  }

  getProjectTrades(){
      
    this.commonService.getProjectTrades(this.SelProjectId)
    .subscribe(
      (data) => {
      console.log('stage Data==',data)
      this.trades= data;
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  getNCs() 
  {
    this.tradeMaintanceService.getNcsByReportId(this.SelProjectId, this.SelTradeId, this.SelStatusId , this.SelCycleId, 'mumbai')
    .subscribe(data => {
      console.log(data)
      this.ncsReports = data
      this.dtTrigger.next()
    })
  }

}
