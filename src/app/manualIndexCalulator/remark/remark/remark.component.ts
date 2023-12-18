import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { data } from 'jquery';

export class Remarks{
  constructor(
    public lastNoteId: number,
    public snapAuditId: number,
    public lastMoteText: string
  ){}
}

export class RemarkData{
  constructor(
    public snapAuditId: number,
    public lastMoteText: string
  ){}
}

@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.css']
})
export class RemarkComponent implements OnInit {
  title:"datatables";
  @ViewChild(DataTableDirective)
  dtElement:DataTableDirective;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<Remarks> = new Subject();

  snapAuditId:number
  remarkId: number
  remarksList: Remarks[]
  isLoading: boolean

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {

    this.isLoading = true;
    this.snapAuditId = this.route.snapshot.params['id']
    this.remarkId = this.route.snapshot.params['id2']

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      // scrollX:true

    };

    this.clientService.getRemarks(this.snapAuditId)
    .subscribe(data => {
      console.log(data)
      this.remarksList = data
      this.dtTrigger.next();
      this.isLoading = false;
    })
  }

  editRemark(id)
  {
    this.router.navigate(['createRemark', this.snapAuditId, id])
  }
  deActivate(id){
    let isDelete = confirm('Are you sure want ot delete')
    if(isDelete)
    {
      this.clientService.deleteRemark(id)
      .subscribe(data => {
        console.log('deleted')
      })
    }
  }
}
