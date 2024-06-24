import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';


@Component({
  selector: 'app-create-quality-observation',
  templateUrl: './create-quality-observation.component.html',
  styleUrls: ['./create-quality-observation.component.css']
})
export class CreateQualityObservationComponent implements OnInit {
  qualityObservationForm: FormGroup

  clients: ClientData[] = []
  projects: ProjectData[] = []

  SelClient: any

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      console.log(data)
      this.clients = data
    })

    this.qualityObservationForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      clientRepres: ['', Validators.required],
      cqraRepres: ['', Validators.required],
      contractor: ['', Validators.required],
      obserDate: ['', Validators.required],
      reportHeader: ['', Validators.required],
    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => {
      this.projects = data
    })
  }

  onSubmit() {
    let formData = {
      qualityObserData: {
        ...this.qualityObservationForm.value
      }
    }
    console.log(formData)
  }



}
