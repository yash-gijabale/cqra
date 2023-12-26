import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientServiceService } from '../service/client-service.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  SelUserType: string = "0";
  SelRole: string = "0";
  SelRedAlert: string = "0";
  id: number;
  registerForm: FormGroup;
  redAlerts;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id != -1) {
      this.clientServiceService.retrieveClient(this.id)
        .pipe(first())
        .subscribe(x => this.registerForm.patchValue(x));
    }

    this.registerForm = this.formBuilder.group({
      userFullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      discription: ['', Validators.required],
      designation: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
      roleId: ['', Validators.required],
      userImage: ['', Validators.required],
      approver: ['', Validators.nullValidator],
      reviwer: ['', Validators.nullValidator],
      creater: ['', Validators.nullValidator]

    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.registerForm.value)
    let formData = {
      ...this.registerForm.value,
      userRole: Number(this.registerForm.value.userRole),
      status:true
    }
    console.log(formData)
    // return
    // if (this.registerForm.invalid) {
    //   return
    // }

    console.log("Id==" + this.id);
    this.userService.createUser(this.registerForm.value)
      .subscribe(
        data => console.log('user created!--->', data),
        err => console.log(err)
      )

    //this.clientServiceService.createClient(JSON.stringify(this.registerForm.value);
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

}
