import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ProjectData, ProjectView } from '../project/project.component';
import { Data } from 'popper.js';
import { data } from 'jquery';
import { TradeData } from '../create-tarde/create-tarde.component';
import { StructureData } from '../wbs/wbs.component';

@Component({
  selector: 'app-create-ncs-status-report',
  templateUrl: './create-ncs-status-report.component.html',
  styleUrls: ['./create-ncs-status-report.component.css']
})


export class CreateNcsStatusReportComponent implements OnInit {
  ncStatusForm: FormGroup;
  submitted = false;
  SelProject: any;
  userId: number = Number(localStorage.getItem('id'))

  // SelClient: string = "0";
  // SelTrade: string = "0";
  // SelStructure: string = "0";
  // clients: ClientData[]
  projects: ProjectView[]
  structures: StructureData[] = []
  trades: TradeData[] = []

  addStructures: number[] = [];
  addTrades: number[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
    private clientServiceService: ClientServiceService) { }

  ngOnInit() {


    this.clientServiceService.getAllProject()
      .subscribe(data => {
        console.log('projects ==>', data)
        this.projects = data;
      })


    this.ncStatusForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      stsType: ['', Validators.required],
      addressTo: ['', Validators.required]
    });

  }

  // get f() { return this.ncStatusForm.controls; }



  getStructureAndTrade() {
    this.commonService.getStructureByProjectId(this.SelProject)
      .subscribe((data) => {
        console.log(data);
        this.structures = data
      });

    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      });
  }

  //ideal fun
  addCheckboxData(arry, e) {
    let id = Number(e.target.value)
    if (e.target.checked) {
      let isExist = this[arry].find(item => {
        return id == item
      })
      if (!isExist) {
        this[arry].push(id)
      }
    } else {
      this[arry] = this[arry].filter(item => {
        return id != item
      })
    }
  }

  addStructure(e) {
    this.addCheckboxData('addStructures', e)
    console.log('structures', this.addStructures)
  }

  addTrade(e) {
    this.addCheckboxData('addTrades', e)
    console.log('trades', this.addTrades)
  }

  //slectall checkbox
  addAllCheckboxData(arry: number[], e: Event, checkboxSelector: string) {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      $(checkboxSelector).prop('checked', true);
      const elements = document.querySelectorAll(checkboxSelector);
      arry.length = 0;
      elements.forEach(item => {
        const id = Number((item as HTMLInputElement).value);
        arry.push(id);
      });
    } else {
      $(checkboxSelector).prop('checked', false);
      arry.length = 0;
    }
  }


  addStrucutureAll(e) {
    this.addAllCheckboxData(this.addStructures, e, '.strucuresCheckbox');
    console.log('Structures...', this.addStructures)

  }

  addTradeAll(e) {
    this.addAllCheckboxData(this.addTrades, e, '.tradeCheckbox');
    console.log('Trades...', this.addTrades)

  }

  onSubmit() {
    let formData = {
      ncStatusReport: {
        ...this.ncStatusForm.value,
        structures: this.addStructures,
        trades: this.addTrades,

      },
      // obstraTrade: this.addTrades,
      // obstraStage: this.addStages
    }

    console.log(formData)
  }
}


