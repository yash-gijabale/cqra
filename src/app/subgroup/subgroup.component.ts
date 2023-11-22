import { Component, ViewChild, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TradeMaintanceService } from '../trade-maintance.service';

export class Subgroup{
  constructor(
    public tardeId:number,
    public tradegroupId: number,
    public subgroupId:number,
    public subgroupName:string,
    public status: boolean
    
  ){

  }
}

export class SubgroupView{
  constructor(
    public subgroupId:string,
    public subgroupName: string,
    public tradeName: string,
    
    
  ){

  }
}

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css']
})
export class SubgroupComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SubgroupView> = new Subject();
subgroups : Subgroup[];

subgroupsView : SubgroupView[];
  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService) { }

  ngOnInit() {
   
    this.tradeMaintanceService.getAllSubgroups().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.subgroupsView= data;
    
      // ADD THIS
      this.dtTrigger.next();
    
    }, (err) => {
      console.log('-----> err', err);
    })
  }


}
