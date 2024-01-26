import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientData } from "../client/client.component";
import { ClientServiceService } from "../service/client-service.service";
import { CommonService } from "../common.service";
import { first } from 'rxjs/operators';
import { ContractorData } from '../contractor-forman/contractor-forman.component';


@Component({
  selector: "app-create-contractor-forman",
  templateUrl: "./create-contractor-forman.component.html",
  styleUrls: ["./create-contractor-forman.component.css"],
})
export class CreateContractorFormanComponent implements OnInit {
  SelClientId: string = "0";
  foremanForm: FormGroup;
  submitted = false;
  clients: ContractorData[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commanService: CommonService,
    private formBuilder: FormBuilder,

  ) { }

  contractorId: number = 0;
  foremanName: string = "";
  id: number;


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id != -1) {
      this.clientServiceService.retrieveForeman(this.id)
        .pipe(first())
        .subscribe(x => {
          this.foremanForm.patchValue(x)
          this.contractorId = x.contractorId
        });
    }

    this.commanService.getContractorsList().subscribe(
      (data) => {
        console.log("----> office service : get all Contractor data", data);
        this.clients = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.foremanForm = this.formBuilder.group({
      contractorId: ['', Validators.required],
      foremanName: ['', Validators.required],
    });
  }

  get f() {
    return this.foremanForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.foremanForm.invalid) {
      return;
    }
    console.log("Id==");
    console.log(this.foremanForm.value)
    if (this.id == -1) {
      this.clientServiceService.createFormeman(this.foremanForm.value)
        .subscribe(data => {
          // this.router.navigate(['contractorForman']);
          console.log('foreman created!')
        });
    } else {
    this.foremanForm.value.active = true
      this.clientServiceService.updateForeman(this.foremanForm.value, this.id)
        .subscribe(
          data => {
            console.log(data)
            console.log('updated!')

          }
        )
    }
  }
}
