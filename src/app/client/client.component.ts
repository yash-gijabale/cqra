import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ClientServiceService } from '../service/client-service.service';

export class ClientData{
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
 
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ClientData> = new Subject();

  clients:ClientData[]

  constructor(private clientService:ClientServiceService,private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [ 10, 25, 50]
    };

    this.clientService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    
      // ADD THIS
      this.dtTrigger.next();
    
    }, (err) => {
      console.log('-----> err', err);
    })
  
    
  }

  
  editClient(id) {
    console.log(`update ${id}`)
    this.router.navigate(['createClient',id])
  };

  deActivateClient(id){
    const isDelete = confirm('Are you sure want to delete !');
    if(isDelete){
      this.clientService.deleteClient(id)
      .subscribe(
        data => {
          console.log('deleted !')
          location.reload();
        },
        err => console.log(err)
      )
    }
  }

}
