import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { CommonService } from 'src/app/common.service';
import { TradeMaintanceService } from 'src/app/trade-maintance.service';
import { ClientData } from 'src/app/client/client.component';
import { ProjectData } from 'src/app/project/project.component';
import { TradeData } from 'src/app/create-tarde/create-tarde.component';

@Component({
  selector: 'app-opportunity-improvment-report',
  templateUrl: './opportunity-improvment-report.component.html',
  styleUrls: ['./opportunity-improvment-report.component.css']
})
export class OpportunityImprovmentReportComponent implements OnInit {
  qualityProcedureForm: FormGroup

  clients: ClientData[];
  projects: ProjectData[];
  trades: TradeData[];


  SelClient: any
  SelProject: any
  SelTrade: any

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,

  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe(data => {
      console.log('All clients', data)
      this.clients = data
    })

    this.qualityProcedureForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      date: ['', Validators.required],
      clientRepre: ['', Validators.required],
      cqraRepre: ['', Validators.required],
      contractor: ['', Validators.required],
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
      <input type="text" class="issue form-control" title="${this.rowwCount}" id='issue${this.rowwCount}'>
    </td>
    <td style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;"><input type="text" class="form-control" id="improvement${this.rowwCount}" title="${this.rowwCount}"></td>
    <td style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;"><input type="text" class="form-control" id="reason${this.rowwCount}" title="${this.rowwCount}"></td>
    <td style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;"><input type="text" class="form-control" id="clientReason${this.rowwCount}" title="${this.rowwCount}"></td>
    <td style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;"><input type="text" class="form-control" id="disReason${this.rowwCount}" title="${this.rowwCount}"></td>
    <td  style="background-color:white; padding:10px; text-align:center; border: 1px solid #ddd;"><span class="badge badge-danger" id='remove${this.rowwCount}' title="${this.rowwCount}" role="button">X</span></td>
  </tr>`

    let areaFiled = <HTMLTableElement>document.querySelector('#tableBody')
    // console.log(areaFiled)
    areaFiled.insertAdjacentHTML('beforeend', filed)

    let removeRow = <HTMLTableElement>document.querySelector(`#remove${this.rowwCount}`)
    removeRow.addEventListener('click', (ev: Event) => this.removeRow(ev))

    this.giveSrNo()

  }

  giveSrNo(){
    console.log('jjej')
    let srNo  = 1
    let rows =  document.querySelectorAll('.tableRows')
    console.log(rows)
    rows.forEach(row =>{
      let r = row as HTMLTableRowElement

      let child = r.children[0] as any
       child.innerHTML=  String(srNo)
      srNo++
    })
  }


  removeRow(e){
    let row = document.querySelector(`#myrow${e.target.title}`) as HTMLTableElement
    row.remove()
    this.giveSrNo()
  }



  onSubmit() {
   
    let issueDataRow = document.querySelectorAll('.issue')

    let opportunitiesData = []

    let srNo = 1
    issueDataRow.forEach((issueRow) =>{
      let issue = issueRow as HTMLInputElement
      let id = issue.title
      let improvement = document.querySelector(`#improvement${id}`) as HTMLInputElement
      let reason = document.querySelector(`#reason${id}`) as HTMLInputElement
      let clientReason = document.querySelector(`#clientReason${id}`) as HTMLInputElement
      let disReason = document.querySelector(`#disReason${id}`) as HTMLInputElement

      let data = {
        srNo: srNo,
        issue: issue.value,
        opportunities_for_improvement: improvement.value,
        reason: reason.value,
        client_response: clientReason.value,
        disagreementReason: disReason.value
      }
      srNo++
      opportunitiesData.push(data)
    })

    let formData = { 
      improvementMaster : this.qualityProcedureForm.value,
      opportunitiesData

     }
    console.log(formData)
    this.commonService.downloadOpportunitiesForImprovement(this.SelProject, this.SelClient, this.qualityProcedureForm.value.clientRepre, this.qualityProcedureForm.value.cqraRepre, opportunitiesData)
    .subscribe(data =>{
      console.log(data)
    })

  }

}
