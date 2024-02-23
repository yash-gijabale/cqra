import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { DataTablesModule } from 'angular-datatables';

// import {MatFormFieldModule} from '@angular/material/form-field';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectComponent } from './project/project.component';
import { WbsComponent } from './wbs/wbs.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { TradeGroupComponent } from './trade-group/trade-group.component';
import { TradeComponent } from './trade/trade.component';
import { SubgroupComponent } from './subgroup/subgroup.component';
import { QuestionGroupComponent } from './question-group/question-group.component';
import { QuestionHeadingComponent } from './question-heading/question-heading.component';
import { QuestionTitleComponent } from './question-title/question-title.component';
import { QuestionComponent } from './question/question.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateTradeGroupComponent } from './create-trade-group/create-trade-group.component';
import { CreateTardeComponent } from './create-tarde/create-tarde.component';
import { CreateSubgroupComponent } from './create-subgroup/create-subgroup.component';
import { CreateQuestionGroupComponent } from './create-question-group/create-question-group.component';
import { CreateQuestionHeadingComponent } from './create-question-heading/create-question-heading.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { UserLogComponent } from './user-log/user-log.component';
import { EditNonConfComponent } from './edit-non-conf/edit-non-conf.component';
import { EditConfComponent } from './edit-conf/edit-conf.component';
import { NcCountReportComponent } from './nc-count-report/nc-count-report.component';
import { SnaggingDocumentComponent } from './snagging-document/snagging-document.component';
import { InspectionReportComponent } from './inspection-report/inspection-report.component';
import { SnaggingReportComponent } from './snagging-report/snagging-report.component';
import { NCClosureSAComponent } from './ncclosure-sa/ncclosure-sa.component';
import { NcReviewerComponent } from './nc-reviewer/nc-reviewer.component';
import { NcReviwerSaComponent } from './nc-reviwer-sa/nc-reviwer-sa.component';
import { NcApproverSaComponent } from './nc-approver-sa/nc-approver-sa.component';
import { CreaateInspectionreportComponent } from './creaate-inspectionreport/creaate-inspectionreport.component';
import { CreateSnaggingDocumentComponent } from './create-snagging-document/create-snagging-document.component';
import { CreateSignoffDocumentComponent } from './create-signoff-document/create-signoff-document.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { CreateUserAccessComponent } from './create-user-access/create-user-access.component';
import { CreateUserAllocationComponent } from './create-user-allocation/create-user-allocation.component';
import { UserAllocationComponent } from './user-allocation/user-allocation.component';
import { ContractorComponent } from './contractor/contractor.component';
import { CreateContractorComponent } from './create-contractor/create-contractor.component';
import { CreateContractorSupervisorComponent } from './create-contractor-supervisor/create-contractor-supervisor.component';
import { ContractorSupervisorComponent } from './contractor-supervisor/contractor-supervisor.component';
import { UserEquipmentComponent } from './user-equipment/user-equipment.component';
import { CreateUserEquipmentComponent } from './create-user-equipment/create-user-equipment.component';
import { QualityUpdateReportComponent } from './quality-update-report/quality-update-report.component';
import { QualityReviewReportComponent } from './quality-review-report/quality-review-report.component';
import { MisReportComponent } from './mis-report/mis-report.component';
import { CreateMisReportComponent } from './create-mis-report/create-mis-report.component';
import { NcClosureProcedureComponent } from './nc-closure-procedure/nc-closure-procedure.component';
import { AssignProjectComponent } from './assign-project/assign-project.component';
import { CreateKickoffComponent } from './create-kickoff/create-kickoff.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { CreateNcObservationCountReportComponent } from './create-nc-observation-count-report/create-nc-observation-count-report.component';
import { CreateQualityIndexReportComponent } from './create-quality-index-report/create-quality-index-report.component';
import { CreateNcsStatusReportComponent } from './create-ncs-status-report/create-ncs-status-report.component';
import { CreateNCClosureHistoryComponent } from './create-ncclosure-history/create-ncclosure-history.component';
import { CreateNcLogReportComponent } from './create-nc-log-report/create-nc-log-report.component';
import { CreateChecklistCardComponent } from './create-checklist-card/create-checklist-card.component';
import { ContractorFormanComponent } from './contractor-forman/contractor-forman.component';
import { CreateContractorFormanComponent } from './create-contractor-forman/create-contractor-forman.component';
import { CreateClientStaffComponent } from './create-client-staff/create-client-staff.component';
import { ClientStaffComponent } from './client-staff/client-staff.component';
import { AssignConstructorSupervisorComponent } from './assign-constructor-supervisor/assign-constructor-supervisor.component';
import { AccessorNameComponent } from './manualIndexCalulator/accessor-name/accessor-name.component';
import { CreateAccessorNameComponent } from './manualIndexCalulator/create-accessor-name/create-accessor-name.component';
import { StageOfWorkComponent } from './manualIndexCalulator/stage-of-work/stage-of-work.component';
import { CreateStageOfWorkComponent } from './manualIndexCalulator/create-stage-of-work/create-stage-of-work.component';
import { CreateOffredAreaComponent } from './manualIndexCalulator/create-offred-area/create-offred-area.component';
import { OffredAreaComponent } from './manualIndexCalulator/offred-area/offred-area.component';
import { SampledAreaComponent } from './manualIndexCalulator/sampled-area/sampled-area.component';
import { CreateSampledAreaComponent } from './manualIndexCalulator/create-sampled-area/create-sampled-area.component';
import { InspectionActivityComponent } from './manualIndexCalulator/activityNotAvailableDuringInspection/inspection-activity/inspection-activity.component';
import { CreateInspectionActivityComponent } from './manualIndexCalulator/activityNotAvailableDuringInspection/create-inspection-activity/create-inspection-activity.component';
import { FirstNoteComponent } from './manualIndexCalulator/firstNote/first-note/first-note.component';
import { CreateFirstNoteComponent } from './manualIndexCalulator/firstNote/create-first-note/create-first-note.component';
import { ReferenceReportComponent } from './manualIndexCalulator/referenceReport/reference-report/reference-report.component';
import { CreateReferenceReportComponent } from './manualIndexCalulator/referenceReport/create-reference-report/create-reference-report.component';
import { RemarkComponent } from './manualIndexCalulator/remark/remark/remark.component';
import { CreateRemarkComponent } from './manualIndexCalulator/remark/create-remark/create-remark.component';
import { AddUsedEquipmentComponent } from './manualIndexCalulator/equiUsedByCqra/add-used-equipment/add-used-equipment.component';
import { UsedEquipmentComponent } from './manualIndexCalulator/equiUsedByCqra/used-equipment/used-equipment.component';
import { EquipUsedByClientComponent } from './manualIndexCalulator/equipUsedByClient/equip-used-by-client/equip-used-by-client.component';
import { CreatEquipUsedByClientComponent } from './manualIndexCalulator/equipUsedByClient/creat-equip-used-by-client/creat-equip-used-by-client.component';
import { EquipUsedByContractorComponent } from './manualIndexCalulator/equipUsedByContractor/equip-used-by-contractor/equip-used-by-contractor.component';
import { CreateEquipUsedByContractorComponent } from './manualIndexCalulator/equipUsedByContractor/create-equip-used-by-contractor/create-equip-used-by-contractor.component';
import { NcCloserViewReportComponent } from './nc-closer-view-report/nc-closer-view-report.component';
import { EditNcTableFormComponent } from './edit-nc-table-form/edit-nc-table-form.component';
import { UserlogReportViewComponent } from './userlog-report-view/userlog-report-view.component';
import { SamplingComponent } from './sampling/sampling.component';
import { CreateSamplingComponent } from './create-sampling/create-sampling.component';
import { LoaderComponent } from './loader/loader.component';
import { ProjectChecklistAllocationComponent } from './project-checklist-allocation/project-checklist-allocation.component';
import { ProjectTradeDetailsComponent } from './project-trade-details/project-trade-details.component';
import { ProjectTradeSequenceComponent } from './project-trade-sequence/project-trade-sequence.component';
import { AssignContractorForemanComponent } from './assign-contractor-foreman/assign-contractor-foreman.component';
import { NcCountReportListComponent } from './nc-count-report-list/nc-count-report-list.component';
import { QualityIndexReportComponent } from './quality-index-report/quality-index-report.component';
import { CreateLastNoteComponent } from './manualIndexCalulator/lastNote/create-last-note/create-last-note.component';
import { LastNoteComponent } from './manualIndexCalulator/lastNote/last-note/last-note.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { AssignEquipementListComponent } from './assign-equipement-list/assign-equipement-list.component';
import { QaulityIndexReportListComponent } from './qaulity-index-report-list/qaulity-index-report-list.component';
import { ObservationTrackerReportComponent } from './observation-tracker-report/observation-tracker-report.component';
import { CreateObservationTrackerReportComponent } from './create-observation-tracker-report/create-observation-tracker-report.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddRegionComponent } from './add-region/add-region.component';
import { PmcListComponent } from './pmc-list/pmc-list.component';
import { CreatePmcComponent } from './create-pmc/create-pmc.component';
import { CreateSamplingStepThreeComponent } from './create-sampling-step-three/create-sampling-step-three.component';
import { MisAppriciationComponent } from './MIS/mis-appriciation/mis-appriciation.component';
import { MisDecisionComponent } from './MIS/misDecision/mis-decision/mis-decision.component';
import { MisInitiativeComponent } from './MIS/mis-initiative/mis-initiative.component';
import { MisTopPerformanceComponent } from './MIS/mis-top-performance/mis-top-performance.component';
import { MisBelowPersonComponent } from './MIS/mis-below-person/mis-below-person.component';
import { CreateRfiComponent } from './create-rfi/create-rfi.component';
import { GenerateSamplingReortComponent } from './generate-sampling-reort/generate-sampling-reort.component';
import { InspectorDeclarationComponent } from './inspectorAuthorization/inspector-declaration/inspector-declaration.component';
import { InspectorTradeTrainingComponent } from './inspectorAuthorization/inspector-trade-training/inspector-trade-training.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
    DashboardComponent,
    ClientComponent,
    ProjectComponent,
    WbsComponent,
    TradeGroupComponent,
    TradeComponent,
    SubgroupComponent,
    QuestionGroupComponent,
    QuestionHeadingComponent,
    QuestionTitleComponent,
    QuestionComponent,
    ChecklistComponent,
    CreateClientComponent,
    CreateProjectComponent,
    UsersComponent,
    CreateUserComponent,
    CreateTradeGroupComponent,
    CreateTardeComponent,
    CreateSubgroupComponent,
    CreateQuestionGroupComponent,
    CreateQuestionHeadingComponent,
    CreateQuestionComponent,
    UserLogComponent,
    EditNonConfComponent,
    EditConfComponent,
    NcCountReportComponent,
    SnaggingDocumentComponent,
    InspectionReportComponent,
    SnaggingReportComponent,
    NCClosureSAComponent,
    NcReviewerComponent,
    NcReviwerSaComponent,
    NcApproverSaComponent,
    CreaateInspectionreportComponent,
    CreateSnaggingDocumentComponent,
    CreateSignoffDocumentComponent,
    CreateChecklistComponent,
    UserAccessComponent,
    CreateUserAccessComponent,
    CreateUserAllocationComponent,
    UserAllocationComponent,
    ContractorComponent,
    CreateContractorComponent,
    CreateContractorSupervisorComponent,
    ContractorSupervisorComponent,
    UserEquipmentComponent,
    CreateUserEquipmentComponent,
    QualityUpdateReportComponent,
    QualityReviewReportComponent,
    MisReportComponent,
    CreateMisReportComponent,
    NcClosureProcedureComponent,
    AssignProjectComponent,
    CreateKickoffComponent,
    CreateTrainingComponent,
    CreateNcObservationCountReportComponent,
    CreateQualityIndexReportComponent,
    CreateNcsStatusReportComponent,
    CreateNCClosureHistoryComponent,
    CreateNcLogReportComponent,
    CreateChecklistCardComponent,
    ContractorFormanComponent,
    CreateContractorFormanComponent,
    CreateClientStaffComponent,
    ClientStaffComponent,
    AssignConstructorSupervisorComponent,
    AccessorNameComponent,
    CreateAccessorNameComponent,
    StageOfWorkComponent,
    CreateStageOfWorkComponent,
    CreateOffredAreaComponent,
    OffredAreaComponent,
    SampledAreaComponent,
    CreateSampledAreaComponent,
    InspectionActivityComponent,
    CreateInspectionActivityComponent,
    FirstNoteComponent,
    CreateFirstNoteComponent,
    ReferenceReportComponent,
    CreateReferenceReportComponent,
    RemarkComponent,
    CreateRemarkComponent,
    AddUsedEquipmentComponent,
    UsedEquipmentComponent,
    EquipUsedByClientComponent,
    CreatEquipUsedByClientComponent,
    EquipUsedByContractorComponent,
    CreateEquipUsedByContractorComponent,
    NcCloserViewReportComponent,
    EditNcTableFormComponent,
    UserlogReportViewComponent,
    SamplingComponent,
    CreateSamplingComponent,
    LoaderComponent,
    ProjectChecklistAllocationComponent,
    ProjectTradeDetailsComponent,
    ProjectTradeSequenceComponent,
    AssignContractorForemanComponent,
    NcCountReportListComponent,
    QualityIndexReportComponent,
    CreateLastNoteComponent,
    LastNoteComponent,
    AddEquipmentComponent,
    AssignEquipementListComponent,
    QaulityIndexReportListComponent,
    ObservationTrackerReportComponent,
    CreateObservationTrackerReportComponent,
    AddRoleComponent,
    AddRegionComponent,
    PmcListComponent,
    CreatePmcComponent,
    CreateSamplingStepThreeComponent,
    MisAppriciationComponent,
    MisDecisionComponent,
    MisInitiativeComponent,
    MisTopPerformanceComponent,
    MisBelowPersonComponent,
    CreateRfiComponent,
    GenerateSamplingReortComponent,
    InspectorDeclarationComponent,
    InspectorTradeTrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    DragDropModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatFormFieldModule
  ],
 
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
