import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ClientServiceService } from 'src/app/service/client-service.service';

export class AssessorName{
  constructor(
    public assessorsId: number,
    public snapAuditId: number,
    public assessordName: string
  ){}
}

@Component({
  selector: 'app-accessor-name',
  templateUrl: './accessor-name.component.html',
  styleUrls: ['./accessor-name.component.css']
})
export class AccessorNameComponent implements OnInit {

  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<AssessorName> = new Subject();

  snapAduditId:number
  assessorNameList: AssessorName[]
  isLoading: boolean
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {

    this.isLoading = true
    this.snapAduditId = this.route.snapshot.params['id']

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };

    this.clientService.getAllAssessorName(this.snapAduditId)
    .subscribe(data => {
      console.log(data)
      this.assessorNameList = data;
      this.dtTrigger.next();
      this.isLoading = false
    })
  }

  editAssessorName(id)
  {
    this.router.navigate(['createAssessorName', this.snapAduditId, id])
  }

  deActivate(id)
  {
    this.clientService.deleteAssessorName(id)
    .subscribe(data => {
      console.log('deleted')
      location.reload();
    })
  }
}
