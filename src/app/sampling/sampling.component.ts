import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientServiceService } from '../service/client-service.service';
import { SamplingView } from '../create-sampling/create-sampling.component';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.css']
})
export class SamplingComponent implements OnInit {


  allSampling : SamplingView[]
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SamplingView> = new Subject();
  constructor(
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };

    this.clientService.getAllSamplingView()
    .subscribe(data => {
      console.log(data)
      this.allSampling = data
      this.dtTrigger.next()
    },
    err => console.log(err))
  }

}
