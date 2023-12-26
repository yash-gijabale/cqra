import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';

export class SnggingView{
  constructor(
    public clientName:string,
    public projectName: string,
    public reportName:string,
    public assessmentDate:string,
    
  ){

  }
}
@Component({
  selector: 'app-snagging-report',
  templateUrl: './snagging-report.component.html',
  styleUrls: ['./snagging-report.component.css']
})
export class SnaggingReportComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SnggingView> = new Subject();


  reports:SnggingView[];

  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService) { }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      scrollX: true
    };

    this.tradeMaintanceService.getAllSnggingReports().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.reports= data;
    
      // ADD THIS
      this.dtTrigger.next();
    
    }, (err) => {
      console.log('-----> err', err);
    })
    }

    nameOfInspector(id){
      this.router.navigate(['assessorName', id])
    }

    inspectedArea(id){
      this.router.navigate(['sampledArea', id])

    }
    reportOverview(id){
      this.router.navigate(['firstNote', id])
      
    }
    activityNotAvaialable(id){
      this.router.navigate(['stageOfWork', id])

    }

    remark(id){
      this.router.navigate(['lastNotes', id])

    }
  }


