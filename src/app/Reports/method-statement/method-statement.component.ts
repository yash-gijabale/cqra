import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-method-statement',
  templateUrl: './method-statement.component.html',
  styleUrls: ['./method-statement.component.css']
})
export class MethodStatementComponent implements OnInit {
  isLoading:boolean = false
  dtOptions:any
  dtTrigger:any

  constructor() { }

  ngOnInit() {
  }

}
