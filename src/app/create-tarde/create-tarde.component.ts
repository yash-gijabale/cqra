import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ClientServiceService } from "../service/client-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TradeMaintanceService } from "../trade-maintance.service";
import { TradeGroup } from "../trade-group/trade-group.component";
import { first } from 'rxjs/operators'


export class TradeData {
  constructor(
    public trade: {
      tardeId: number,
      tradegroupId: Number,
      tradeName: string,
      status: boolean,
      tradeNumber: string,
      tradeSequence: number
    },
    public tradeKey: Array<String>,
    public tradeTradeGroupId: Array<number>
  ) { }
}

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
  filed: string
  allocatedTradegroup = []
  allocatedTradegroupObj: Object = {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService
  ) { }

  ngOnInit() {
    this.tradeId = this.route.snapshot.params['id'];

    if (this.tradeId != -1) {
      this.tradeService.retriveTrade(this.tradeId)
        .pipe(first())
        .subscribe(data => {
          console.log(data)
          this.registerForm.patchValue(data.trade)

          this.allocatedTradegroup = data.tradeTradeGroupId
          this.allocatedTradegroup.forEach(item => {
            this.allocatedTradegroupObj[item] = true
          })

          let areaFiled = <HTMLDivElement>document.querySelector('#keyResultArea')
          if (data.tradeKey.length) {
            areaFiled.removeChild(areaFiled.firstElementChild)
            data.tradeKey.forEach((item) => {
              let filed = `<input type="text" formControlName="keyResultArea" class="form-control keyResultArea" value='${item}' />`
              areaFiled.insertAdjacentHTML('beforeend', filed)
            })
          }
        })
    }

    this.tradeService.getAllTradeGroups().subscribe(
      (data) => {
        console.log("----> office service : get all data", data);


        this.tradeGroups = data;
      },
      (err) => {
        console.log("-----> err", err);
      }
    );

    this.registerForm = this.formBuilder.group({
      tradeName: ["", Validators.required],
      discription: ["", Validators.nullValidator],
      keyResultArea: [[], Validators.nullValidator],
      tradegroupId: ["", Validators.nullValidator],
      tradeSequence: ['', Validators.required],
      tradeNumber: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  isLoad: boolean = false
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      return;
    }

    let keyResultAreaElement = document.querySelectorAll('.keyResultArea')

    let tradegroupIdElement = document.querySelectorAll('.tradeGroups')

    let tradegroupIds = []
    tradegroupIdElement.forEach(item => {
      if ((<HTMLInputElement>item).checked) {
        tradegroupIds.push((<HTMLInputElement>item).value)
      }
    })
    // return
    let keyResultArea = []
    keyResultAreaElement.forEach(item => {
      keyResultArea.push((<HTMLInputElement>item).value)
    })
    // this.registerForm.value.keyResultArea = keyResultArea
    let formData = {
      trade: {
        tradeName: this.registerForm.value.tradeName,
        discription: this.registerForm.value.discription,
        tradeSequence: this.registerForm.value.tradeSequence,
        tradeNumber: this.registerForm.value.tradeNumber,
        status: true
      },
      tradeKey: keyResultArea,
      tradeTradeGroupId: tradegroupIds
    }
    // console.log(formData)
    // return
   
    this.isLoad = true

    console.log(formData);
    // return
    if (this.tradeId != -1) {
      this.tradeService.updateTrade(formData, this.tradeId)
        .subscribe(data => {
          console.log('data updated')
          this.isLoad = false

        }, (err) => console.log(err))
      // console.log(formData)

    } else {
      this.tradeService.createTrade(formData)
        .subscribe(data => {
          console.log(data)
          this.isLoad = false

        })
    }

  }
  addKeyResultField() {
    let filed = '<input type="text" formControlName="keyResultArea" class="form-control keyResultArea" />'
    let areaFiled = <HTMLDivElement>document.querySelector('#keyResultArea')
    areaFiled.insertAdjacentHTML('beforeend', filed)
  }
}
