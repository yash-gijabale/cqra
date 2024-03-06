import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-snapaudit-froms',
  templateUrl: './pre-snapaudit-froms.component.html',
  styleUrls: ['./pre-snapaudit-froms.component.css']
})
export class PreSnapauditFromsComponent implements OnInit {

  rating:Array<number> = [0,1,2,3,4,5,6,7,8,9,10]
  constructor() { }

  ngOnInit() {

  }


  //   inspectorRowCount = 1
  //   addInspectorRow() {
  //   this.inspectorRowCount++
  //   let filed = `
  //                 <tr>
  //                 <td>${this.inspectorRowCount}</td>
  //                 <td><select [(ngModel)]="SelClientId" formControlName="clientId" class="form-control">
  //                 <option [value]="0">Please Select</option>
  //                 <option [value]="1">CQRA</option>
  //               </select></td>
  //             <td></td>
  //             <td><button type="button" class="btn btn-danger" (click)="addInspectorRow()">Add Row</button></td>
  //               </tr>`
  //   let areaFiled = <HTMLTableElement>document.querySelector('#inspectorTable')
  //   areaFiled.insertAdjacentHTML('beforeend', filed)
  // }




           


}





