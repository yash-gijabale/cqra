import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
import { UserView } from '../user-log/user-log.component';
import { CommonService } from '../common.service';
import { TradeMaintanceService } from '../trade-maintance.service';
import { TradeGroup } from '../trade-group/trade-group.component';
import { Trade } from '../trade/trade.component';
import { RegionView } from '../add-region/add-region.component';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})

export class CreateProjectComponent implements OnInit {
  SelClientId: string = "0";
  SelMisId: string = "0";
  SelNCId: string = "0";
  SelRedAlert: string = "0";
  selTradeGroup: string = "0"
  id: number;
  clients: ClientData[]
  projectForm: FormGroup;
  redAlerts;
  submitted = false;
  regionalManagers: UserView[];
  tradeGroups: TradeGroup[]
  trades: Trade
  regions: RegionView
  isLoading: boolean = false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private tradeService: TradeMaintanceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.userService.getAllRegions().subscribe(data => this.regions = data)


    this.commonService.getRegionalManagers()
      .subscribe(
        data => {
          this.regionalManagers = data
          console.log(data)
        },
        err => console.log(err)
      )

    if (this.id != -1) {
      this.isLoading = true
      this.clientServiceService.retrieveProject(this.id)
        .pipe(first())
        .subscribe(x => {
          this.isLoading = false
          console.log(x)
          let data: any = x
          this.projectForm.patchValue(x)
          this.projectForm.patchValue({ projectStartDate: new Date(data.projectStartDate).toISOString().substring(0, 10) })
          this.projectForm.patchValue({ projectEndDate: new Date(data.projectEndDate).toISOString().substring(0, 10) })
        });

    }

    this.projectForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      projectName: ['', Validators.required],
      projectCode: ['', Validators.required],
      projectRegionalManagerId: ['', Validators.required],
      projectAddress: ['', Validators.required],
      projectCity: ['', Validators.required],
      projectKValue: ['', Validators.required],
      region: ['', Validators.required],
      projectArea: ['', Validators.required],
      areaUnit: ['', Validators.nullValidator],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      projectMisNCs: ['', Validators.required],
      projectNCOpen: ['', Validators.required],
      projectRedalert: ['', Validators.required],
      projectCCmails: ['', [Validators.required, Validators.email]],
      mockUpApproval: ['', Validators.nullValidator],
      openNc: ['', Validators.nullValidator],
      serviceType: ['', Validators.required],
      protocolFinalized: ['', Validators.nullValidator],
      training: ['', Validators.nullValidator],
      TradeGroupId: ['', Validators.nullValidator],
      TradeId: ['', Validators.nullValidator],
      noOfStructure: ['', Validators.required],
      projectType: ['', Validators.required]
    });

    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients = data;

    }, (err) => {
      console.log('-----> err', err);
    })

    this.tradeService.getAllTradeGroups()
      .subscribe(
        data => {
          this.tradeGroups = data
          console.log(this.tradeGroups)
        },
        err => console.log(err)
      )


  }

  get f() { return this.projectForm.controls; }

  submitLoad: boolean = false
  onSubmit() {
    this.submitted = true;
    this.id = this.route.snapshot.params['id'];
    if (this.projectForm.invalid) {
      console.log(this.projectForm)
      return;
    }

    this.submitLoad = true
    //Project form data
    let projectFormData = {
      clientId: this.projectForm.value.clientId,
      projectName: this.projectForm.value.projectName,
      projectCode: this.projectForm.value.projectCode,
      projectRegionalManagerId: this.projectForm.value.projectRegionalManagerId,
      projectAddress: this.projectForm.value.projectAddress,
      projectCity: this.projectForm.value.projectCity,
      projectKValue: this.projectForm.value.projectKValue,
      region: this.projectForm.value.region,
      projectArea: this.projectForm.value.projectArea,
      areaUnit: this.projectForm.value.areaUnit,
      projectStartDate: this.projectForm.value.projectStartDate,
      projectEndDate: this.projectForm.value.projectEndDate,
      projectMisNCs: this.projectForm.value.projectMisNCs,
      projectNCOpen: this.projectForm.value.projectNCOpen,
      projectRedalert: this.projectForm.value.projectRedalert,
      projectCCmails: this.projectForm.value.projectCCmails,
      serviceType: this.projectForm.value.serviceType,
      noOfStructure: this.projectForm.value.noOfStructure,
      mockUpApproval: this.projectForm.value.mockUpApproval ? 1 : 0,
      openNc: this.projectForm.value.openNc ? 1 : 0,
      protocolFinalized: this.projectForm.value.protocolFinalized ? 1 : 0,
      training: this.projectForm.value.training ? 1 : 0,
      projectStatus: true,
      projectType: this.projectForm.value.projectType

    }
    console.log(projectFormData)

    //Trade allocation data 


    // return
    console.log("Id==" + this.id);
    if (this.id == -1) {
      let createdProject;
      this.clientServiceService.createProject(projectFormData)
        .subscribe(data => {
          console.log('project created-->', data)
          createdProject = data;
          this.submitLoad = false

          let tradeAllocationData = []
          let trades = this.projectForm.value.TradeId
          trades && trades.forEach(trade => {
            let tradeAllocate = {
              fkSchemeId: createdProject && createdProject.projectId,
              fkTradeId: trade
            }
            tradeAllocationData.push(tradeAllocate)
          })

          this.clientServiceService.createTradeAllocation(tradeAllocationData)
            .subscribe(
              data => console.log('trade allocared-->', data),
              err => console.log(err))
        },
          err => console.log(err)
        );
    } else {
      this.clientServiceService.updateProject(this.projectForm.value, this.id)
        .subscribe(
          data => {
            console.log(data)
            this.submitLoad = false

            this.router.navigate(['project'])
          }
        )
    }
  }

  FillRedAlertDDL() {
    alert(this.SelNCId);
    if (this.SelNCId == "1") {
      this.redAlerts = [{ value: "2", name: "Moderate and above" }, { value: "3", name: "Severe and above" }, { value: "4", name: "Very severe and above" }, { value: "5", name: "Critical" }]
    }
  }

  getTrades() {
    console.log(this.selTradeGroup);
    this.tradeService.getTradeByTradegroupId(this.selTradeGroup)
      .subscribe(
        data => {
          console.log('trades --->', data)
          this.trades = data
        },
        err => console.log(err)
      )
  }

}
