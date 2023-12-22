import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";


export class EquiUsedByCqra{
  constructor(
    public equipmentId: number,
    public equipmentName: string,
    public equipmentRemark: string,
    public image1: string,
    public image2: string,
    public user: string,
  ){}
}
@Component({
  selector: 'app-used-equipment',
  templateUrl: './used-equipment.component.html',
  styleUrls: ['./used-equipment.component.css']
})
export class UsedEquipmentComponent implements OnInit {

  title:"datatables";
  @ViewChild(DataTableDirective)
  dtElement:DataTableDirective;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<EquiUsedByCqra> = new Subject();
  isLoading: boolean = false

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };
  }

}
