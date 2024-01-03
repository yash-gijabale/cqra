import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientServiceService } from '../service/client-service.service';
import { UserService } from '../service/user.service';
import { ClientData } from '../client/client.component';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  // imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})

export class CreateUserComponent implements OnInit {

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  SelUserType: string = "0";
  SelRole: string = "0";
  SelRedAlert: string = "0";
  id: number;
  registerForm: FormGroup;
  redAlerts;
  submitted = false;
  representingType : Number = 1
  clients: ClientData[]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private userService: UserService
  ) { }

  ngOnInit() {
   
    this.id = this.route.snapshot.params['id'];
    this.clientServiceService.getAllClients()
    .subscribe(data => this.clients = data)

    if (this.id != -1) {
      this.userService.retriveUser(this.id)
        .pipe(first())
        .subscribe(x => {
          console.log(x)
          this.registerForm.patchValue(x)
        });
    }

    this.registerForm = this.formBuilder.group({
      userFullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      designation: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['', Validators.required],
      roleId: ['', Validators.required],
      userImage: ['', Validators.required],
      approverN: ['', Validators.nullValidator],
      reviewerN: ['', Validators.nullValidator],
      createrN: ['', Validators.nullValidator],
      region : [[], Validators.required]

    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log(this.registerForm.value)
    return

    //UPDATING THE FORM FOR MAPPING VALUES IN BACKEND
    let formData = {
      ...this.registerForm.value,
      userRole: Number(this.registerForm.value.roleId),
      status: true
    }
    
    console.log(formData)

    //IF VALDATION IS FALSE THEN RETUN AND SHOW ERRORS
    // if (this.registerForm.invalid) {
    //   return
    // }


    //UPDATE USER AND CREATE USER 
    if (this.id != -1) {
      this.userService.updateUSer(formData, this.id)
        .subscribe(
          data => { console.log('user updated-->', data) },
          err => console.log(err))

    } else {

      this.userService.createUser(formData)
        .subscribe(
          data => {
            console.log('user created!--->', data),
            this.registerForm.reset()
          },
          err => console.log(err)
        )
    }

  }

  getRepresentors(){
    console.log(this.representingType)
    
  }

}
