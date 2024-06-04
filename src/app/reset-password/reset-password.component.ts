import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userId = Number(localStorage.getItem('id'))
  constructor(
    private userService: UserService,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {

  }

  isLoad: boolean = false
  passEror:boolean = false
  resetPassword() {
    let newPassword = document.getElementById('newPassword') as HTMLInputElement
    let confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement
    if(newPassword.value !== confirmPassword.value){
      this.passEror = true
      setTimeout(()=>{
        this.passEror = false
      }, 3000)
      return
    }

    if(confirmPassword.value == ''){
      return
    }
    this.isLoad = true
    this.userService.resetPassword(this.userId, { password: newPassword.value })
      .subscribe(data => {
        console.log(data)
        this.isLoad = false
        this.snackBar.showSuccess('Password updated')
      }, err => {
        this.isLoad = false

        this.snackBar.showSnackError()
      })
  }

}
