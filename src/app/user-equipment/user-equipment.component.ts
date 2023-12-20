import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Route } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { UserService } from "../service/user.service";
import { ClientServiceService } from "../service/client-service.service";

export class UserView {
  constructor(
    public userId: number,
    public userName: string,
    public userFullName: string,
    public email: string
  ) { }
}

export class EquipmentList {
  constructor(
    public equipmentId: number,
    public snapAuditId: number,
    public description: string,
    public remark: string,
    public image1: string,
    public image2: string,
    public source_from: number,
    public user_id: number
  ) { }
}

export class EquipmentData {
  constructor(
    public snapAuditId: number,
    public description: string,
    public remark: string,
    public image1: string,
    public image2: string,
  ) { }
}

@Component({
  selector: "app-user-equipment",
  templateUrl: "./user-equipment.component.html",
  styleUrls: ["./user-equipment.component.css"],
})
export class UserEquipmentComponent implements OnInit {
  snapAuditId: number;
  euipUsedList: EquipmentList[];

  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<EquipmentList> = new Subject();

  isLoading: boolean

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.snapAuditId = this.route.snapshot.params["id"];
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true
    };

    this.clientService.getEquipUsedByCqra(this.snapAuditId)
      .subscribe(data => {
        console.log(data)
        this.euipUsedList = data;
        this.dtTrigger.next();
        this.isLoading = false
      })
  }

  editEquipUSed(id) {
    this.router.navigate(['createUserEquipment', this.snapAuditId, id])
  }

  deActivate(id) {
    const isDelete = confirm('Are you sure want to delete ?')
    if (isDelete) {
      this.clientService.deleteEquipementUsedByCqra(id)
        .subscribe(
          data => {
            console.log('deleted')
            location.reload()
          },
          err => console.log(err)
        )
    }
  }
}
