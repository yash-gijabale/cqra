import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { ProjectComponent } from './project/project.component';
import { WbsComponent } from './wbs/wbs.component';
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
import { ContractorFormanComponent } from './contractor-forman/contractor-forman.component';
import { CreateContractorFormanComponent } from './create-contractor-forman/create-contractor-forman.component';
import { CreateClientStaffComponent } from './create-client-staff/create-client-staff.component';
import { ClientStaffComponent } from './client-staff/client-staff.component';
import { AssignConstructorSupervisorComponent } from './assign-constructor-supervisor/assign-constructor-supervisor.component';
import { AccessorNameComponent } from './manualIndexCalulator/accessor-name/accessor-name.component';
import { CreateAccessorNameComponent } from './manualIndexCalulator/create-accessor-name/create-accessor-name.component';
import { StageOfWorkComponent } from './manualIndexCalulator/stage-of-work/stage-of-work.component';
import { CreateStageOfWorkComponent } from './manualIndexCalulator/create-stage-of-work/create-stage-of-work.component';
import { OffredAreaComponent } from './manualIndexCalulator/offred-area/offred-area.component';
import { CreateOffredAreaComponent } from './manualIndexCalulator/create-offred-area/create-offred-area.component';
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
import { EquiUsedByCqra, UsedEquipmentComponent } from './manualIndexCalulator/equiUsedByCqra/used-equipment/used-equipment.component';
import { AddUsedEquipmentComponent } from './manualIndexCalulator/equiUsedByCqra/add-used-equipment/add-used-equipment.component';
import { EquipUsedByClientComponent } from './manualIndexCalulator/equipUsedByClient/equip-used-by-client/equip-used-by-client.component';
import { CreatEquipUsedByClientComponent } from './manualIndexCalulator/equipUsedByClient/creat-equip-used-by-client/creat-equip-used-by-client.component';
import { EquipUsedByContractorComponent } from './manualIndexCalulator/equipUsedByContractor/equip-used-by-contractor/equip-used-by-contractor.component';
import { CreateEquipUsedByContractorComponent } from './manualIndexCalulator/equipUsedByContractor/create-equip-used-by-contractor/create-equip-used-by-contractor.component';
import { NcCloserViewReportComponent } from './nc-closer-view-report/nc-closer-view-report.component';
import { UserlogReportViewComponent } from './userlog-report-view/userlog-report-view.component';
import { SamplingComponent } from './sampling/sampling.component';
// import { CreateSamplingComponent } from './create-sampling/create-sampling.component';
import { ProjectChecklistAllocationComponent } from './project-checklist-allocation/project-checklist-allocation.component';
import { ProjectTradeDetailsComponent } from './project-trade-details/project-trade-details.component';
import { ProjectTradeSequenceComponent } from './project-trade-sequence/project-trade-sequence.component';

//Reports
import { QualityUpdateReportComponent } from './quality-update-report/quality-update-report.component';
import { QualityReviewReportComponent } from './quality-review-report/quality-review-report.component';
import { MisReportComponent } from './mis-report/mis-report.component';
import { CreateMisReportComponent } from './create-mis-report/create-mis-report.component';
import { AssignProjectComponent } from './assign-project/assign-project.component';

import { UserAccessComponent } from './user-access/user-access.component';
import { CreateUserAccessComponent } from './create-user-access/create-user-access.component';
import { UserAllocationComponent } from './user-allocation/user-allocation.component';
import { CreateUserAllocationComponent } from './create-user-allocation/create-user-allocation.component';
import { ContractorComponent } from './contractor/contractor.component';
import { CreateContractorComponent } from './create-contractor/create-contractor.component';
import { UserEquipmentComponent } from './user-equipment/user-equipment.component';

import { CreateTradeGroupComponent } from './create-trade-group/create-trade-group.component';
import { CreateTardeComponent } from './create-tarde/create-tarde.component';
import { CreateSubgroupComponent } from './create-subgroup/create-subgroup.component';
import { CreateQuestionGroupComponent } from './create-question-group/create-question-group.component';
import { CreateQuestionHeadingComponent } from './create-question-heading/create-question-heading.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CreateChecklistComponent } from './create-checklist/create-checklist.component';
import { CreateContractorSupervisorComponent } from './create-contractor-supervisor/create-contractor-supervisor.component';
import { ContractorSupervisorComponent } from './contractor-supervisor/contractor-supervisor.component';
import { CreateUserEquipmentComponent } from './create-user-equipment/create-user-equipment.component';

