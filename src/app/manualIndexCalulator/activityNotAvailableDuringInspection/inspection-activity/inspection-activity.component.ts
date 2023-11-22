import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute} from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';

export class InspectionActivity{
  constructor(
    public activiteId: number,
    public snapAuditId: number,
    public description: string
  ){}
}

@Component({
  selector: 'app-inspection-activity',
  templateUrl: './inspection-activity.component.html',
  styleUrls: ['./inspection-activity.component.css']
})
export class InspectionActivityComponent implements OnInit {
  title:"datatables";
  @ViewChild(DataTableDirective)
  dtElement:DataTableDirective;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<InspectionActivity> = new Subject();

  snapAuditId:number
  activityData:InspectionActivity[];

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };

    this.clientService.getAllInspectionActivity()
    .subscribe(data =>{
      console.log(data)
      this.activityData = data
      setTimeout(
        function () {
          this.dtTrigger.next();
        }.bind(this)
      );
    }, 
    (err)=>{
      console.log(err)
    })
  }

}
