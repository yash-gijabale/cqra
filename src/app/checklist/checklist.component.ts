import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';

export class Checklist{
  constructor(
    
    public checklistId:number,
    public checklistName:string,
    public tradeName:string,
    
    
  ){

  }
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Checklist> = new Subject();

  checklists:Checklist[];

  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService) { }

  ngOnInit() {
    this.tradeMaintanceService.getAllChecklist().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.checklists= data;
    
      // ADD THIS
      this.dtTrigger.next();
    
    }, (err) => {
      console.log('-----> err', err);
    })
    
  }

}
