import { Component, OnInit, ViewChild } from "@angular/core";
import { clientStaffData } from "../create-client-staff/create-client-staff.component";
import { ClientServiceService } from "../service/client-service.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-client-staff",
  templateUrl: "./client-staff.component.html",
  styleUrls: ["./client-staff.component.css"],
})
export class ClientStaffComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<clientStaffData[]> = new Subject();

  staffData: clientStaffData[];

  isLoading:boolean

  constructor(
    private clientServices: ClientServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.isLoading = true

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };

    this.clientServices.getAllClientStaff().subscribe((data) => {
      console.log("ALL Staff==", data);
      this.staffData = data;
      this.dtTrigger.next()
      this.isLoading = false
    });
  }

  editClientStaff(id) {
    this.router.navigate(['createclientStaff', id])
  }
  deActivateClient(id) {
    const isDelete = confirm('Are you sure want to Deactivate ?')
    if (isDelete) {
      this.clientServices.deactivateClientStaff(id)
      .subscribe(
        data => {
          console.log('Deactivate !')
          location.reload();
        },
        err => console.log(err)
      )
    }
  }
}
