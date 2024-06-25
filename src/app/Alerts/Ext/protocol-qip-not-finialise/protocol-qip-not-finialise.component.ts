import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ProjectData } from 'src/app/project/project.component';

@Component({
  selector: 'app-protocol-qip-not-finialise',
  templateUrl: './protocol-qip-not-finialise.component.html',
  styleUrls: ['./protocol-qip-not-finialise.component.css']
})
export class ProtocolQipNotFinialiseComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Array<any>> = new Subject();

  projects: ProjectData[] = []
  selProject:any

  constructor(
    private commonServies: CommonService
  ) { }

  status = [
    {
      id: 'p',
      value: 'Pending'
    },
    {
      id: 'ns',
      value: 'Mail not send'
    },
    {
      id: 's',
      value: 'Sent'
    },
    {
      id: 'c',
      value: 'Close'
    }
  ]

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25]
    };

    this.dtTrigger.next()

    this.commonServies.getAllProject().subscribe((data) => {
      this.projects = data
    })
  }

  load: boolean = false
  search() {
    this.load = true
  }

}
