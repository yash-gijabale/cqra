import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';

export class TradeGroup{
  constructor(
    public tradegroupId:number,
    public tradeName: string,
    public status: boolean
    
  ){

  }
}

@Component({
  selector: 'app-trade-group',
  templateUrl: './trade-group.component.html',
  styleUrls: ['./trade-group.component.css']
})
export class TradeGroupComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<TradeGroup> = new Subject();

  tradeGroups:TradeGroup[];
  constructor(private router: Router,private tradeMaintanceService :TradeMaintanceService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25]
    };

    this.tradeMaintanceService.getAllTradeGroups().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.tradeGroups= data;
    
      // ADD THIS
      this.dtTrigger.next();
    
    }, (err) => {
      console.log('-----> err', err);
    })
  
    
  }

}
