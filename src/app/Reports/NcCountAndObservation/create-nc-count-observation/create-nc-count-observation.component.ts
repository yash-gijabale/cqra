import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-nc-count-observation',
  templateUrl: './create-nc-count-observation.component.html',
  styleUrls: ['./create-nc-count-observation.component.css']
})
export class CreateNcCountObservationComponent implements OnInit {

  currentForm:Number = 1

  constructor() { }

  ngOnInit() {
    this.currentForm = 1
  }

  changeForm(e){
    this.currentForm = Number(e.target.value)
  }

}
