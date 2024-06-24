import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { CommonService } from 'src/app/common.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-quality-procedure-amendment-report',
  templateUrl: './create-quality-procedure-amendment-report.component.html',
  styleUrls: ['./create-quality-procedure-amendment-report.component.css']
})
export class CreateQualityProcedureAmendmentReportComponent implements OnInit {
  qualityProcedureForm: FormGroup


  clients: ClientData[];
  projects: ProjectData[];
  trades: TradeData[];

  SelClientId: string = '0'
  SelProjectId: string = '0'
  SelTradeId: string = '0'


  SelClient: any
  SelProject: any
  SelTrade: any

  reportId: Number

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    this.reportId = this.route.snapshot.params['id']

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.qualityProcedureForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      schemeId: ['', Validators.required],
      tradeId: ['', Validators.required],
      siteRepresentative: ['', Validators.required],
      cqraRepre: ['', Validators.required],
    })


  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe(data => {
      // console.log('client projects-->', data)
      this.projects = data
    })
  }

  getTrade() {
    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      });


  }


  rowwCount = 1
  addNewRow() {
    this.rowwCount++
    let filed = `<tr id="myrow${this.rowwCount}" class="tableRows">
    <td style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;">${this.rowwCount}</td>
    <td style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;">
      <input type="text" class="standard_procedure form-control" title="${this.rowwCount}" id='standard_procedure${this.rowwCount}'>
    </td>
    <td style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;">
      <input type="text" class="form-control" id='amendment${this.rowwCount}'>
    </td>
    <td  style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;"><span class="badge badge-danger" id='remove${this.rowwCount}' title="${this.rowwCount}" role="button">X</span></td>
  </tr>`

    let areaFiled = <HTMLTableElement>document.querySelector('#tableBody')
    // console.log(areaFiled)
    areaFiled.insertAdjacentHTML('beforeend', filed)

    let removeRow = <HTMLTableElement>document.querySelector(`#remove${this.rowwCount}`)
    removeRow.addEventListener('click', (ev: Event) => this.removeRow(ev))

    this.giveSrNo()

  }

  giveSrNo() {
    console.log('jjej')
    let srNo = 1
    let rows = document.querySelectorAll('.tableRows')
    console.log(rows)
    rows.forEach(row => {
      let r = row as HTMLTableRowElement

      let child = r.children[0] as any
      child.innerHTML = String(srNo)
      srNo++
    })
  }


  removeRow(e) {
    let row = document.querySelector(`#myrow${e.target.title}`) as HTMLTableElement
    row.remove()
    this.giveSrNo()
  }



  onSubmit() {

    let procedureDataRow = document.querySelectorAll('.standard_procedure')

    let procedureData = []

    procedureDataRow.forEach((procedureRow) => {
      let procedure = procedureRow as HTMLInputElement
      let id = procedure.title
      let amendment = document.querySelector(`#amendment${id}`) as HTMLInputElement

      let data = {
        standardProcedure: procedure.value,
        amendmentProcedure: amendment.value,
        updatedDate: new Date().toISOString().slice(0, 10)
      }
      procedureData.push(data)
    })

    let formData = {
      qualityProcedureAmendment: this.qualityProcedureForm.value,
      qualityProcedure: procedureData

    }
    console.log(formData)

  }

}