import { UserLogComponent } from './user-log/user-log.component';
import { EditConfComponent } from './edit-conf/edit-conf.component';
import { EditNonConfComponent } from './edit-non-conf/edit-non-conf.component';
import { SnaggingDocumentComponent } from './snagging-document/snagging-document.component';
import { SnaggingReportComponent } from './snagging-report/snagging-report.component';
import { NcCountReportComponent } from './nc-count-report/nc-count-report.component';
import { InspectionReportComponent } from './inspection-report/inspection-report.component';
import { NCClosureSAComponent } from './ncclosure-sa/ncclosure-sa.component';
import { NcReviewerComponent } from './nc-reviewer/nc-reviewer.component';
import { NcApproverSaComponent } from './nc-approver-sa/nc-approver-sa.component';
import { CreaateInspectionreportComponent } from './creaate-inspectionreport/creaate-inspectionreport.component';
import { CreateSnaggingDocumentComponent } from './create-snagging-document/create-snagging-document.component';
import { CreateSignoffDocumentComponent } from './create-signoff-document/create-signoff-document.component';
import { CreateKickoffComponent } from './create-kickoff/create-kickoff.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { CreateNcObservationCountReportComponent } from './create-nc-observation-count-report/create-nc-observation-count-report.component';
import { CreateQualityIndexReportComponent } from './create-quality-index-report/create-quality-index-report.component';
import { CreateNcsStatusReportComponent } from './create-ncs-status-report/create-ncs-status-report.component';
import { CreateNCClosureHistoryComponent } from './create-ncclosure-history/create-ncclosure-history.component';
import { CreateNcLogReportComponent } from './create-nc-log-report/create-nc-log-report.component';
import { AssignContractorForemanComponent } from './assign-contractor-foreman/assign-contractor-foreman.component';
import { NcCountReportListComponent } from './nc-count-report-list/nc-count-report-list.component';
import { QualityIndexReportComponent } from './quality-index-report/quality-index-report.component';
import { LastNoteComponent } from './manualIndexCalulator/lastNote/last-note/last-note.component';
import { CreateLastNoteComponent } from './manualIndexCalulator/lastNote/create-last-note/create-last-note.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { AssignEquipementListComponent } from './assign-equipement-list/assign-equipement-list.component';
import { QaulityIndexReportListComponent } from './qaulity-index-report-list/qaulity-index-report-list.component';
import { CreateObservationTrackerReportComponent } from './create-observation-tracker-report/create-observation-tracker-report.component';
import { ObservationTrackerReportComponent } from './observation-tracker-report/observation-tracker-report.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddRegionComponent } from './add-region/add-region.component';
import { CreatePmcComponent } from './create-pmc/create-pmc.component';
import { PmcListComponent } from './pmc-list/pmc-list.component';
// import { CreateSamplingStepThreeComponent } from './create-sampling-step-three/create-sampling-step-three.component';
import { MisAppriciationComponent } from './MIS/mis-appriciation/mis-appriciation.component';
import { MisDecisionComponent } from './MIS/misDecision/mis-decision/mis-decision.component';
import { MisInitiativeComponent } from './MIS/mis-initiative/mis-initiative.component';
import { MisTopPerformanceComponent } from './MIS/mis-top-performance/mis-top-performance.component';
import { MisBelowPersonComponent } from './MIS/mis-below-person/mis-below-person.component';
import { CreateRfiComponent } from './create-rfi/create-rfi.component';
import { GenerateSamplingReortComponent } from './generate-sampling-reort/generate-sampling-reort.component';
import { InspectorDeclarationComponent } from './inspectorAuthorization/inspector-declaration/inspector-declaration.component';
import { InspectorTradeTrainingComponent } from './inspectorAuthorization/inspector-trade-training/inspector-trade-training.component';
import { InspectorTrainingViewComponent } from './inspectorAuthorization/inspector-training-view/inspector-training-view.component';
import { InspectorDeclarationViewComponent } from './inspectorAuthorization/inspector-declaration-view/inspector-declaration-view.component';
import { PreSnapauditFromsComponent } from './preSnapaudit/pre-snapaudit-froms/pre-snapaudit-froms.component';
import { EquipmentMaintenanceFormComponent } from './preSnapaudit/equipment-maintenance-form/equipment-maintenance-form.component';
import { MyEquipmentsComponent } from './my-equipments/my-equipments.component';
import { TestNewSamplingComponent } from './test/test-new-sampling/test-new-sampling.component';
import { ChecklistGroupMasterComponent } from './RFI/Pages/Checklist/checklist-group-master/checklist-group-master.component';
import { ChecklistMasterComponent } from './RFI/Pages/Checklist/checklist-master/checklist-master.component';
import { AssignContractorPmcComponent } from './assign-contractor-pmc/assign-contractor-pmc.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QualityInspectionParametersReportComponent } from './Reports/quality-inspection-parameters-report/quality-inspection-parameters-report.component';
import { CreateQualityProcedureAmendmentReportComponent } from './Reports/create-quality-procedure-amendment-report/create-quality-procedure-amendment-report.component';
import { AnnexureForObservationReportComponent } from './Reports/annexure-for-observation-report/annexure-for-observation-report.component';
import { QualityProcedureAmmendmentComponent } from './Reports/quality-procedure-ammendment/quality-procedure-ammendment.component';
import { ActivityProgressReportComponent } from './Reports/activity-progress-report/activity-progress-report.component';
import { CreateQualityReviewReportComponent } from './Reports/create-quality-review-report/create-quality-review-report.component';
import { CreateMinutesOfMeetingReportComponent } from './Reports/create-minutes-of-meeting-report/create-minutes-of-meeting-report.component';
import { MinutesOfMeetingReportComponent } from './Reports/minutes-of-meeting-report/minutes-of-meeting-report.component';
import { MinutesOfMeetingLogComponent } from './Reports/minutes-of-meeting-log/minutes-of-meeting-log.component';
import { SchemeMomReportsComponent } from './Reports/scheme-mom-reports/scheme-mom-reports.component';
import { CreateSchemeMomReportComponent } from './Reports/create-scheme-mom-report/create-scheme-mom-report.component';
import { CreateRedGreenCardTokenSummaryComponent } from './Reports/create-red-green-card-token-summary/create-red-green-card-token-summary.component';
import { CreateRedGreenCardComponent } from './Reports/create-red-green-card/create-red-green-card.component';

