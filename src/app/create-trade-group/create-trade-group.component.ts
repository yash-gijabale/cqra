import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';

@Component({
  selector: 'app-create-trade-group',
  templateUrl: './create-trade-group.component.html',
  styleUrls: ['./create-trade-group.component.css']
})
export class CreateTradeGroupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  tradeGroupId: number

  constructor(
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute,
    private snackBar: SnackBarComponent

  ) { }

  ngOnInit() {
    this.tradeGroupId = this.route.snapshot.params['id']
    console.log(this.tradeGroupId)
    if (this.tradeGroupId != -1) {
      this.tradeService.retriveTradeGroup(this.tradeGroupId)
        .pipe(first())
        .subscribe(data => {
          this.registerForm.patchValue(data)
        })
    }

    this.registerForm = this.formBuilder.group({
      tradeGroupName: ['', Validators.required],
      // tradeGroupNumber: ['', Validators.required],
      // tradeGroupSequence: ['', Validators.required]
    })
  }

  get f() { return this.registerForm.controls; }

  isLoad: boolean = false
  onSubmit() {
    this.submitted = true
    console.log("Id==");
    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoad = true
    let formData = { ...this.registerForm.value, tradegroupId: this.tradeGroupId , status: true}

    if (this.tradeGroupId != -1) {
      this.tradeService.updateTradeGroup(formData, this.tradeGroupId)
        .subscribe(data => {
          console.log('updates')
          this.isLoad = false
          this.snackBar.showSuccess('Trade-Group Updated!')
        }, err => {
          this.isLoad = false
          this.snackBar.showSnackError()
        })


    } else {

      this.tradeService.createTradeGroup({...this.registerForm.value,  status: true})
        .subscribe(data => {
          console.log(data)
          this.isLoad = false
          this.snackBar.showSuccess('Trade-Group Added!')
        }, err =>{
          this.isLoad = false
          this.snackBar.showSnackError()
        })

        
    }

  }

}
