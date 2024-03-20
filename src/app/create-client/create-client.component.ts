import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  form!: FormGroup;
  id: number;
  clientData: ClientData;
  registerForm: FormGroup;
  submitted = false;
  isLoading: boolean = false
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private clientServiceService: ClientServiceService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id != -1) {
      this.isLoading = true
      this.clientServiceService.retrieveClient(this.id)
        .pipe(first())
        .subscribe(x => {
          console.log(x)
          this.isLoading = false
          this.registerForm.patchValue(x)
        });
    }

    this.registerForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      clientCode: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientAddress: ['', [Validators.required, Validators.minLength(6)]],
      clientContactPerson: ['', [Validators.required]],
      clientPhone: ['', Validators.required]

    });
  }
  get f() { return this.registerForm.controls; }

  submitLoad: boolean = false
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    this.submitLoad = true

    let formData = {
      ...this.registerForm.value,
      clientStatus: true
    }

    console.log("Id==" + this.id);
    if (this.id == -1) {
      this.clientServiceService.createClient(formData)
        .subscribe(data => {
          this.submitLoad = false
          console.log(data)
          this.router.navigate(['client']);

        });
    } else {
      this.clientServiceService.updateClient(formData, this.id)
        .subscribe(
          data => {
            console.log(data)
            this.submitLoad = false
            this.router.navigate(['client'])

          }
        )
    }

    //this.clientServiceService.createClient(JSON.stringify(this.registerForm.value);
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  duplicateClientCode: boolean = false
  duplicateClientCodeLoad: boolean = false
  checkClientCode(e) {
    this.duplicateClientCode = false
    this.duplicateClientCodeLoad = true
    console.log(e.target.value)
    let code = e.target.value
    this.clientServiceService.checkClientCode(code)
      .subscribe(isDuplicate => {
        console.log(isDuplicate)
        this.duplicateClientCodeLoad = false
        if (!isDuplicate) {
          this.duplicateClientCode = true
        }
      })
  }

  duplicateClientName: boolean = false
  duplicateClientNameLoad: boolean = false
  checkClientName(e) {
    this.duplicateClientName = false
    this.duplicateClientNameLoad = true
    console.log(e.target.value)
    let name = e.target.value
    this.clientServiceService.checkClinetName(name)
      .subscribe(isDuplicate => {
        console.log(isDuplicate)
        this.duplicateClientNameLoad = false
        if (!isDuplicate) {
          this.duplicateClientName = true
        }
      })

  }
}
