import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { UserView } from '../user-log/user-log.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})

export class CreateProjectComponent implements OnInit {
  SelClientId: string = "0";
  SelMisId: string = "0";
  SelNCId: string = "0";
  SelRedAlert: string = "0";
  id: number;
  clients: ClientData[]
  projectForm: FormGroup;
  redAlerts;
  submitted = false;
  regionalManagers: UserView[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.commonService.getRegionalManagers()
      .subscribe(
        data => {
          this.regionalManagers = data
          console.log(data)
        },
        err => console.log(err)
      )

    if (this.id != -1) {
      this.clientServiceService.retrieveProject(this.id)
        .pipe(first())
        .subscribe(x => this.projectForm.patchValue(x));
    }

    this.projectForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectName: ['', Validators.required],
      projectCode: ['', Validators.required],
      projectRegionalManagerId: ['', Validators.required],
      projectAddress: ['', Validators.required],
      projectCity: ['', Validators.required],
      projectKValue: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      projectMisNCs: ['', Validators.required],
      projectNCOpen: ['', Validators.required],
      projectRedalert: ['', Validators.required],
      projectCCmails: ['', [Validators.required, Validators.email]],
      projectAutoNCOpen: ['', Validators.required],
      projectAutoNCOpenWithEmail: ['', Validators.required],
    });

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;

    }, (err) => {
      console.log('-----> err', err);
    })


  }

  get f() { return this.projectForm.controls; }

  onSubmit() {
    console.log(this.projectForm.value);
    this.submitted = true;
    this.id = this.route.snapshot.params['id'];
    if (this.projectForm.invalid) {
      return;
    }
    console.log("Id==" + this.id);
    if (this.id == -1) {
      this.clientServiceService.createProject(this.projectForm.value)
        .subscribe(data => {
          console.log(data)
          // this.router.navigate(['project']);
        },
          err => console.log(err)
        );
    } else {
      this.clientServiceService.updateProject(this.projectForm.value, this.id)
        .subscribe(
          data => {
            console.log(data)
            this.router.navigate(['project'])
          }
        )
    }
  }

  FillRedAlertDDL() {
    alert(this.SelNCId);
    if (this.SelNCId == "1") {
      this.redAlerts = [{ value: "2", name: "Moderate and above" }, { value: "3", name: "Severe and above" }, { value: "4", name: "Very severe and above" }, { value: "5", name: "Critical" }]
    }
  }

}
