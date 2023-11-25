import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ClientServiceService } from "../service/client-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TradeMaintanceService } from "../trade-maintance.service";
import { TradeGroup } from "../trade-group/trade-group.component"; 
import {first} from 'rxjs/operators'

@Component({
  selector: "app-create-tarde",
  templateUrl: "./create-tarde.component.html",
  styleUrls: ["./create-tarde.component.css"],
})
export class CreateTardeComponent implements OnInit {
  SelTradeGp: string = "0";
  registerForm: FormGroup;
  submitted = false;
  tradeGroups: TradeGroup[]
  tradeId:number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService
  ) {}

  ngOnInit() {
    this.tradeId = this.route.snapshot.params['id'];

    this.tradeService.getAllTradeGroups().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);
        this.tradeGroups = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    if(this.tradeId != -1)
    {
      this.tradeService.retriveTrade(this.tradeId)
      .pipe(first())
      .subscribe(data => {
        this.registerForm.patchValue(data)
      })
    }

    this.registerForm = this.formBuilder.group({
      tradeName: ["", Validators.required],
      discription: ["", Validators.required],
      keyResultArea: ["", Validators.required],
      tradegroupId: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log("Id==");
    let fromData = {
      tradeName: this.registerForm.value.tradeName,
      status: true,
      tradegroupId: this.registerForm.value.tradegroupId,
    }

    let UpdatefromData = {
      tardeId: this.tradeId,
      tradeName: this.registerForm.value.tradeName,
      status: true,
      tradegroupId: this.registerForm.value.tradegroupId,
    }
    console.log(fromData);
    if(this.tradeId != -1)
    {
      this.tradeService.updateTrade(UpdatefromData, this.tradeId)
      .subscribe(data => {
        console.log('data updated')
      },(err) => console.log(err))

    }else{
      this.tradeService.createTrade(fromData)
      .subscribe(data => {
        console.log(data)
      })
    }

  }
}
