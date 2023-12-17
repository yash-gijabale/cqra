import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { first } from 'rxjs/operators';
import { data, event } from 'jquery';

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
    public structureId: string,
    public stageId: string,
    public stageName: string
  ) { }
}

export class UnitData {
  constructor(
    public clientId: number,
    public projectId: number,
    public structureId: string,
    public stageId: string,
    public unitId: string,
    public unitName: string
  ) { }
}

export class SubunitData {
  constructor(
    public clientId: number,
    public projectId: number,
    public structureId: string,
    public stageId: string,
    public unitId: string,
    public subunitId: string,
    public subunitName: string
  ) { }
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
  stageForm: FormGroup
  unitForm: FormGroup
  subunitForm: FormGroup

  structures: any;
  stages: any;
  units: any;
  structureObj: any;
  structureSel: string;
  stageSel: string;
  unitSel: string;
  subunitSel: string;
  subunits: any;
  isUpdate = false;
  // structure Edit
  structureName: string;
  structureCode: string;
  isChecked;
  isCheckedName;

  isLoading:boolean
  @ViewChild('closebutton') closebutton;

  constructor(private clientServiceService: ClientServiceService, private commonService: CommonService, private formBuilder: FormBuilder, private router: Router) { }
  structureData: any = [
    { sid: '1', structureName: 'Structure-1' },
    { sid: '2', structureName: 'Structure-2' },
    { sid: '3', structureName: 'Structure-3' },
    { sid: '4', structureName: 'Structure-4' }
  ];
  ngOnInit() {
    this.isLoading = true
    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    })


    this.strctureForm = this.formBuilder.group({
      structureName: ['', Validators.required],
      structureCode: ['', Validators.required],
    })

    this.stageForm = this.formBuilder.group({
      stageName: ['', Validators.required]
    })

    this.unitForm = this.formBuilder.group({
      unitName: ['', Validators.required]
    })

    this.subunitForm = this.formBuilder.group({
      subunitName: ['', Validators.required]
    })
  }
  get f() { return this.registerForm.controls; }
  get s() { return this.strctureForm.controls; }
  get stage() { return this.stageForm.controls; }
  get unit() { return this.unitForm.controls; }
  get subunit() { return this.subunitForm.controls; }

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

      this.clientServiceService.retrieveStage(this.stageSel)
        .pipe(first())
        .subscribe(
          data => this.stageForm.patchValue(data),
          err => console.log(err)
        )
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

      this.clientServiceService.retrieveUnit(this.unitSel)
        .subscribe(
          data => this.unitForm.patchValue(data),
          err => console.log(err)
        )
    }
  }

  isSubunitSelectionchange(event, id: string) {
    console.log("Subunit Id" + id)
    this.subunitSel = id;
    this.clientServiceService.retrieveSubunit(id)
      .subscribe(
        data => this.subunitForm.patchValue(data),
        err => console.log(err)
      )
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
      let updateForm = { ...formData, structureId: this.structureSel }
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
            this.getStructures()

          },
          err => console.log(err)
        )
    }
  }

  deleteStructure() {
    const isDelete = confirm('Are you sure want to delete ?')
    if (isDelete) {
      console.log('delete structure--->', this.structureSel)
      this.clientServiceService.deleteStructure(this.structureSel)
        .subscribe(
          data => {
            console.log('deleted')
            this.getStructures()
            this.isChecked = false
          },
          err => console.log(err)
        )
    }

  }

  onStageSubmit() {
    const formData = {
      projectId: this.SelProjectId,
      clientId: this.SelClientId,
      structureId: this.structureSel,
      stageName: this.stageForm.value.stageName
    }
    console.log(formData);
    if (this.isUpdate) {
      let updateFomData = { ...formData, stageId: this.stageSel }
      this.clientServiceService.updateStage(updateFomData, this.stageSel)
        .subscribe(
          data => {
            console.log('updated')
            this.commonService.getStages(this.SelClientId, this.SelProjectId, this.structureSel)
              .subscribe(
                (data) => {
                  this.stages = data;

                }, (err) => {
                  console.log('-----> err', err);
                })
          },
          err => console.log(err)
        )

    } else {
      this.clientServiceService.createStage(formData)
        .subscribe(
          data => {
            console.log('added', data)
            this.commonService.getStages(this.SelClientId, this.SelProjectId, this.structureSel)
              .subscribe(
                (data) => {
                  this.stages = data;

                }, (err) => {
                  console.log('-----> err', err);
                })
          },
          err => console.log(err)
        )
    }
  }

  deleteStage() {
    const isDelete = confirm('Are you sure want to delete ?')
    if (isDelete) {
      this.clientServiceService.deleteStage(this.stageSel)
        .subscribe(
          data => {
            console.log('deleted stage')
            this.commonService.getStages(this.SelClientId, this.SelProjectId, this.structureSel)
              .subscribe(
                (data) => {
                  this.stages = data;

                }, (err) => {
                  console.log('-----> err', err);
                })
          },
          err => console.log(err)
        )
    }

  }


  onUnitSubmit() {
    const formData = {
      projectId: this.SelProjectId,
      clientId: this.SelClientId,
      structureId: this.structureSel,
      stageId: this.stageSel,
      unitName: this.unitForm.value.unitName
    }
    if (this.isUpdate) {

      let updateFomData = { ...formData, unitId: this.unitSel }
      this.clientServiceService.updateUnits(updateFomData, this.unitSel)
        .subscribe(
          data => {
            console.log('updated', data)
            this.commonService.getUnits(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel)
              .subscribe(
                (data) => {
                  // console.log('client Data==', data)
                  this.units = data;

                }, (err) => {
                  console.log('-----> err', err);
                })
          },
          err => console.log(err)
        )

    } else {

      this.clientServiceService.createUnit(formData)
        .subscribe(
          data => {
            console.log('added unit---->', data)
            this.commonService.getUnits(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel)
              .subscribe(
                (data) => {
                  // console.log('client Data==', data)
                  this.units = data;

                }, (err) => {
                  console.log('-----> err', err);
                })
          }

        )
    }
    console.log(formData)
  }

  deleteUnit() {
    const isDelete = confirm('Are You sure eant to delete ?')
    if (isDelete) {
      this.clientServiceService.deleteUnit(this.unitSel)
        .subscribe(
          data => {
            console.log('deleted')
            this.commonService.getUnits(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel)
              .subscribe(
                (data) => {
                  // console.log('client Data==', data)
                  this.units = data;

                }, (err) => {
                  console.log('-----> err', err);
                })
          },
          err => console.log(err)
        )
    }
  }


  onSubunitSubmit() {
    const formData = {
      projectId: this.SelProjectId,
      clientId: this.SelClientId,
      structureId: this.structureSel,
      stageId: this.stageSel,
      unitId: this.unitSel,
      subunitName: this.subunitForm.value.subunitName
    }

    console.log(formData)
    if (this.isUpdate) {
      let updateFomData = { ...formData, subunitId: this.subunitSel }
      this.clientServiceService.updateSubunit(updateFomData, this.subunitSel)
        .subscribe(
          data => {
            console.log('uopdted subunit', data)
            this.commonService.getSubUnit(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel, this.unitSel)
            .subscribe(
              (data) => {
                console.log('client Data==', data)
                this.subunits = data;
    
              }, (err) => {
                console.log('-----> err', err);
              })
          },
          err => {
            console.log(err)
          }
        )
    } else {
      this.clientServiceService.createSubunit(formData)
        .subscribe(
          data => {
            console.log('added subunit')
            this.commonService.getSubUnit(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel, this.unitSel)
            .subscribe(
              (data) => {
                console.log('client Data==', data)
                this.subunits = data;
    
              }, (err) => {
                console.log('-----> err', err);
              })
          },
          err => console.log(err)
        )
    }

  }

  deleteSubunit() {
    if (this.subunitSel) {
      this.clientServiceService.deleteSubunit(this.subunitSel)
        .subscribe(
          data => {
            console.log('deleted subunit')
            this.commonService.getSubUnit(this.SelClientId, this.SelProjectId, this.structureSel, this.stageSel, this.unitSel)
              .subscribe(
                (data) => {
                  console.log('client Data==', data)
                  this.subunits = data;

                }, (err) => {
                  console.log('-----> err', err);
                })
          },
          err => console.log(err)
        )
    }
  }

}
