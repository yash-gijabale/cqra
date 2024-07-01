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

  isLoading: boolean


  constructor(
    private router: Router,
    private tradeMaintanceService: TradeMaintanceService
  ) { }

  ngOnInit() {

    this.isLoading = true

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 25]
    };

    this.tradeMaintanceService.getAllTrades().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.trades = data;
      this.dtTrigger.next();
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    })
  }

  editTrade(id) {
    this.router.navigate(['createTrade', id])
  }

  // deActivate(id) {
  //   let isDelete = confirm('Are you sure want to deactivate ?')
  //   if (isDelete) {
  //     this.tradeMaintanceService.deactivateTrade(id,false)
  //       .subscribe(data => {
  //         console.log('deactivated')
  //         location.reload()
  //       }, (err) => console.log(err))
  //   }
  // }

  deactivateTrade(id) {
    let deactive = confirm('Are you sure want to deactivate ?')
    if (deactive) {
      this.tradeMaintanceService.deactivateTrade(id, false)
        .subscribe(data => {
          console.log('deactivated', data)
          location.reload()
        }, (err) => console.log(err))
    }
  }

  activateTrade(id) {
    let active = confirm('Are you sure want to activate ?')
    if (active) {
      this.tradeMaintanceService.deactivateTrade(id, true)
        .subscribe(data => {
          console.log('activated', data)
          location.reload()
        }, (err) => console.log(err))
    }
  }


}
