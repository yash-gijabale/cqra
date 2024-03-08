import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserView } from 'src/app/user-equipment/user-equipment.component';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pre-snapaudit-froms',
  templateUrl: './pre-snapaudit-froms.component.html',
  styleUrls: ['./pre-snapaudit-froms.component.css']
})
export class PreSnapauditFromsComponent implements OnInit {
  feedbackForm: FormGroup;

  rating: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  users: UserView[]
  snapAuditId:any;

  reportToDate:String
  reportFromDate:String
  cycleOfInspection:number

  projectData:any = {}
  clientData:any = {}

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {

    this.snapAuditId = this.route.snapshot.params['id']

    this.commonService.retriveInspectionReport(this.snapAuditId)
    .subscribe(data =>{
      // console.log(data)
      let report:any = data
      console.log(report)
      this.reportToDate = new Date(report.snapAudit.toDate).toISOString().substring(0,10)
      this.reportFromDate = new Date(report.snapAudit.fromDate).toISOString().substring(0,10)
      this.cycleOfInspection = report.snapAudit.cycleId

      this.clientService.retrieveProject(report.snapAudit.schemeId)
      .subscribe(data =>{
        this.projectData = data

      })

      this.clientService.retrieveClient(report.snapAudit.clientId)
      .subscribe(data =>{
        this.clientData = data
      })
    })

    this.userService.getAllUsers()
      .subscribe(data => {
        this.users = data
      })

      this.feedbackForm = this.formBuilder.group({
        clientId: ['', Validators.required],
        projectId: ['', Validators.required],
        location: ['', Validators.required],
        A1: ['', Validators.required],
        A2: ['', Validators.required],
        A3: ['', Validators.required],
        radio: ['', Validators.required],
        suggestion: ['', Validators.required],
        feedbackOnTeam: ['', Validators.required],
        other: ['', Validators.required],
        
      })
  }

  submitfeedback(){
    console.log(this.feedbackForm.value);
    }

    submitDTMStatus(){

    }

  




  rowCount = 1
  addRow() {
    this.rowCount++
    let filed = `<tr _ngcontent-c1 >
                <td class='text-center p-1 border border-secondary'>${this.rowCount}</td>
                <td class='p-1 border border-secondary'>
                  <select class="form-control inspectorTeamUser" id='userlist-${this.rowCount}' title='${this.rowCount}'>
                  </select>
                </td>
                <td id='userLevel-${this.rowCount}' class='text-center p-1 border border-secondary'></td>
              </tr>`
    let areaFiled = <HTMLTableElement>document.querySelector('#inspectionTeamFrom')
    areaFiled.insertAdjacentHTML('beforeend', filed)

    let userlist = <HTMLSelectElement> document.querySelector(`#userlist-${this.rowCount}`)
    this.users.forEach(user =>{
      let option = `<option value='${user.userId}'>${user.userFullName}</option>`
      userlist.insertAdjacentHTML('beforeend', option)
    })
    userlist.addEventListener('change', (ev: Event) =>this.getUser(ev))
  }

  addNewRow(){
    this.rowCount++
    let filed = `<tr _ngcontent-c1 id="datarow${this.rowCount}">
    <td class='text-center p-1 border border-secondary'>${this.rowCount}</td>
    <td class='p-1 border border-secondary'><input type="text" class="form-control"></td>
    <td class='p-1 border border-secondary'><input type="text" class="form-control"></td>
    <td class='p-1 border border-secondary'><input type="text" class="form-control"></td>
    <td class='text-center p-1 border border-secondary'>
      <span class="badge badge-secondary" role="button">upload</span>
    </td>
    <td class='text-center p-1 border border-secondary'>
      <span class="badge badge-secondary" role="button">upload</span>
    </td>
    <td class='text-center p-1 border border-secondary'>
      <button class="btn btn-sm btn-danger" id="newRemove">Remove</button>
    </td>
  </tr>`
    let areaFiled = <HTMLTableElement>document.querySelector('#openingClosingForm')
    areaFiled.insertAdjacentHTML('beforeend', filed);

    let newRemoveButton = document.querySelector(`#newRemove`);
    if (newRemoveButton) {
      newRemoveButton.addEventListener('click', () => this.removeRoww(`datarow${this.rowCount}`));
    }
    

  }

  removeRoww(rowId: string) {
    let rowToRemove = document.getElementById(rowId);
    if (rowToRemove) {
      rowToRemove.remove();
    }}

  removeRow(){
    let rowToRemove = <HTMLTableElement>document.querySelector('#datarow');
    console.log(rowToRemove);
  if (rowToRemove) {
    rowToRemove.remove();
  }   }

  getUser(e){
    let loader = `<div class="spinner-border text-warning" role="status"></div>`
    let td = document.querySelector(`#userLevel-${e.target.title}`) as HTMLTableElement
    td.innerHTML = loader
    this.userService.retriveUser(e.target.value)
    .subscribe(data =>{
      let user:any = data
      if(user.l0){
        td.innerHTML = `<span class='badge badge-light'>L0</span>`
      }else if(user.l1){
        td.innerHTML = `<span class='badge badge-light'>L1</span>`
      }else if(user.l2){
        td.innerHTML = `<span class='badge badge-light'>L2</span>`
      }else if(user.l3){
        td.innerHTML = `<span class='badge badge-light'>L3</span>`
      }else{
        td.innerHTML = `<span class='badge badge-light'>Not Specified</span>`

      }

    })
  }

  submitInspectionTeamComposition(){

    let userListRow = document.querySelectorAll('.inspectorTeamUser')
    console.log(userListRow)

    let formData = []
    userListRow.forEach(user =>{
      let data = {
        snapAuditId: this.snapAuditId,
        projectId: this.projectData.projectId,
        clientId: this.clientData.clientId,
        fromDate:this.reportFromDate,
        toDate: this.reportToDate,
        userId: (<HTMLSelectElement>user).value,
        cycleId: this.cycleOfInspection
      }

      formData.push(data)

    }) 
    
    console.log(formData)

  }

}





