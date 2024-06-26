import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientData } from 'src/app/client/client.component';
import { CommonService } from 'src/app/common.service';
import { SnackBarComponent } from 'src/app/loader/snack-bar/snack-bar.component';
import { ProjectData } from 'src/app/project/project.component';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { ReportService } from 'src/app/service/report.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-quality-observation',
  templateUrl: './create-quality-observation.component.html',
  styleUrls: ['./create-quality-observation.component.css']
})
export class CreateQualityObservationComponent implements OnInit {
  qualityObservationForm: FormGroup

  clients: ClientData[] = []
  projects: ProjectData[] = []
  SelProject:any
  SelClient: any

  reportId:number

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService,
    private commonService: CommonService,
    private reportService: ReportService,
    private snackBar: SnackBarComponent,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.reportId = Number(this.route.snapshot.params['id'])

    this.clientService.getAllClients().subscribe((data) => {
      console.log(data)
      this.clients = data
    })

    this.qualityObservationForm = this.formBuilder.group({
      qualityObservationClientId: ['', Validators.required],
      qualityObservationSchemasId: ['', Validators.required],
      qualityObservationResponsiblePerson: ['', Validators.required],
      qualityObservationCqraRepresentative: ['', Validators.required],
      qualityObservationContractorReprentative: ['', Validators.required],
      qualityObservationDateObservation: ['', Validators.required],
      qualityObservationReportHeader: ['', Validators.required],
    })
  }

  getProject() {
    this.commonService.getClientProject(this.SelClient).subscribe((data) => {
      this.projects = data
    })
  }

  onSubmit() {

    if(this.reportId === -1){
      this.reportService.createQualityObservationReport(this.qualityObservationForm.value)
      .subscribe(data =>{
        console.log(data)
        this.snackBar.showSuccess('Qaulity Observation Report Added')
      }, err =>{
        console.log(err)
        this.snackBar.showSnackError()
      })
    }else{
      this.reportService.updateQualityObsevationRepor(this.reportId, this.qualityObservationForm.value)
      .subscribe(data =>{
        console.log('updated', data)
        this.snackBar.showSuccess('Quality Observation report updated')
      }, err  =>{
        console.log(err)
        this.snackBar.showSnackError()
      })

    }
  }



}
