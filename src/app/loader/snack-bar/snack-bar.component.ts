import { Component, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SnackBarComponent implements OnInit {

  title: string; 
  constructor() { }

  ngOnInit() {
 
  }

  showSnackError(message: any = false) {

    let snackBar = document.querySelector('#snak_main') as HTMLDivElement;
    snackBar.style.backgroundColor='red';
    snackBar.style.color='white';
    snackBar.style.display='flex';
    snackBar.style.alignItems='center';
    snackBar.style.justifyContent='start';
    snackBar.innerHTML = `<span>${message ? message : 'Something is wrong !'}<span>`
    setTimeout(() => {
      snackBar.style.display='none';
    }, 3000); // Adjust the timeout as needed
  }

  showSuccess(message: any) {
    let snackBar = document.querySelector('#snak_main') as HTMLDivElement;
    snackBar.style.backgroundColor='#64be53';
    snackBar.style.color='white';
    snackBar.style.display='flex';
    snackBar.style.alignItems='center';
    snackBar.style.justifyContent='start';
    snackBar.innerHTML = `<span>${message}<span>`
    setTimeout(() => {
      snackBar.style.display='none';
    }, 1000000); // Adjust the timeout as needed
  }

}
