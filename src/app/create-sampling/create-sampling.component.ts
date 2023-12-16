import { Component, OnInit } from '@angular/core';
import { CommonService } from "../common.service";
import { ProjectData } from '../project/project.component';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TradeMaintanceService } from "../trade-maintance.service";
import { TradeGroup } from '../trade-group/trade-group.component';
import { Trade } from '../trade/trade.component';
import { ClientServiceService } from '../service/client-service.service';
import { ClientData } from '../client/client.component';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

export class SamplingData {
  constructor(
    public projectId: number,
    public tradeGroupId: number,
    public tradeId: number,
    public structureId: number,
    public completePercentage: number
  ) { }
}

export class SamplingView {
  constructor(
    public idU: number,
    public tradeGroupTextU: string,
    public completePercentageU: number,
    public structureNameU: string,
    public projectNameU: String,
    public tradeNameU: string
  ) { }
}

@Component({
  selector: 'app-create-sampling',
  templateUrl: './create-sampling.component.html',
  styleUrls: ['./create-sampling.component.css']
})
export class CreateSamplingComponent implements OnInit {

  samplingId: number
  projects: ProjectData[]
  tradeGroups: TradeGroup[]
  clients: ClientData[]
  trades: Trade[]
  samplingForm: FormGroup;
  structures: any
  SelStructure:any
  SelClientId: any
  SelProject: any
  submitted = false

  constructor(
    private commanService: CommonService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {

    this.samplingId = this.route.snapshot.params['id']

    // this.commanService.getAllProject()
    //   .subscribe(
    //     data => this.projects = data,
    //     err => console.log(err)
    //   )
    if (this.samplingId != -1) {
      this.clientService.retriveSampling(this.samplingId)
        .pipe(first())
        .subscribe(
          data => this.samplingForm.patchValue(data),
          err => console.log(err))
    }
    this.tradeService.getAllTradeGroups()
      .subscribe(
        data => {
          this.tradeGroups = data
          console.log(data)
        },
        err => console.log(err)
      )
    this.tradeService.getAllTrades()
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })
    this.clientService.getAllClients()
      .subscribe(
        data => {
          this.clients = data;
        },
        err => console.log(err)
      )

    this.samplingForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      tradeGroupId: ['', Validators.required],
      tradeId: ['', Validators.required],
      structureId: ['', Validators.required],
      completePercentage: ['', Validators.required],
    })
  }

  get f() {
    return this.samplingForm.controls;
  }

  getProjects() {
    console.log(this.SelClientId)
    this.commanService.getClientProject(this.SelClientId)
      .subscribe(
        (data) => {
          console.log('Project Data==', data)
          this.projects = data;

        }, (err) => {
          console.log('-----> err', err);
        })
  }
  getStructure() {
    console.log(this.SelProject)
    this.commanService.getStructures(this.SelClientId, this.SelProject)
      .subscribe(
        (data) => {
          console.log('Structure Data==', data)
          this.structures = data;

        }, (err) => {
          console.log('-----> err', err);
        })
  }

  onSubmit() {

    this.submitted = true;

    if (this.samplingForm.invalid) {
      return;
    }

    let formData = {
      projectId: this.samplingForm.value.projectId,
      tradeGroupId: this.samplingForm.value.tradeGroupId,
      tradeId: this.samplingForm.value.tradeId,
      structureId: this.samplingForm.value.structureId,
      completePercentage: this.samplingForm.value.completePercentage
    }
    console.log(formData)

    if (this.samplingId != -1) {
      this.clientService.updateSampling(formData, this.samplingId)
        .subscribe(
          data => console.log('updated', data),
          err => console.log(err)
        )
    } else {
      this.clientService.createSampling(formData)
        .subscribe(data => {
          console.log(data)
        },
          err => console.log(err)
        )
    }
  }

  // getStructure(){
  //   console.log(this.SelProject)
  //   this.commanService.getStructures(this.SelClientId,this.SelProject)
  //   .subscribe(
  //     (data) => {
  //     console.log('Structure Data==',data)
  //     this.structures= data;

  //   }, (err) => {
  //     console.log('-----> err', err);
  //   })
  // }
}
