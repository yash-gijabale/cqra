import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trade } from '../trade/trade.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
@Component({
  selector: 'app-project-trade-details',
  templateUrl: './project-trade-details.component.html',
  styleUrls: ['./project-trade-details.component.css']
})
export class ProjectTradeDetailsComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Trade> = new Subject();
  submitted: boolean =false
  projectId:number
  trades: Trade

  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };
    this.projectId = this.route.snapshot.params['id']
    this.tradeService.getProjectTradesScheme(this.projectId)
    .subscribe(
      data =>{
        console.log(data)
        this.trades = data
        this.dtTrigger.next()
        
      }
    )
  }

}
