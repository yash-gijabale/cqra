import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';


export class traningReportData {
  constructor(
    public training: Object,
    public trainingClient: Array<Object>,
    public trainingContractor: Array<Object>
  ) { }
}
@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  SelProject: string = "0";
  SelClient: string = "0";
  SelTrade: string = "0";
  clients: ClientData[]
  projects: ProjectData[]
  trades: Trade[]
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commonSercice: CommonService,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {
    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;
    }, (err) => {
      console.log('-----> err', err);
    })


    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      schemeId: ['', Validators.required],
      tradeId: ['', Validators.required],
      trainerName: ['', Validators.required],
      trainingSubject: ['', Validators.required],
      trainingDurationInHours: ['', Validators.required],
      trainingDate: ['', Validators.required],
      otherAttendies: ['', Validators.required],
      contractorName1: ['', Validators.required],

    })
  }
  get f() { return this.registerForm.controls; }


  getProjects() {
    console.log(this.SelClient)
    this.commonSercice.getClientProject(this.SelClient).subscribe(data => this.projects = data)
  }

  getTrade() {
    this.tradeService.getProjectTradesScheme(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })
  }

  clientRowCount = 1
  addClientRow() {
    this.clientRowCount++
    let filed = `<tr>
                  <td>${this.clientRowCount}</td>
                  <td><input type="text"  class="form-control clientStaff"  [ngClass]="{ 'is-invalid': submitted && f.clientName.errors }" /></td>
                  <td><input type="text"  class="form-control cleintStaffDesignation"  [ngClass]="{ 'is-invalid': submitted && f.clientName.errors }" /></td>
                  <td><button type="button" class="btn btn-danger" (click)="addClientRow()">Add Row</button></td>
                </tr>`
    let areaFiled = <HTMLTableElement>document.querySelector('#clientStaffTable')
    areaFiled.insertAdjacentHTML('beforeend', filed)
  }

  contractorRowCount = 1
  addCOntractorRow() {
    this.contractorRowCount++
    let filed = ` <tr>
                  <td>${this.contractorRowCount}</td>
                  <td><input type="text"  class="form-control contractorName"  [ngClass]="{ 'is-invalid': submitted && f.clientName.errors }" /></td>
                  <td><input type="text"  class="form-control contractorDesignation"  [ngClass]="{ 'is-invalid': submitted && f.clientName.errors }" /></td>
                  <td><button type="button" class="btn btn-danger" (click)="addCOntractorRow()">Add Row</button></td>
                </tr>`
    let areaFiled = <HTMLTableElement>document.querySelector('#contractorTable')
    areaFiled.insertAdjacentHTML('beforeend', filed)
  }


  onSubmit() {
    console.log("Id==");
    // console.log(this.registerForm.value)
    let clientStaff = document.querySelectorAll('.clientStaff')
    let clientDesignation = document.querySelectorAll('.cleintStaffDesignation')

    let contractorName = document.querySelectorAll('.contractorName')
    let contractorDesignation = document.querySelectorAll('.contractorDesignation')

    let traningClientStaff = []
    clientStaff.forEach((staff, ind) => {
      let staffName = (<HTMLInputElement>staff).value
      let staffDesignation = (<HTMLInputElement>clientDesignation[ind]).value
      let data = {
        clientName: staffName,
        description: staffDesignation
      }
      traningClientStaff.push(data)
    })

    let traningContractor = []
    contractorName.forEach((staff, ind) => {
      let contractorName = (<HTMLInputElement>staff).value
      let contractorDes = (<HTMLInputElement>contractorDesignation[ind]).value
      let data = {
        contractorName: contractorName,
        contractorDescription: contractorDes
      }
      traningContractor.push(data)
    })

    this.registerForm.value.clientId = Number(this.registerForm.value.clientId)
    this.registerForm.value.schemeId = Number(this.registerForm.value.schemeId)
    this.registerForm.value.tradeId = Number(this.registerForm.value.tradeId)
    this.registerForm.value.trainingDurationInHours = Number(this.registerForm.value.trainingDurationInHours)

    // let config = {
    //   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    // };

    let img1Data = document.getElementById('img1') as HTMLInputElement
    let img2Data = document.getElementById('img2') as HTMLInputElement
    let formParams = new FormData();
    let file: File = img1Data.files[0]
    let file1: File = img2Data.files[0]
    // formParams.append('file', img1)
    // formParams.append('file1', img2)

    let formData = {
      training: this.registerForm.value,
      trainingClient: traningClientStaff,
      trainingContractor: traningContractor,
      // file,
      // file1

    }
    console.log(file1)
    console.log(formData)

    // return

    console.log(formData)
    this.commonSercice.addTraningReport(formData)
      .subscribe(data => {
        console.log(data)
        this.commonSercice.uploadTrainingReport(data[0].trainingId, file, file1)
          .subscribe(Idata => {
            console.log(Idata)
          })
      })
  }
} 