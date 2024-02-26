import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateionService } from '../service/authenticateion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = ''
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  constructor(private router: Router, private authenticateService: AuthenticateionService) { }

  ngOnInit() {
  }

  loginLoad: boolean = false

  handleLogin() {
    this.loginLoad = true
    this.authenticateService.authenticate(this.userName, this.password).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['home'])
        this.invalidLogin = false;
        this.loginLoad = false

      },
      error => {
        this.invalidLogin = true;
        this.loginLoad = false
      }
    )

  }


}
