import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';

export class StageOfWork{
  constructor(
    public qualityRecommand: number,
    public snapAuditId: number,
    public qualityRecommandationText: string
  ){}
}

export class StageOfWorkData{
  constructor(
    public snapAuditId: number,
    public qualityRecommandationText: string,
  ){}
}

@Component({
  selector: 'app-stage-of-work',
  templateUrl: './stage-of-work.component.html',
  styleUrls: ['./stage-of-work.component.css']
})
export class StageOfWorkComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<StageOfWork> = new Subject();

  snapAuditId: number
  stageOfWorksList:StageOfWork[]
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };

    this.clientService.getAllStageOfWork(this.snapAuditId)
    .subscribe(data => {
      console.log(data)
      this.stageOfWorksList = data;
      setTimeout(
        function () {
          this.dtTrigger.next();
        }.bind(this)
      );
    })
  }

  editStageOfWork(id)
  {
    console.log(id)
    this.router.navigate(['createStageOfWork', this.snapAuditId, id])
  }

  deActivate(id)
  {
    let isDelete = confirm('Are you sure want to delete ?')
    if(isDelete)
    {
      this.clientService.deleteStageOfWork(id)
      .subscribe(data => {
        console.log('deleted')
      }, (err) => console.log(err))
    }
  }


}
