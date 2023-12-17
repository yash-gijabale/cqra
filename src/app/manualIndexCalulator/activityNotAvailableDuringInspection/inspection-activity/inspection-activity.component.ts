import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute, Router} from '@angular/router';
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

  isLoading: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {

    this.isLoading = true
    this.snapAuditId = this.route.snapshot.params['id']

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
      this.dtTrigger.next();
      this.isLoading = false
      // setTimeout(
      //   function () {
      //   }.bind(this)
      // );
    }, 
    (err)=>{
      console.log(err)
    })
  }

  editInspaectionActivity(id)
  {
    this.router.navigate(['createActivityNotAvailableDuringInspection', this.snapAuditId, id])
  }

}