import { MockupNotApprovedComponent } from './Alerts/Ext/mockup-not-approved/mockup-not-approved.component';
import { NcNotClosedComponent } from './Alerts/Ext/nc-not-closed/nc-not-closed.component';
import { NcRedAlertComponent } from './Alerts/Ext/nc-red-alert/nc-red-alert.component';
import { CreateNcCountObservationComponent } from './Reports/NcCountAndObservation/create-nc-count-observation/create-nc-count-observation.component';

import { CreateQualityObservationComponent } from './Reports/create-quality-observation/create-quality-observation.component';
import { QualityObservationComponent } from './Reports/quality-observation/quality-observation.component';
import { CreateQualityObservationReportComponent } from './Reports/create-quality-observation-report/create-quality-observation-report.component';
import { QualityObservationReportComponent } from './Reports/quality-observation-report/quality-observation-report.component';
import { MethodStatementComponent } from './Reports/method-statement/method-statement.component';
import { CreateMethodStatementComponent } from './Reports/create-method-statement/create-method-statement.component';
import { AddNcComponent } from './Reports/add-nc/add-nc.component';
import { DownloadReportsComponent } from './Reports/download-reports/download-reports.component';
import { DeletedNcReportComponent } from './Reports/deleted-nc-report/deleted-nc-report.component';
import { EditGoodworkPracticesComponent } from './Reports/edit-goodwork-practices/edit-goodwork-practices.component';
import { NcClosureProcedureComponent } from './nc-closure-procedure/nc-closure-procedure.component';
import { CreateInspectionSurveyReportComponent } from './Reports/Audit Report/create-inspection-survey-report/create-inspection-survey-report.component';
import { InspectionSurveyReportComponent } from './Reports/Audit Report/inspection-survey-report/inspection-survey-report.component';
import { CreateAuditObservationReportComponent } from './Reports/create-audit-observation-report/create-audit-observation-report.component';
import { AuditObservationReportComponent } from './Reports/audit-observation-report/audit-observation-report.component';
import { ProtocolQipNotFinialiseComponent } from './Alerts/Ext/protocol-qip-not-finialise/protocol-qip-not-finialise.component';
import { ClientSupervisorEngineerChangedComponent } from './Alerts/Ext/client-supervisor-engineer-changed/client-supervisor-engineer-changed.component';
import { CreateQualityAndQualityAssessmentReportComponent } from './Reports/Audit Report/create-quality-and-quality-assessment-report/create-quality-and-quality-assessment-report.component';
import { QualityAndQualityAssessmentReportComponent } from './Reports/Audit Report/quality-and-quality-assessment-report/quality-and-quality-assessment-report.component';


