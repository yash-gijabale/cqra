import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ClientData } from 'src/app/client/client.component';
import { ClientServiceService } from 'src/app/service/client-service.service';


@Component({
  selector: 'app-quality-observation',
  templateUrl: './quality-observation.component.html',
  styleUrls: ['./quality-observation.component.css']
})
export class QualityObservationComponent implements OnInit {

  dtOptions: any
  dtTrigger:any
  clients: ClientData[] = []
  isLoading: boolean = false
  SelClient: any
  constructor(
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {

    this.clientService.getAllClients().subscribe((data) => {
      console.log(data)
      this.clients = data
    })
  }

}
