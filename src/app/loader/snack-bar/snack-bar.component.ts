import { Component, OnInit,Input, } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  @Input() title: string; 
  constructor() { }

  ngOnInit() {
    let snackBar = document.querySelector('#snak_main') as HTMLDivElement
    snackBar.style.display='inline'
    setTimeout(() => {
      snackBar.style.display='none'
    }, 2000);
  }

}