import { TrainingReportListComponent } from './Reports/traningReport/training-report-list/training-report-list.component';
import { OpportunityImprovmentReportComponent } from './Reports/opportunity/opportunity-improvment-report/opportunity-improvment-report.component';





const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client', component: ClientComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'wbs', component: WbsComponent },
  { path: 'tradegroup', component: TradeGroupComponent },
  { path: 'trade', component: TradeComponent },
  { path: 'subgroup', component: SubgroupComponent },
  { path: 'questiongroup', component: QuestionGroupComponent },
  { path: 'questionheading', component: QuestionHeadingComponent },
  { path: 'questiontitle', component: QuestionTitleComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'checklist', component: ChecklistComponent },
  { path: 'createClient/:id', component: CreateClientComponent },
  { path: 'createProject/:id', component: CreateProjectComponent },
  { path: 'createTradegroup/:id', component: CreateTradeGroupComponent },
  { path: 'createTrade/:id', component: CreateTardeComponent },
  { path: 'createSubgroup/:id', component: CreateSubgroupComponent },
  { path: 'createQuestiongroup/:id', component: CreateQuestionGroupComponent },
  { path: 'createQuestionheading/:id', component: CreateQuestionHeadingComponent },
  { path: 'createQuestion/:id', component: CreateQuestionComponent },
  { path: 'createChecklist/:id', component: CreateChecklistComponent },
  { path: 'createKickoff/:id', component: CreateKickoffComponent },
  { path: 'createTraining/:id', component: CreateTrainingComponent },
  { path: 'createNcObservationCount', component: CreateNcCountObservationComponent },
  { path: 'createQualityIndexReport/:id', component: CreateQualityIndexReportComponent },
  { path: 'createNcsStatusReport/:id', component: CreateNcsStatusReportComponent },
  { path: 'createNCClosureHistoryReport/:id', component: CreateNCClosureHistoryComponent },

  { path: 'users', component: UsersComponent },
  { path: 'createUser/:id', component: CreateUserComponent },
  { path: 'userAccess', component: UserAccessComponent },
  { path: 'createUserAccess/:id', component: CreateUserAccessComponent },
  { path: 'userAllocation', component: UserAllocationComponent },
  { path: 'createUserAllocation/:id', component: CreateUserAllocationComponent },
  { path: 'contractor', component: ContractorComponent },
  { path: 'createContractor/:id', component: CreateContractorComponent },
  { path: 'contractorSupervisor/:id', component: ContractorSupervisorComponent },
  { path: 'createContractorSupervisor/:id', component: CreateContractorSupervisorComponent },
  { path: 'userEquipment/:id', component: UserEquipmentComponent },
  { path: 'createUserEquipment/:id/:id2', component: CreateUserEquipmentComponent },

  { path: 'create/:id', component: CreateUserEquipmentComponent },

  { path: 'qualityUpdateReport', component: QualityUpdateReportComponent },
  { path: 'misReport', component: MisReportComponent },
  { path: 'assignProject/:userId', component: AssignProjectComponent },
  { path: 'createMisReport/:id', component: CreateMisReportComponent },

  { path: 'userLog', component: UserLogComponent },
  // { path: 'editGoodWork', component: EditConfComponent },
  { path: 'edit-goodwork-practices', component: EditGoodworkPracticesComponent },
  { path: 'editNC', component: EditNonConfComponent },
  { path: 'snaggingDocument', component: SnaggingDocumentComponent },
  { path: 'snaggingReport', component: SnaggingReportComponent },
  { path: 'ncCountReport/:id', component: NcCountReportComponent },
  { path: 'inspectionReport', component: InspectionReportComponent },
  { path: 'ncClosureSa', component: NCClosureSAComponent },
  { path: 'ncReviewerSa', component: NcReviewerComponent },
  { path: 'ncApproverSa', component: NcApproverSaComponent },
  { path: 'createinspection/:id', component: CreaateInspectionreportComponent },
  { path: 'createsnagging/:id', component: CreateSnaggingDocumentComponent },
  { path: 'createsignoff', component: CreateSignoffDocumentComponent },
  { path: 'contractorForman/:id', component: ContractorFormanComponent },
  { path: 'createForman/:id', component: CreateContractorFormanComponent },
  { path: 'clientStaff', component: ClientStaffComponent },
  { path: 'createclientStaff/:id', component: CreateClientStaffComponent },
  { path: 'assign-constructor-supervisor-foreman', component: AssignConstructorSupervisorComponent },
  { path: 'assign-constructor-foreman', component: AssignContractorForemanComponent },
  { path: 'assessorName/:id', component: AccessorNameComponent },
  { path: 'createAssessorName/:id/:id2', component: CreateAccessorNameComponent },
  { path: 'stageOfWork/:id', component: StageOfWorkComponent },
  { path: 'createStageOfWork/:id/:id2', component: CreateStageOfWorkComponent },
  { path: 'offredArea/:id', component: OffredAreaComponent },
  { path: 'createOffredArea/:id/:id2', component: CreateOffredAreaComponent },
  { path: 'sampledArea/:id', component: SampledAreaComponent },
  { path: 'createSampledArea/:id/:id2', component: CreateSampledAreaComponent },
  { path: 'activityNotAvailableDuringInspection/:id', component: InspectionActivityComponent },
  { path: 'createActivityNotAvailableDuringInspection/:id/:id2', component: CreateInspectionActivityComponent },
  { path: 'firstNote/:id', component: FirstNoteComponent },
  { path: 'createFirstNote/:id/:id2', component: CreateFirstNoteComponent },
  { path: 'referenceNote/:id', component: ReferenceReportComponent },
  { path: 'createReferenceNote/:id/:id2', component: CreateReferenceReportComponent },
  { path: 'remarks/:id', component: RemarkComponent },
  { path: 'createRemark/:id/:id2', component: CreateRemarkComponent },
  { path: 'equiUsedByCqra', component: UsedEquipmentComponent },
  { path: 'addEquiUsedByCqra/:id', component: AddUsedEquipmentComponent },
  { path: 'equipUsedByClient/:id', component: EquipUsedByClientComponent },
  { path: 'creatEquipUsedByClient/:id/:id2', component: CreatEquipUsedByClientComponent },
  { path: 'equipUsedByContractor/:id', component: EquipUsedByContractorComponent },
  { path: 'creatEquipUsedByContractor/:id/:id2', component: CreateEquipUsedByContractorComponent },
  { path: 'editNcCloserReport/:id', component: NcCloserViewReportComponent },
  { path: 'userlogReportView', component: UserlogReportViewComponent },
  { path: 'sampling', component: SamplingComponent },
  // { path: 'createSampling/:id', component: CreateSamplingComponent },
  { path: 'configureChecklist/:id', component: ProjectChecklistAllocationComponent },
  { path: 'projectTradeDetails/:id', component: ProjectTradeDetailsComponent },
  { path: 'projectTradeSequence/:id', component: ProjectTradeSequenceComponent },
  { path: 'ncCountReportList', component: NcCountReportListComponent },
  { path: 'qualityIndexReport/:id', component: QualityIndexReportComponent },
  { path: 'qualityIndexReportList', component: QaulityIndexReportListComponent },
  { path: 'lastNotes/:id', component: LastNoteComponent },
  { path: 'createLastNote/:id/:id2', component: CreateLastNoteComponent },
  { path: 'addEquipment/:id', component: AddEquipmentComponent },
  { path: 'assignEquipementList', component: AssignEquipementListComponent },
  { path: 'createOTR/:id/:type', component: CreateObservationTrackerReportComponent },
  { path: 'OTRList', component: ObservationTrackerReportComponent },
  { path: 'roles', component: AddRoleComponent },
  { path: 'regions', component: AddRegionComponent },
  { path: 'createpmc/:id', component: CreatePmcComponent },
  { path: 'pmcList', component: PmcListComponent },
  // { path: 'createSamplingStep3/:id/:id2', component: CreateSamplingStepThreeComponent },
  { path: 'misAppriciation/:id', component: MisAppriciationComponent },
  { path: 'misDecisionManegament/:id', component: MisDecisionComponent },
  { path: 'misInitiative/:id', component: MisInitiativeComponent },
  { path: 'misTopPerformance/:id', component: MisTopPerformanceComponent },
  { path: 'misBelowPerformance/:id', component: MisBelowPersonComponent },
  { path: 'createRfi/:id', component: CreateRfiComponent },
  { path: 'generateSamplingReport', component: GenerateSamplingReortComponent },
  { path: 'declaration', component: InspectorDeclarationComponent },
  { path: 'declarationView', component: InspectorDeclarationViewComponent },
  { path: 'inspectorTradeTraning', component: InspectorTradeTrainingComponent },
  { path: 'inspectorView', component: InspectorTrainingViewComponent },
  { path: 'preSnapAuditProccess', component: PreSnapauditFromsComponent },
  { path: 'equipmentMaintenanceFrom', component: EquipmentMaintenanceFormComponent },
  { path: 'myEquipments', component: MyEquipmentsComponent },
  { path: 'testSampling', component: TestNewSamplingComponent },
  { path: 'checklist-group-master', component: ChecklistGroupMasterComponent },
  { path: 'checklist-master', component: ChecklistMasterComponent },
  { path: 'create-rfi', component: CreateRfiComponent },
  { path: 'assign-contractor-pmc', component: AssignContractorPmcComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  //Report Yash Sawant
  { path: 'qality-inspection-parameters/:id', component: QualityInspectionParametersReportComponent },
  { path: 'create-quality-procedure-amendment/:id', component: CreateQualityProcedureAmendmentReportComponent },
  { path: 'quality-procedure-amendment', component: QualityProcedureAmmendmentComponent },
  { path: 'annexure-for-observation', component: AnnexureForObservationReportComponent },
  { path: 'activity-progress-report', component: ActivityProgressReportComponent },
  { path: 'qualityReviewReport', component: QualityReviewReportComponent },
  { path: 'create-quality-review-report', component: CreateQualityReviewReportComponent },
  { path: 'create-minutes-of-meeting/:id', component: CreateMinutesOfMeetingReportComponent },
  { path: 'minutes-of-meeting', component: MinutesOfMeetingReportComponent },
  { path: 'minutes-of-meeting-log', component: MinutesOfMeetingLogComponent },
  { path: 'create-scheme-mom-report/:momId/:id', component: CreateSchemeMomReportComponent },
  { path: 'scheme-mom-reports/:momId', component: SchemeMomReportsComponent },
  { path: 'create-redGreen-card-token', component: CreateRedGreenCardTokenSummaryComponent },
  { path: 'create-red-green-card', component: CreateRedGreenCardComponent },
  { path: 'create-quality-observation/:id', component: CreateQualityObservationComponent },
  { path: 'manage-quality-observation', component: QualityObservationComponent },
  { path: 'create-quality-observation-report/:reportId/:id', component: CreateQualityObservationReportComponent },
  { path: 'manage-quality-observation-report/:id', component: QualityObservationReportComponent },
  { path: 'create-method-statement', component: CreateMethodStatementComponent },
  { path: 'manage-method-statement', component: MethodStatementComponent },
  { path: 'add-nc', component: AddNcComponent },
  { path: 'download-reports', component: DownloadReportsComponent },
  { path: 'deleted-nc-report', component: DeletedNcReportComponent },
  { path: 'nc-closure-procedure', component: NcClosureProcedureComponent },
  { path: 'createNcLogReport', component: CreateNcLogReportComponent },
  { path: 'create-audit-observation-report', component: CreateAuditObservationReportComponent },
  { path: 'manage-audit-observation-report', component: AuditObservationReportComponent },


  //audit report
  { path: 'create-inspection-survey-report', component: CreateInspectionSurveyReportComponent },
  { path: 'manage-inspection-survey-report', component: InspectionSurveyReportComponent },
  { path: 'create-quality-and-quality-assessment-report', component: CreateQualityAndQualityAssessmentReportComponent },
  { path: 'manage-quality-and-quality-assessment-report', component: QualityAndQualityAssessmentReportComponent },


  //Reports Yash Gijabale
  { path: 'mockup-not-approved', component: MockupNotApprovedComponent },
  { path: 'nc-not-closed', component: NcNotClosedComponent },
  { path: 'nc-red-alert', component: NcRedAlertComponent },

  { path: 'protocol-QIP-not-finialise', component: ProtocolQipNotFinialiseComponent },
  { path: 'client-supervisor-engineer-changed', component: ClientSupervisorEngineerChangedComponent },

  { path: 'traning-report-list', component: TrainingReportListComponent },
  { path: 'opportunities-for-improvement', component: OpportunityImprovmentReportComponent },











  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64] // [x, y]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
