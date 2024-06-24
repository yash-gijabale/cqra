import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { StructureData } from 'src/app/wbs/wbs.component';

@Component({
  selector: 'app-deleted-nc-report',
  templateUrl: './deleted-nc-report.component.html',
  styleUrls: ['./deleted-nc-report.component.css']
})
export class DeletedNcReportComponent implements OnInit {
  deletedNcForm: FormGroup

  SelClient: any
  SelProject: any

  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []

  constructor(
    private formBuilder: FormBuilder,
    private clientservice: ClientServiceService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {

    this.clientservice.getAllClients().subscribe((data) => {
      this.clients = data

    })

    this.deletedNcForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => {
      this.projects = data
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      this.structures = data
    })
  }

  onSubmit() {
    let formData = {
      deletedNc: {
        ...this.deletedNcForm.value
      }
    }
    console.log(formData)
  }



}
