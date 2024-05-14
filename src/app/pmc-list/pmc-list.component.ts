import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ClientServiceService } from '../service/client-service.service';
import { Router } from '@angular/router';

export class PmcView {
  constructor(
    public pmcId: number,
    public pmcName: string,
    public pmcAddress: string,
    public pmcEmail: string,
    public pmcPhone: string,
    public projectId: number,
    public clientId: number,
    public gstNumber: string
  ) {

  }
}
@Component({
  selector: 'app-pmc-list',
  templateUrl: './pmc-list.component.html',
  styleUrls: ['./pmc-list.component.css']
})
export class PmcListComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<PmcView> = new Subject();
  isLoading: boolean = true
  pmcs: PmcView
  constructor(
    private clientService: ClientServiceService,
    private router: Router
  ) { }

  ngOnInit() {

    this.isLoading = true
    this.clientService.getAllPmcs()
      .subscribe(data => {
        console.log(data)
        this.pmcs = data
        this.isLoading = false
        this.dtTrigger.next()
      })
  }
  editPmc(id) {
    this.router.navigate(['createpmc', id])
  }

  deactivatePmc(id) {
    this.clientService.deletePmc(id)
      .subscribe(data => {
        console.log('deleted')
        location.reload()
      })
  }
}
