import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ClientServiceService } from "../service/client-service.service";
import { CommonService } from "../common.service";


export class FormanData {
  constructor(
    public foremanId: number,
    public contractorId: number,
    public foremanName: string,
    public isActive: boolean
  ) {}
}

export class ContractorData {
  constructor(
    public contractorId: number,
    public contractorName: string,
    public contarctorAddress: string,
    public contarctorEmail: string,
    public contarctorPhone: string,
    public isActive: boolean
  ) {}
}
@Component({
  selector: "app-contractor-forman",
  templateUrl: "./contractor-forman.component.html",
  styleUrls: ["./contractor-forman.component.css"],
})
export class ContractorFormanComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<FormanData> = new Subject();
  forman: FormanData[];
  

  constructor(
    private clientService: ClientServiceService,
    private router: Router,
    private commanService: CommonService,

  ) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };

    // this.commanService.getContractorsById('107').subscribe(
    //   (data) => {
    //     // console.log("----> office service : get all data", data);
    //     this.contractor = data;
    //     console.log(this.contractor.contractorName)
    //   },
    //   (err) => {
    //     console.log("-----> err", err);
    //   }
    // );

    this.clientService.getAllForemans().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.forman = data;

        // ADD THIS
        this.dtTrigger.next();
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }

  getContractorName(id) {
    // this.commanService.getContractorsById('107').subscribe(
    //   (data) => {
    //     // console.log("----> office service : get all data", data);
    //     this.contractor = data;
    //     return this.contractor.contractorName
    //   },
    //   (err) => {
    //     console.log("-----> err", err);
    //   }
    // );
  }

  editClient(id) {
    console.log(`update ${id}`)
    this.router.navigate(['createForman',id])
  };

  deActivateClient(id)
  {
    let isDelete = confirm('Are you sure want to delete this ?')
    if(isDelete){
      console.log(id)
      this.clientService.deleteForeman(id)
      .subscribe(data=>{
        this.router.navigate(['contractorForman']);

      },
      (err)=>{
        console.log(err)
      })
    }
  }
}
