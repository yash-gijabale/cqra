import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ClientServiceService } from "../service/client-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TradeMaintanceService } from "../trade-maintance.service";
import { TradeGroup } from "../trade-group/trade-group.component";
import { first } from 'rxjs/operators'

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
  tradeId: number
  filed:string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService
  ) { }

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

    if (this.tradeId != -1) {
      this.tradeService.retriveTrade(this.tradeId)
        .pipe(first())
        .subscribe(data => {
          this.registerForm.patchValue(data)
        })
    }

    this.registerForm = this.formBuilder.group({
      tradeName: ["", Validators.required],
      discription: ["", Validators.required],
      keyResultArea: [[], Validators.required],
      tradegroupId: ["", Validators.required],
      tradeSequence: ['', Validators.required],
      tradeNumber: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    let keyResultAreaElement = document.querySelectorAll('.keyResultArea')
    // console.log(document.querySelectorAll('.keyResultArea'))
    let keyResultArea = []
    keyResultAreaElement.forEach(item => {
      keyResultArea.push((<HTMLInputElement>item).value)
    })
    this.registerForm.value.keyResultArea = keyResultArea
    console.log(JSON.stringify(this.registerForm.value))
    return
    this.submitted = true;
    console.log("Id==");
    if (this.registerForm.invalid) {
      return
    }
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
    if (this.tradeId != -1) {
      this.tradeService.updateTrade(UpdatefromData, this.tradeId)
        .subscribe(data => {
          console.log('data updated')
        }, (err) => console.log(err))

    } else {
      this.tradeService.createTrade(fromData)
        .subscribe(data => {
          console.log(data)
        })
    }

  }
  addKeyResultField() {
    let filed = '<input type="text" formControlName="keyResultArea" class="form-control keyResultArea" />'
    let areaFiled = <HTMLDivElement>document.querySelector('#keyResultArea')
    areaFiled.insertAdjacentHTML('beforeend',filed)
  }
}
