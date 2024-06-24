import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { StructureData } from '../wbs/wbs.component';
import { TradeMaintanceService } from '../trade-maintance.service';

@Component({
  selector: 'app-nc-closure-procedure',
  templateUrl: './nc-closure-procedure.component.html',
  styleUrls: ['./nc-closure-procedure.component.css']
})
export class NcClosureProcedureComponent implements OnInit {
  ncClosureProcedure: FormGroup

  SelProject: any

  projects: ProjectData[] = []
  structures: StructureData[] = []
  trades: any

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,

  ) { }

  ngOnInit() {

    this.commonService.getAllProject().subscribe((data) => {
      this.projects = data
    })

    this.ncClosureProcedure = this.formBuilder.group({
      projectId: ['', Validators.required],
      structureId: ['', Validators.required],
      tradeId: ['', Validators.required],
    })
  }

  getStructure() {
    this.commonService.getStructureByProjectId(this.SelProject).subscribe((data) => {
      this.structures = data
    })
  }

  getTrade() {
    this.tradeService.getAllTrades().subscribe((data) => {
      console.log(data)
      this.trades = data
    })
  }

  onSubmit() {
    let formdata = {
      ncClosure: {
        ...this.ncClosureProcedure.value
      }
    }
    console.log(formdata)
  }

}
