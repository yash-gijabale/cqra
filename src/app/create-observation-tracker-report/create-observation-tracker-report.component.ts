import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from '../common.service';
import { ProjectData } from '../project/project.component';
import { ClientServiceService } from '../service/client-service.service';
import { ClientData } from '../client/client.component';
import { StageData, StructureData } from '../wbs/wbs.component';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';
import { ContractorData } from '../contractor-forman/contractor-forman.component';
import { SupervisorData } from '../contractor-supervisor/contractor-supervisor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionReport } from '../creaate-inspectionreport/creaate-inspectionreport.component';
import { InspectorTraning } from '../service/inspectionTraining.service';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';
import { debounce } from 'rxjs/operators';



export class otrReportData {
  constructor(
    public observationtracker: any,
    public trade: Array<Number>,
    public stages: Array<Number>
  ) {

  }
}
@Component({
  selector: 'app-create-observation-tracker-report',
  templateUrl: './create-observation-tracker-report.component.html',
  styleUrls: ['./create-observation-tracker-report.component.css']
})
export class CreateObservationTrackerReportComponent implements OnInit {

  registerForm: FormGroup;
  SelProject: any;
  SelStructure: any;
  SelClient: any;
  SelContractor: any
  projects: ProjectData[];
  submitted: boolean
  structures: StructureData[] = []
  stages: StageData[] = []
  clients: ClientData[] = []
  trades: Trade[] = []
  // contractors: ContractorData[]
  // supervisors: SupervisorData
  otrId: Number
  typeId: Number
  masterIds: any
  userId: number = Number(localStorage.getItem('id'))
  cycle: any

  contractors: any = []
  users: any = []

  constructor(
    private commonServices: CommonService,
    private clientService: ClientServiceService,
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute,
    private router: Router,
    private imspectorTraining: InspectorTraning,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {
    this.submitted = true;
    this.otrId = this.route.snapshot.params['id']
    this.typeId = this.route.snapshot.params['type']
    this.clientService.getAllClients()
      .subscribe(data => this.clients = data)

    // this.commonServices.getAllContractors()
    //   .subscribe(data => {
    //     console.log('contractor', data)
    //     this.contractors = data
    //   })

    this.commonServices.getAllCycleOfInspection()
      .subscribe(data => {
        this.cycle = data
      })


    this.commonServices.getAllUsers()
      .subscribe(data => {
        this.users = data
        console.log('users', data)
      })

    if (this.otrId != -1) {
      this.commonServices.getOTRReport(this.otrId)
        .subscribe(data => {
          console.log(data)
          // let retriveData = data
          this.commonServices.getClientProject(data.observationtracker.clientId).subscribe(data => this.projects = data)
          this.commonServices.getStructures(data.observationtracker.clientId, data.observationtracker.projectId).subscribe(data => this.structures = data)
          this.tradeService.getProjectTrades(data.observationtracker.projectId).subscribe(data => this.trades = data)

          let structures = String(data.observationtracker.structures).split(',').map(Number)
          if (structures.length === 1) {
            this.commonServices.getStages(data.observationtracker.clientId, data.observationtracker.projectId, structures[0]).subscribe(data => this.stages = data)
          }

          this.addStructures = structures
          this.addTrades = data.trade
          this.addStages = data.stages
          this.addUsers = String(data.observationtracker.users).split(',').map(Number)
          this.addContractors = String(data.observationtracker.contractors).split(',').map(Number)

          console.log(structures, this.addUsers)

          this.registerForm.patchValue(data.observationtracker)
          // this.registerForm.patchValue({ obstraTrade: data.trade })
          // this.registerForm.patchValue({ obstraStage: data.stages })
          this.registerForm.patchValue({ fromDate: new Date(data.observationtracker.fromDate).toISOString().substring(0, 10) })
          this.registerForm.patchValue({ toDate: new Date(data.observationtracker.toDate).toISOString().substring(0, 10) })

          this.clientService.getContractorByProjectId(data.observationtracker.projectId).subscribe(data => { this.contractors = data })
        })

    }

    this.registerForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectId: ['', Validators.required],
      // structures: ['', Validators.required],
      // obstraTrade: ['', Validators.required],
      // obstraStage: ['', Validators.required],
      // contractors: ['', Validators.required],
      // users: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      clientRep: ['', Validators.required],
      cqraRep: ['', Validators.required],
      reportHeader: ['', Validators.required],
      otherPerson: ['', Validators.required],
      reportName: ['', Validators.nullValidator],
      masterId: ['', Validators.required],
      cycleOfInspection: ['', Validators.required]
    })


