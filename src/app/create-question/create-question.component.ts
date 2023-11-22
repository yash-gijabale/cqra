import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trade } from '../trade/trade.component';
import { ClientData } from '../client/client.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  SelClientId:string="0";  
  SelTrade:string="0";  
  registerForm: FormGroup;
  trades:Trade[]
  clients:ClientData[]
  submitted = false;

  constructor( private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService, private tradeMaintanceService:TradeMaintanceService,private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.tradeMaintanceService.getAllTrades().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.trades= data;
    }, (err) => {
      console.log('-----> err', err);
    })

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    }, (err) => {
      console.log('-----> err', err);
    })

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
     
    }
}