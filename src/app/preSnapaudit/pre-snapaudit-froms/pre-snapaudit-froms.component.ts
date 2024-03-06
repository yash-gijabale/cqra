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

}