    this.imspectorTraining.getMasterIdsByUserId(this.userId)
      .subscribe(data => {
        console.log(data)
        this.masterIds = data

      })
  }


  getMasterData(e) {
    this.imspectorTraining.getMasterDetails(e.target.value, this.userId)
      .subscribe(data => {
        console.log('master data', data)
        this.commonServices.getClientProject(data[0].clientId).subscribe(data => this.projects = data)
        this.commonServices.getStructures(data[0].clientId, data[0].projectId).subscribe(data => { this.structures = data })
        this.tradeService.getProjectTrades(data[0].projectId).subscribe(data => { this.trades = data })
        this.clientService.getContractorByProjectId(data[0].projectId).subscribe(data => { this.contractors = data })

        this.registerForm.patchValue({ clientId: data[0].clientId })
        this.registerForm.patchValue({ cycleOfInspection: data[0].cycleId })
        this.registerForm.patchValue({ projectId: data[0].projectId })
        this.registerForm.patchValue({ fromDate: new Date(data[0].fromDate).toISOString().substring(0, 10) })
        this.registerForm.patchValue({ toDate: new Date(data[0].toDate).toISOString().substring(0, 10) })
      })
  }


  getProjects() {
    console.log(this.SelClient)
    this.commonServices.getClientProject(this.SelClient).subscribe(data => this.projects = data)
  }
  getStructure() {
    this.commonServices.getStructures(this.SelClient, this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.structures = data
      })

    this.tradeService.getProjectTrades(this.SelProject)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

    this.clientService.getContractorByProjectId(this.SelProject)
      .subscribe(data => {
        console.log('contractor-->', data)
        this.contractors = data
      })

  }
  getStages(e) {
    console.log(e)
    this.commonServices.getStages(this.SelClient, this.SelProject, this.SelStructure)
      .subscribe(data => {
        console.log(data)
        this.stages = data
      })
  }

  get f() { return this.registerForm.controls }

  submitLoad: boolean = false
  showClipboard: boolean = false
  reportName: String = ''
  onSubmit() {
    this.submitLoad = true
    let formData = {
      inspectReport: {
        ...this.registerForm.value,
        structures: this.addStructures.toString(),
        contractors: this.addContractors.toString(),
        users: this.addUsers.toString(),
        type: this.typeId
      },
      obstraTrade: this.addTrades,
      obstraStage: this.addStages
    }

    console.log(formData)
    // return

    // return
    if (this.otrId != -1) {
      console.log('updateting...')
      this.commonServices.updateOtr(formData, this.otrId)
        .subscribe(data => {
          console.log('updated', data)
          this.submitLoad = false
          this.snackBar.showSuccess('Report Updated')
          this.showClipboard = true
        }, err => {
          this.submitLoad = false
          this.snackBar.showSnackError()

        })

    } else {

      this.commonServices.createObservationTrackerReport(formData)
        .subscribe(
          data => {
            console.log(data)
            this.submitLoad = false
            this.snackBar.showSuccess('Report Created')
            this.showClipboard = true
            this.reportName = data[0].reportName
          },
          err => {
            this.submitLoad = false
            this.snackBar.showSnackError()
          })
    }
  }

  edit(id) {
    this.router.navigate(['createOTR', id])
  }

  addStructures = []
  addStrucuture(e) {
    this.addCheckboxData('addStructures', e)
    if (this.addStructures.length === 1) {
      this.commonServices.getStages(this.SelClient, this.SelProject, this.addStructures[0])
        .subscribe(data => {
          console.log(data)
          this.stages = data
        })
    } else {
      this.stages = []
      this.addStages = []
    }
    console.log(this.addStructures)
  }

  addStages = []
  addstage(e) {
    this.addCheckboxData('addStages', e)
    console.log('stage', this.addStages)
  }

  addTrades = []
  addTrade(e) {
    this.addCheckboxData('addTrades', e)
    console.log('trades', this.addTrades)
  }

  addContractors = []
  addContractor(e) {
    this.addCheckboxData('addContractors', e)
    console.log('contractor', this.addContractors)
  }

  addUsers = []
  addUser(e) {
    this.addCheckboxData('addUsers', e)
    console.log('users', this.addUsers)
  }

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



  //ALL SELECT
  addStrucutureAll(e) {
    this.handelAllSelectCheckbox('strucuresCheckbox', 'addStructures', e)
    console.log(this.addStructures)
  }

  addSatgeAll(e) {
    this.handelAllSelectCheckbox('stageCheckbox', 'addStages', e)
    console.log(this.addStages)
  }

  addTradeAll(e) {
    this.handelAllSelectCheckbox('tradeCheckbox', 'addTrades', e)
    console.log(this.addTrades)
  }

  addContractorAll(e) {
    this.handelAllSelectCheckbox('contractorCheckBox', 'addContractors', e)
    console.log(this.addContractors)
  }

  addUserAll(e) {
    this.handelAllSelectCheckbox('userCheckbox', 'addUsers', e)
    console.log(this.addUsers)
  }


  handelAllSelectCheckbox(className, arry, e) {
    if (e.target.checked) {
      let inputArray = Array.from(document.getElementsByClassName(`${className}`))
      console.log(inputArray)
      this[arry] = []
      inputArray.forEach(item => {
        let a = item as HTMLInputElement
        this[arry].push(Number(a.value))

      });

      $(`.${className}`).prop('checked', true)
    } else {
      this[arry] = []
      $(`.${className}`).prop('checked', false)
    }

  }

  copyToClipboard() {
    let clipArea = document.getElementById('clipArea') as HTMLDivElement
    window.navigator['clipboard'].writeText(clipArea.innerText)
  }
}
