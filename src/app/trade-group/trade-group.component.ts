import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { TradeMaintanceService } from '../trade-maintance.service';

export class TradeGroup {
  constructor(
    public tradegroupId: number,
    public tradeName: string,
    public status: boolean

  ) {

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

  tradeGroups: TradeGroup[];

  isLoading: boolean

  constructor(private router: Router, private tradeMaintanceService: TradeMaintanceService) { }

  ngOnInit() {

    this.isLoading = true

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 25]
    };

    this.tradeMaintanceService.getAllTradeGroups().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.tradeGroups = data;
      this.dtTrigger.next();
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    })


  }

  editTrade(id) {
    console.log(id)
    this.router.navigate(['createTradegroup', id])
  }
  // deActivate(id) {
  //   let isDelete = confirm('Are you sure want to deactive?')
  //   if (isDelete) {
  //     this.tradeMaintanceService.deactivateTradeGroup(id)
  //       .subscribe(data => location.reload())
  //   }
  // }

  deactivateTradegroup(id) {
    let deactive = confirm('Are you sure want to deactive?')
    if (deactive) {
      this.tradeMaintanceService.deactivateTradeGroup(id, false)
        // .subscribe(data => location.reload())
        .subscribe((data) => {
          console.log('deactivated..', data)
          location.reload()
        })
    }
  }

  activateTradegroup(id) {
    let active = confirm('Are you sure want to active?')
    if (active) {
      this.tradeMaintanceService.deactivateTradeGroup(id, true)
        // .subscribe(data => location.reload())
        .subscribe((data) => {
          console.log('activated..', data)
          location.reload()
        })
    }
  }

}
