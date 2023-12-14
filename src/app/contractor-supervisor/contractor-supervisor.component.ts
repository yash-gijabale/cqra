import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';

export class ContractorData{
  constructor(
    public clientId:number,
    public clientName: string,
    public clientCode: string,
    public clientContactPerson: string,
    public clientAddress: string,
    public clientEmail: string
  ){

  }
}

export class SupervisorData{
  constructor(
    public supervisorId:number,
    public contractorId: number,
    public supervisorName: string,
    public isActive: boolean,
  ){

  }
}
@Component({
  selector: 'app-contractor-supervisor',
  templateUrl: './contractor-supervisor.component.html',
  styleUrls: ['./contractor-supervisor.component.css']
})
export class ContractorSupervisorComponent implements OnInit {
  title = "datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SupervisorData> = new Subject();

  clients:SupervisorData[]
  
  constructor( private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService, private formBuilder: FormBuilder,) { }


  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
    };

    this.clientServiceService.getAllSupervisor().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
      this.dtTrigger.next()
    }, (err) => {
      console.log('-----> err', err);
    })
  }

  editClient(id){
    this.router.navigate(['createContractorSupervisor',id])

  }

  deActivateClient(id)
  {
    let isDelete = confirm('Are you sure want to delete this ?')
    if(isDelete){
      console.log(id)
      this.clientServiceService.deleteSupervisor(id)
      .subscribe(data=>{
        this.router.navigate(['contractorSupervisor']);
        location.reload()
      },
      (err)=>{
        console.log(err)
      })
    }
  }
}
