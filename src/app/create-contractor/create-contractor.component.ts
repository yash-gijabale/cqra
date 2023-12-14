import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-contractor',
  templateUrl: './create-contractor.component.html',
  styleUrls: ['./create-contractor.component.css']
})
export class CreateContractorComponent implements OnInit {

  SelClientId: string = "0";
  registerForm: FormGroup;
  submitted = false;
  clients: ClientData[]
  contractorId: number;

  constructor(private route: ActivatedRoute, private router: Router, private clientServiceService: ClientServiceService, private formBuilder: FormBuilder,) { }


  ngOnInit() {

    this.contractorId = this.route.snapshot.params['id'];

    if (this.contractorId != -1) {
      this.clientServiceService.retrieveContractor(this.contractorId)
        .pipe(first())
        .subscribe(
          data => this.registerForm.patchValue(data),
          err => console.log(err)
        )
    }

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;
    }, (err) => {
      console.log('-----> err', err);
    })
    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      contractorName: ['', Validators.required],
      contarctorAddress: ['', Validators.required],
      contarctorEmail: ['', [Validators.required, Validators.email]],
      contarctorPhone: ['', [Validators.required, Validators.minLength(10)]],
    });


  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return
    }
    console.log("Id==");
    console.log(this.registerForm.value)

    if (this.contractorId != -1) {

      this.clientServiceService.updateContractor(this.registerForm.value, this.contractorId)
      .subscribe(
        data => {
          console.log('updated !')
          console.log(data)
        },
        err => console.log(err)
      )

    } else {

      this.clientServiceService.createContractor(this.registerForm.value)
        .subscribe(data => {
          console.log('data adedd')
        })
    }

  }

}
