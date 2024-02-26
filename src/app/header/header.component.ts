import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
username=localStorage.getItem('username');
userMenu = JSON.parse(localStorage.getItem('userMenu'))
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.userMenu)

    $("#sidenavToggler").click(function(e) {
      e.preventDefault();
      $("body").toggleClass("sidenav-toggled");
      $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
      $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
    });
  }

  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
