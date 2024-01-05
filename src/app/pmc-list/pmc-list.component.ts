import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ContractorData } from '../contractor-forman/contractor-forman.component';
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
  dtTrigger: Subject<ContractorData> = new Subject();
  constructor() { }

  ngOnInit() {
  }

}
