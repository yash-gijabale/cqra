import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { first } from 'rxjs/operators';

export class StructureData {
  constructor(
    public clientId: number,
    public projectId: number,
    public structureId: number,
    public structureName: string,
    public structureCode: string
  ) {

  }

}

export class StructureFrom {
  constructor(
    public clientId: number,
    public projectId: number,
    public structureName: string,
    public structureCode: string
  ) { }
}

export class StageData {
  constructor(
    public clientId: number,
    public projectId: number,
    public structureId: number,
    public stageId: number,
    public stageName: string
  ) {

  }
}

@Component({
  selector: 'app-wbs',
  templateUrl: './wbs.component.html',
  styleUrls: ['./wbs.component.css']
})
export class WbsComponent implements OnInit {
  SelClientId: number = 0;
  SelProjectId: number = 0;
  clients: ClientData[];
  projects: ProjectData[];
  registerForm: FormGroup;

  strctureForm: FormGroup

  structures: any;
  stages: any;
  units: any;
  structureObj: any;
  structureSel: string;
  stageSel: string;
  unitSel: string;
  subunits: any;
  isUpdate = false;
  // structure Edit
  structureName: string;
  structureCode: string;
  isChecked;
  isCheckedName;
  @ViewChild('closebutton') closebutton;

  constructor(private clientServiceService: ClientServiceService, private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  structureData: any = [
    { sid: '1', structureName: 'Structure-1' },
    { sid: '2', structureName: 'Structure-2' },
    { sid: '3', structureName: 'Structure-3' },
    { sid: '4', structureName: 'Structure-4' }
  ];
  ngOnInit() {

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;

    }, (err) => {
      console.log('-----> err', err);
    })


    this.strctureForm = this.formBuilder.group({
      structureName: ['', Validators.required],
      structureCode: ['', Validators.required],
    })
  }
  get f() { return this.registerForm.controls; }
  get s() { return this.strctureForm.controls; }

  changeStatus(id) {
    if (id === 1) {
      this.isUpdate = false
    } else {
      this.isUpdate = true

    }
    console.log(this.isUpdate)
  }
  getProjects() {
    alert(this.SelClientId);
    this.commonService.getClientProject(this.SelClientId)
      .subscribe(
        (data) => {
          console.log('Project Data==', data)
          this.projects = data;

        }, (err) => {
          console.log('-----> err', err);
        })
  }

  getStructures() {
    // alert(this.SelProjectId);
    this.commonService.getStructures(this.SelClientId, this.SelProjectId)
      .subscribe(
        (data) => {
          console.log('Structure Data==', data)
          this.structures = data;

        }, (err) => {
          console.log('-----> err', err);
        })
  }
  isChangeLimitAccessToggle(event, id: string) {
    this.isChecked = event.target.checked;//!this.isChecked;
    this.isCheckedName = event.target.name;
    if (this.structureSel != id) {
      this.structureSel = id;
      this.commonService.getStages(this.SelClientId, this.SelProjectId, this.structureSel)
        .subscribe(
          (data) => {
            console.log('client Data==', data)
            this.stages = data;

          }, (err) => {
            console.log('-----> err', err);
          })

      // this.isUpdate = true;
      this.clientServiceService.retrieveStructure(this.structureSel)
        .pipe(first())
        .subscribe(data => this.strctureForm.patchValue(data))
    }
    console.log(event.target.checked + "==" + id);
  }

  isstageSelectionchange(event, id: string) {
    if (this.stageSel != id) {
      this.stageSel = id;
      this.commonService.getUnits(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel)
        .subscribe(
          (data) => {
            console.log('client Data==', data)
            this.units = data;

          }, (err) => {
            console.log('-----> err', err);
          })
    }
  }

  isUnitSelectionchange(event, id: string) {
    if (this.unitSel != id) {
      console.log("Unit Id" + id)
      this.unitSel = id;
      this.commonService.getSubUnit(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel, this.unitSel)
        .subscribe(
          (data) => {
            console.log('client Data==', data)
            this.subunits = data;

          }, (err) => {
            console.log('-----> err', err);
          })
    }
  }

  onSubmit(structureCode: string, structureName: string, clientId: string, projectId: string) {
    if (projectId == "0" || clientId == "0") {
      alert("Project and client are required");
    } else {
      alert("structureName=" + structureName + "structureCode" + structureCode);
      this.structureObj = {
        "projectId": projectId,
        "structureName": structureName,
        "clientId": clientId,
        "structureCode": structureCode
      }
      this.clientServiceService.createStructure(this.structureObj).subscribe(data => {
        this.closebutton.nativeElement.click();
        this.getStructures();
      });;
    }
    console.log("Client Id : " + clientId + " Project Id:" + projectId + "from called" + structureName);
  }

  onStructureSubmit() {
    console.log('suhn')
    const formData = {
      projectId: this.SelProjectId,
      structureName: this.strctureForm.value.structureName,
      clientId: this.SelClientId,
      structureCode: this.strctureForm.value.structureCode
    }
    // console.log(formData)
    if (this.isUpdate) {
      let updateForm = {...formData, structureId:this.structureSel}
      console.log(updateForm);
      this.clientServiceService.updateStructure(updateForm, this.structureSel)
        .subscribe(
          data => {
            console.log('updated', data)
            this.getStructures()
          },
          err => console.log(err)
        )
    } else {
      this.clientServiceService.createStructure(formData)
        .subscribe(
          data => {
            console.log('created structure', data)
          },
          err => console.log(err)
        )
    }
  }
}
