import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { Subject } from "rxjs";
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ActivatedRoute, Router } from '@angular/router';


export class OffredArea{
  constructor(
    public offeredAreaId: number,
    public snapAuditId: number,
    public offeredAreaName: string
  ){}
}

@Component({
  selector: 'app-offred-area',
  templateUrl: './offred-area.component.html',
  styleUrls: ['./offred-area.component.css']
})
export class OffredAreaComponent implements OnInit {

  title:"datatables";
  @ViewChild(DataTableDirective)
  dtElement:DataTableDirective;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<OffredArea> = new Subject();

  offredArea:OffredArea[];
  snapAuditId:number
  offredId:number

  constructor(
    private clientService:ClientServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.snapAuditId = this.route.snapshot.params['id']
    this.offredId = this.route.snapshot.params['id2']

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true

    };

    this.clientService.getAllOfferedArea()
    .subscribe(data => {
      console.log(data)
      this.offredArea = data;
      setTimeout(
        function () {
          this.dtTrigger.next();
        }.bind(this)
      );
    })
  }

  editOffredArea(id)
  {
    this.router.navigate(['createOffredArea', this.snapAuditId, id])

  }

  deActivate(id)
  {
    let isDelete = confirm('Are you sure want to delete ?')
    if(isDelete)
    {
      this.clientService.deleteOfferedArea(id)
      .subscribe(data => {
        console.log('deleted')
      })
    }
  }

}
