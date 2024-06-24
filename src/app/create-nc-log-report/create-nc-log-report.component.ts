import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { StructureData } from '../wbs/wbs.component';
import { TradeMaintanceService } from '../trade-maintance.service';

@Component({
  selector: 'app-create-nc-log-report',
  templateUrl: './create-nc-log-report.component.html',
  styleUrls: ['./create-nc-log-report.component.css']
})
export class CreateNcLogReportComponent implements OnInit {
  ncLogForm: FormGroup;

  submitted = false;
  SelProject: any
  SelClient: any
  // SelTrade: any
  // SelStructure: any
  clients: ClientData[] = []
  projects: ProjectData[] = []
  structures: StructureData[] = []
  trades: any

  addTrades = []
  addStructures = []



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,

  ) { }

  ngOnInit() {

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log(data)
      this.clients = data
    })

    this.ncLogForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      reportFrom: ['', Validators.required],
      reportTo: ['', Validators.required],
      approvedBy: ['', Validators.required],
      designation: ['', Validators.required],
    })

  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => {
      this.projects = data
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      console.log(data)
      this.structures = data
    })

    this.tradeService.getProjectTrades(this.SelProject).subscribe((data) => {
      console.log(data);
      this.trades = data
    })
  }

  // getTrade() {
  //   this.tradeService.getProjectTrades(this.SelProject).subscribe((data) => {
  //     console.log(data);
  //     this.trades = data
  //   })
  // }


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

  //all checkbox
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
    // console.log('structures..', this.addStructures);

  }

  addTradeAll(e) {
    this.addAllCheckboxData(this.addTrades, e, '.tradeCheckbox');
    // console.log('trades..', this.addTrades);

  }


  onSubmit() {
    let formData = {
      ncLogReport: {
        ...this.ncLogForm.value,
        structures: this.addStructures,
        trades: this.addTrades
      }
    }
    console.log(formData)

  }

}  