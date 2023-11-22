import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';

export class NcBeanSAView{
  constructor(
    public ncNumber:number,
    public reportName: string,
    public projectName:string,
    public tradeName:string,
    public ncDescription:string,
    public status:string
    
  ){

  }
}

@Component({
  selector: 'app-ncclosure-sa',
  templateUrl: './ncclosure-sa.component.html',
  styleUrls: ['./ncclosure-sa.component.css']
})
export class NCClosureSAComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<NcBeanSAView> = new Subject();
  projects: ProjectData[];
  cycles;
  SelCycleId;
  trades:any;
  SelStatusId:any;
  
  reports:NcBeanSAView[];
  SelProjectId:string="0";
  SelTradeId:string="0";
  SelstatusId:string="0";
  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService,private commonService :CommonService) { }


  ngOnInit() {

    this.cycles=[{"cycleId":"0","cycleName":"Please select"},{"cycleId":"1","cycleName":"Monthly"},
    {"cycleId":"2","cycleName":"Quartly"},
    {"cycleId":"3","cycleName":"Annually"},
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

    getNCs(){
      alert("called=="+this.SelProjectId+"Cycle Id=="+this.SelCycleId);
    }

  }

