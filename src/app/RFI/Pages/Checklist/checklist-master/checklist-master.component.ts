import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-master',
  templateUrl: './checklist-master.component.html',
  styleUrls: ['./checklist-master.component.css']
})
export class ChecklistMasterComponent implements OnInit {

  isLoading:any
  dtOptions:any
  dtTrigger:any
  userDetails:any
  constructor() { }

  ngOnInit() {
  }

}
