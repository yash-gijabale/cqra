import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  launchLoad: boolean = false
  getUserMenu() {
  this.launchLoad = true
    let userId = localStorage.getItem('id')
    this.userService.getUserAccess(userId)
      .subscribe(data => {
        console.log(data)
        localStorage.setItem('userMenu', JSON.stringify(data))
        this.launchLoad = false
        this.router.navigate(['dashboard'])

      })

  }
}
