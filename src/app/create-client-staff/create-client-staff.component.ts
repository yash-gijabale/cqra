import { Component, OnInit } from "@angular/core";
import { ClientServiceService } from "../service/client-service.service";
import { ClientData } from "../client/client.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from "../common.service";
import { ProjectData } from "../project/project.component";
import { ActivatedRoute, Router } from "@angular/router";
import { data } from "jquery";
import { first } from 'rxjs/operators';


export class clientStaffData {
  constructor(
    public clientId: number,
    public projectId: number,
    public clientName: string,
    public designation: string,
    public email: string,
    public phone: string,
    public level: number
  ) {}
}

@Component({
  selector: "app-create-client-staff",
  templateUrl: "./create-client-staff.component.html",
  styleUrls: ["./create-client-staff.component.css"],
})
export class CreateClientStaffComponent implements OnInit {
  clients: ClientData[];
  clientStaffForm: FormGroup;
  SelClientId: string;
  projects: ProjectData[];
  id: number;
  submitted=false

  constructor(
    private clientServiceService: ClientServiceService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id != -1){
      this.clientServiceService.retrieveClientStaff(this.id)
      .pipe(first())
      .subscribe(x => this.clientStaffForm.patchValue(x));
    }

    this.clientServiceService.getAllClients().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.clients = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.clientStaffForm = this.formBuilder.group({
      clientId: ["", Validators.required],
      projectId: ["", Validators.required],
      clientName: ["", Validators.required],
      designation: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.minLength(10)]],
      level: ["", Validators.required],
    });
  }

  get f() {
    return this.clientStaffForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.clientStaffForm.invalid)
    {
      return;
    }
    console.log(this.clientStaffForm.value);
    if(this.id == -1){
      this.clientServiceService.createClientStaff(this.clientStaffForm.value)
      .subscribe(data => {
        console.log('data added')
      },
      (err)=>{
        console.log(err)
      })
    }else{
      this.clientServiceService.updateClientStaff(this.clientStaffForm.value, this.id)
      .subscribe(data => {
        this.router.navigate(['clientStaff'])
      },
      (err) => {
        console.log('update err---->', err)
      })

    }
   
  }

  getProjects() {
    // alert(this.SelClientId);
    this.commonService.getClientProject(this.SelClientId).subscribe(
      (data) => {
        console.log("Project Data==", data);
        this.projects = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );
  }
}
