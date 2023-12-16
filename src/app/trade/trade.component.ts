import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';


export class Trade {
  constructor(
    public tardeId: number,
    public tradegroupId: number,
    public tradeName: string,
    public status: boolean

  ) {

  }
}

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Trade> = new Subject();

  trades: Trade[];

  constructor(private router: Router, private tradeMaintanceService: TradeMaintanceService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25]
    };

    this.tradeMaintanceService.getAllTrades().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.trades = data;

      // ADD THIS
      this.dtTrigger.next();

    }, (err) => {
      console.log('-----> err', err);
    })
  }

  editTrade(id) {
    this.router.navigate(['createTrade', id])
  }

  deActivate(id) {
    let isDelete = confirm('Are you sure want to delete')
    if (isDelete) {
      this.tradeMaintanceService.deleteTrade(id)
        .subscribe(data => {
          console.log('deleted')
          location.reload()
        }, (err) => console.log(err))
    }
  }

}
