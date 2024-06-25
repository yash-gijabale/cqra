import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientServiceService } from '../service/client-service.service';
// import { SamplingView } from '../create-sampling/create-sampling.component';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { Router } from '@angular/router';
@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.css']
})
export class SamplingComponent implements OnInit {


  allSampling: any
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  isLoading: boolean;
  constructor(
    private clientService: ClientServiceService,
    private router: Router
  ) { }

  ngOnInit() {

    this.isLoading = true;

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
        this.isLoading = false
      },
        err => console.log(err))
  }

  editSamplping(id) {
    this.router.navigate(['createSampling', id])
  }

  deleteSampling(id) {
    const isDelete = confirm('Are you sure want to delete?')
    if (isDelete) {
      this.clientService.deleteSampling(id)
        .subscribe(
          data => {
            console.log('deleted !')
            location.reload()
          },
          err => console.log(err)
        )
    }
  }

}
