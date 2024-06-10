import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/common.service';
// import { TradeMaintanceService } from '../trade-maintance.service';
@Component({
  selector: 'app-mockup-not-approved',
  templateUrl: './mockup-not-approved.component.html',
  styleUrls: ['./mockup-not-approved.component.css']
})
export class MockupNotApprovedComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Array<any>> = new Subject();
  constructor(
    private commonService: CommonService
  ) { }

  selProject:Number = 0
  selStatus:String = ''
  projects:Array<any>

  status = [
    {
      id:'p',
      value:'Pending'
    },
    {
      id:'ns',
      value:'Mail not send'
    },
    {
      id:'s',
      value:'Sent'
    },
    {
      id:'c',
      value:'Close'
    }
  ]

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25]
    };

    this.dtTrigger.next()

    this.commonService.getAllProject()
    .subscribe(data =>{
      this.projects = data
    })
  }


  load:boolean = false
  search(){
    this.load = true
  }

}
