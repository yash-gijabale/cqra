import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { EquipmentList } from 'src/app/user-equipment/user-equipment.component';

@Component({
  selector: 'app-equip-used-by-client',
  templateUrl: './equip-used-by-client.component.html',
  styleUrls: ['./equip-used-by-client.component.css']
})
export class EquipUsedByClientComponent implements OnInit {

  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<EquipmentList> = new Subject<EquipmentList>();

  snapAuditId:number
  equipmentList: EquipmentList[]

  constructor(
    private route: ActivatedRoute,
    private clientService : ClientServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params['id']

    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };
    
    this.clientService.getEquipUsedByClient(this.snapAuditId)
    .subscribe(data => {
      console.log(data)
      this.equipmentList = data
      setTimeout(
        function () {
          this.dtTrigger.next();
        }.bind(this)
      );
    })
  }

  editEquipUSed(id)
  {
    this.router.navigate(['creatEquipUsedByClient', this.snapAuditId, id])
  }

}
