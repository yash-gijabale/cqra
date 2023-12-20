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
      userName: ['', Validators.required],
      loginName: ['', Validators.required],
      password: ['', Validators.required],
      discription: ['', Validators.required],
      designation: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      emailId: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
      userRole: ['', Validators.required],
      userImage: ['', Validators.required],
      approver: ['', Validators.nullValidator],
      reviewer: ['', Validators.nullValidator],
      siteAdmin: ['', Validators.nullValidator]

    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.registerForm.value)
    let formData = {
      ...this.registerForm.value,
      approver: this.registerForm.value.approver ? '0':'' ,
      reviewer: this.registerForm.value.reviewer ? '1' :'' ,
      siteAdmin: this.registerForm.value.siteAdmin ? '2' :'' 
    }
    console.log(formData)
    if (this.registerForm.invalid) {
      return
    }

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
