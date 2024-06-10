import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';
import { StructureData } from 'src/app/wbs/wbs.component';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-create-red-green-card-token-summary',
  templateUrl: './create-red-green-card-token-summary.component.html',
  styleUrls: ['./create-red-green-card-token-summary.component.css']
})
export class CreateRedGreenCardTokenSummaryComponent implements OnInit {
  redGreenCardForm: FormGroup

  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []

  SelClient: any
  SelProject: any


  addStructures: number[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private clientService: ClientServiceService,
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.redGreenCardForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe(data => {
      // console.log('client projects-->', data)
      this.projects = data
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      console.log(data);
      this.structures = data
    })
  }

  addCheckboxData(arry, e) {
    let id = Number(e.target.value)
    if (e.target.checked) {
      let isExist = this[arry].find(item => {
        return id == item
      })
      if (!isExist) {
        this[arry].push(id)
      }
    } else {
      this[arry] = this[arry].filter(item => {
        return id != item
      })
    }
  }

  addStructure(e) {
    this.addCheckboxData('addStructures', e)
    console.log('structures', this.addStructures)
  }


  //slectall checkbox
  addAllCheckboxData(arry: number[], e: Event, checkboxSelector: string) {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      $(checkboxSelector).prop('checked', true);
      const elements = document.querySelectorAll(checkboxSelector);
      arry.length = 0;
      elements.forEach(item => {
        const id = Number((item as HTMLInputElement).value);
        arry.push(id);
      });
    } else {
      $(checkboxSelector).prop('checked', false);
      arry.length = 0;
    }
  }

  addStrucutureAll(e) {
    this.addAllCheckboxData(this.addStructures, e, '.strucuresCheckbox');
    console.log('structures..', this.addStructures);
  }

  onSubmit() {
    let formData = {
      redGreenCardData: {
        ...this.redGreenCardForm.value,
        Structures: this.addStructures
      }
    }
    console.log(formData)
  }


}
