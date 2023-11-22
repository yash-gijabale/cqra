import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trade } from '../trade/trade.component';
import { QuestionGroup } from '../question-group/question-group.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-question-heading',
  templateUrl: './create-question-heading.component.html',
  styleUrls: ['./create-question-heading.component.css']
})
export class CreateQuestionHeadingComponent implements OnInit {

  SelTrade:string="0";  
  SelQuestionGp:string="0";  
  registerForm: FormGroup;
  trades:Trade[]
  questionGroups:QuestionGroup[];
  submitted = false;

  constructor( private route: ActivatedRoute,private router: Router,private tradeMaintanceService:TradeMaintanceService,private formBuilder: FormBuilder,) { }

  ngOnInit() {

    
    this.tradeMaintanceService.getAllTrades().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.trades= data;
    
      // ADD THIS
    
    }, (err) => {
      console.log('-----> err', err);
    })

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
     
    }
}
