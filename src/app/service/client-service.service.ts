import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientData } from '../client/client.component';
import { FormanData } from '../contractor-forman/contractor-forman.component';
import { ProjectData } from '../project/project.component';
import { StageData, StructureData, StructureFrom, UnitData, SubunitData } from '../wbs/wbs.component';
import { ProjectView } from '../project/project.component';
import { SupervisorData } from '../contractor-supervisor/contractor-supervisor.component';
import { ContractorData } from '../contractor/contractor.component'
import { clientStaffData } from '../create-client-staff/create-client-staff.component';
import { FirstNoteData } from '../manualIndexCalulator/firstNote/create-first-note/create-first-note.component';
import { OffredArea } from '../manualIndexCalulator/offred-area/offred-area.component';
import { offerdAreaData } from '../manualIndexCalulator/create-offred-area/create-offred-area.component';
import { SampledArea } from '../manualIndexCalulator/sampled-area/sampled-area.component';
import { SampledAreaData } from '../manualIndexCalulator/create-sampled-area/create-sampled-area.component';
import { InspectionActivity } from '../manualIndexCalulator/activityNotAvailableDuringInspection/inspection-activity/inspection-activity.component';
import { InspectionActivityData } from '../manualIndexCalulator/activityNotAvailableDuringInspection/create-inspection-activity/create-inspection-activity.component';
import { RefereneceReport } from '../manualIndexCalulator/referenceReport/reference-report/reference-report.component';
import { referenceReportData } from '../manualIndexCalulator/referenceReport/create-reference-report/create-reference-report.component';
import { AssessorName } from '../manualIndexCalulator/accessor-name/accessor-name.component';
import { AssessorNameData } from '../manualIndexCalulator/create-accessor-name/create-accessor-name.component';
import { StageOfWork, StageOfWorkData } from '../manualIndexCalulator/stage-of-work/stage-of-work.component';
import { Remarks, RemarkData } from '../manualIndexCalulator/remark/remark/remark.component';
import { EquipmentList, EquipmentData } from '../user-equipment/user-equipment.component';
import { UserView } from '../user-log/user-log.component';
import { ContractorDataForSamplingStep, SamplingData, SamplingView, TradeRowDataForSamplingStep } from '../create-sampling/create-sampling.component';
import { FirstNote } from '../manualIndexCalulator/firstNote/first-note/first-note.component';
import { LastNoteData } from '../manualIndexCalulator/lastNote/last-note/last-note.component';
import { AssignSupervisor } from '../assign-constructor-supervisor/assign-constructor-supervisor.component';
import { AssignForeman } from '../assign-contractor-foreman/assign-contractor-foreman.component';
import { PmcData } from '../create-pmc/create-pmc.component';
import { PmcView } from '../pmc-list/pmc-list.component';
import { Global } from 'src/config/Global';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  //private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working IP Adderess
  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(
    private httpClient: HttpClient,
    private global : Global ) { }
  private REST_API_SERVER = this.global.SERVER; //local IP For Testing
  getAllClients() {
    const userId = localStorage.getItem('id')
    // if(Number(userId)==1){
    //   return this.httpClient.get<ClientData[]>(this.REST_API_SERVER + '/getClients');
    // }else{
    // }
    return this.httpClient.get<ClientData[]>(this.REST_API_SERVER + '/getCliebyuserid/'+userId);
  }

  getAllLatestClient(){
    return this.httpClient.get<ClientData[]>(this.REST_API_SERVER + '/getClientslastfirst/');

  }

  createClient(clientData: ClientData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addClient', clientData);
  }

  retrieveClient(id) {
    return this.httpClient.get<ClientData>(`${this.REST_API_SERVER}/client/${id}`);
  }

  updateClient(clientData: ProjectData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/client/${id}`, clientData);
  }

  deleteClient(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/client/${id}`)
  }
  deactivateClient(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/Client/${id}/${false}`, '')
  }

  checkClientCode(code){
    return this.httpClient.get<boolean>(`${this.REST_API_SERVER}/checkclientcode/${code}`)
  }

  checkClinetName(name){
    return this.httpClient.get<boolean>(`${this.REST_API_SERVER}/checkclientname/${name}`)
  }

  // PROJECT API CALL
  getAllProject() {
    let userId = localStorage.getItem('id')
    // if(Number(userId) == 1){
    //   return this.httpClient.get<ProjectView[]>(this.REST_API_SERVER + `/project/getAllProjects`);
    // }else{
    // }
    return this.httpClient.get<ProjectView[]>(this.REST_API_SERVER + `/project/getprojectbyuserid/${userId}`);
  }

  retrieveProject(id) {
    return this.httpClient.get<ProjectData[]>(`${this.REST_API_SERVER}/project/project/${id}`);
  }

  createProject(project): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/project/addProject/`, project);
  }

  updateProject(clientData: any, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/project/project/${id}`, clientData);
  }

  deleteProject(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/project/project/${id}`)
  }

  deactivateProject(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/project/actDea/${id}/${0}`, '')
  }

  createTradeAllocation(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addSchemeTrade`, data)
  }

  updateTradeAllocation(data){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/schemetrade`, data)
  }

  projectChecklistAlloaction(data):Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addschemeque`, data)

  }

  getChecklistQuestions(tradeId, subgroupId, data){
    return this.httpClient.post(`${this.REST_API_SERVER}/checklist/questiondatabychecklistid/${tradeId}/${subgroupId}`, data)
  }

  projectTradeallocation(data): Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/saveOrUpdate`, data)
  }
  // PROJECT API CALL


  //STRUCTURE API CALL
  retrieveStructure(id) {
    return this.httpClient.get<StructureData[]>(`${this.REST_API_SERVER}/structure/structure/${id}`);
  }

  createStructure(clientData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/structure/addStructure`, clientData);
  }

  updateStructure(clientData: StructureFrom, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/structure/structure/${id}`, clientData);
  }

  deleteStructure(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/structure/structure/${id}`)
  }
  //STRUCTURE API CALL


  //SATGE API CALL
  createStage(clientData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/stage/addStage`, clientData);
  }

  createBulkStage(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/stage/addMultipleStages`, data)
  }

  retrieveStage(id) {
    return this.httpClient.get<StageData>(`${this.REST_API_SERVER}/stage/stage/${id}`)
  }

  updateStage(data: StageData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/stage/stage/${id}`, data)
  }

  deleteStage(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/stage/stage/${id}`)
  }
  //SATGE API CALL


  //UNIT API CALL
  createUnit(unitData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/unit/addUnit`, unitData);
  }

  retrieveUnit(id) {
    return this.httpClient.get<UnitData>(`${this.REST_API_SERVER}/unit/unit/${id}`)
  }

  updateUnits(data: UnitData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/unit/unit/${id}`, data)
  }

  deleteUnit(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/unit/unit/${id}`)
  }

  createBulkUnits(unitData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/unit/addMultipleUnits`, unitData)
  }
  //UNIT API CALL


  //SUBUNIT API CALL
  createSubunit(subunitData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/subunit/addSubunit`, subunitData)
  }

  retrieveSubunit(id) {
    return this.httpClient.get<SubunitData>(`${this.REST_API_SERVER}/subunit/subunit/${id}`)
  }

  updateSubunit(data: SubunitData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/subunit/subunit/${id}`, data)
  }

  deleteSubunit(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/subunit/subunit/${id}`)
  }

  createBulkSubunits(subunitData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/subunit/addMultiplesubUnits`, subunitData)
  }
  //SUBUNIT API CALL



  //FOREMAN API CALL
  getAllForemans() {
    return this.httpClient.get<FormanData[]>(this.REST_API_SERVER + '/getForemanVs');
  }

  createFormeman(clientData: FormanData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addforeman', clientData);
  }

  retrieveForeman(id) {
    return this.httpClient.get<FormanData>(`${this.REST_API_SERVER}/foreman/${id}`);
  }

  updateForeman(clientData: FormanData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/foreman/${id}`, clientData);
  }
  deleteForeman(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/foreman/${id}`)
  }

  deactivateForeman(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/Foreman/${id}/${false}`, '')
  }

  getForemanByContractorId(id){
    return this.httpClient.get<FormanData>(`${this.REST_API_SERVER}/getforemanbyconid/${id}`)

  }
  //FOREMAN API CALL




  //CONTRACTOR API CALL
  createContractor(contractorData: ContractorData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addcontractor', contractorData);
  }

  retrieveContractor(id) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/contractor/${id}`)
  }

  updateContractor(contactorDAta: ContractorData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/contractor/${id}`, contactorDAta)
  }

  deleteContractor(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/contractor/${id}`)
  }
  deactiveContractor(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/Contractor/${id}/${0}`, '')
  }

  //CONTRACTOR API CALL


  //SUPERVISOR API CALL
  getAllSupervisor() {
    return this.httpClient.get<SupervisorData[]>(this.REST_API_SERVER + '/getSupervisorVss');
  }

  createSupervisor(supervisorData: SupervisorData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addsupervisor', supervisorData);
  }

  retrieveSupervisor(id) {
    return this.httpClient.get<SupervisorData>(`${this.REST_API_SERVER}/supervisor/${id}`);
  }

  updateSupervisor(supervisorData: SupervisorData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/supervisor/${id}`, supervisorData);
  }
  deleteSupervisor(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/supervisor/${id}`)
  }

  deactiveSupervisor(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/supervisor/${id}/${false}`, '')
  }

  getSupervisorByContractorId(id){
    return this.httpClient.get<SupervisorData>(`${this.REST_API_SERVER}/getSupervisorsbyconid/${id}`)
  }
  //SUPERVISOR API CALL



  //CLIENT STAFF API CALL
  createClientStaff(clientStaffData: clientStaffData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addclientStaff', clientStaffData);
  }

  getAllClientStaff() {
    return this.httpClient.get<clientStaffData[]>(this.REST_API_SERVER + '/getClientStaffs');
  }

  retrieveClientStaff(id) {
    return this.httpClient.get<clientStaffData>(`${this.REST_API_SERVER}/clientStaff/${id}`);
  }

  updateClientStaff(clientStaffData: clientStaffData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/clientStaff/${id}`, clientStaffData)
  }

  deleteClientStaff(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/clientStaff/${id}`)
  }

  deactivateClientStaff(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/Clientstaff/${id}/${0}`, '')
  }

  //CLIENT STAFF API CALL


  addFirstNote(firstNoteData: FirstNoteData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addclientStaff', firstNoteData);
  }

  //FIRST NOTE API CALL
  createFirstNote(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addfirstNote`, data)
  }
  retrieveFirstNote(id) {
    return this.httpClient.get<FirstNoteData>(`${this.REST_API_SERVER}/firstNote/${id}`);
  }
  updateFirstNote(firstNote: FirstNoteData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/firstNote/${id}`, firstNote)
  }
  deleteFirstNote(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/firstNote/${id}`)
  }
  getFirstNoteBySnapAudit(id){
    return this.httpClient.get<FirstNote[]>(`${this.REST_API_SERVER}/firstNotebysnapauditid/${id}`)
  }
  //FIRST NOTE API CALL


  //OFFRED AREA API CALL
  createOffredArea(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addofferdArea`, data)
  }

  getAllOfferedArea() {
    return this.httpClient.get<OffredArea[]>(this.REST_API_SERVER + '/getofferdAreas');
  }

  retriveOfferedArea(id) {
    return this.httpClient.get<OffredArea>(`${this.REST_API_SERVER}/offerdArea/${id}`);
  }

  updateOfferedArea(offerdAreaData: offerdAreaData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/offerdArea/${id}`, offerdAreaData)

  }
  deleteOfferedArea(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/offerdArea/${id}`)
  }
  //OFFRED AREA API CALL


  //SAMPLED AREA API CALL
  createSampledArea(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addsampledArea`, data)
  }
  getAllSampledArea() {
    return this.httpClient.get<SampledArea[]>(this.REST_API_SERVER + '/getSampledAreas')
  }

  retriveSampledArea(id) {
    return this.httpClient.get<SampledArea>(`${this.REST_API_SERVER}/sampledArea/${id}`);
  }

  updateSampledArea(sampledAreaData: SampledAreaData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/sampledArea/${id}`, sampledAreaData)
  }

  deleteSampledArea(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/sampledArea/${id}`)
  }

  getSampledAreaBySanapId(id){
    return this.httpClient.get<SampledArea>(`${this.REST_API_SERVER}/sampledAreabysnapauditid/${id}`)
  }


  getTradesForSamplingStepFirst(projectId){
    return this.httpClient.get<TradeRowDataForSamplingStep>(`${this.REST_API_SERVER}/gettradegrp/${projectId}`)
  }

  getTradesForSamplingStepSecond(projectId){
    return this.httpClient.get<TradeRowDataForSamplingStep>(`${this.REST_API_SERVER}/getstep2tradebypid/${projectId}`)
  }

  getContractorsForSamplingStep(projectId){
    return this.httpClient.get<ContractorDataForSamplingStep>(`${this.REST_API_SERVER}/getconbypid/${projectId}`)
  }

  getContratorAssignedStages(projectId, structureId, contractorId, tradeId){
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/schemeContractorSupervisor/getsupervisorstagesbyidss/${projectId}/${structureId}/${contractorId}/${tradeId}`)
  }

  getClientByProjectId(projectId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/clientbyproject/${projectId}`)
  }
  //GEt CLIENT STAFF BY PROJECT ID
 
  getClientStaffByProjectId(projectId){
    return this.httpClient.get<clientStaffData>(`${this.REST_API_SERVER}/clientstaffbyprojectid/${projectId}`)
  }
  //GEt CLIENT STAFF BY PROJECT ID


  addSamplingStepFirst(data) :Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addmulstep1`, data)
  }

  getSamplingStep1Data (masterId, projectId,  structureId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/getdatabymasterId/${masterId}/${projectId}/${structureId}`)
  }

  upadteSamplingStep1(masterId, projectId,  structureId, data){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/updatedatabymasterId/${masterId}/${projectId}/${structureId}`, data)
  }


  addSamplingStepSecond(data) :Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addmulstep2`, data)
  }

  getPreSamplingStep2Data(masterId, projectId, structureId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/findByMasterId/${masterId}/${projectId}/${structureId}`)
  }

  upadteSamplingStep2(projectId, structureId, masterId, data){
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/addmulstep2/${projectId}/${structureId}/${masterId}`, data)
  }

  //test don't delete
  getSamplingStep2Data(projectid, structureId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/findByProjectAndStructure/${projectid}/${structureId}`)
  }
  

  submitStep3Data(data):Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addmulclientwise`, data)
  }

  getPreSamplingStep3Data(masterId, projectId, structureId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/getstep3databymasterid/${masterId}/${projectId}/${structureId}`)
  }

  upadteSamplingStep3(masterId, projectId,  structureId, data){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/updatemulclientwise/${masterId}/${structureId}/${projectId}`, data)
  }

  getDataFromGenearteSamplingStep4(id){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/getclientwisebyprojectid/${id}`)
  }

  getContractorSamplingData(contractorId, projectId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/getclientwisebyconid/${contractorId}/${projectId}`)
  }

  generateSamplingFinalReport(clientId, projectId, inspectionDate, cycleId, reportDate, location){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadstep4/${clientId}/${projectId}/${inspectionDate}/${cycleId}/${reportDate}/${location}`)
  }
  //SAMPLED AREA API CALL

  //INSPECTION ACTIVITY NOT AVAILABALE API
  createInspectionActivity(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addactivitiesNotAvailableDuringInspection`, data)
  }
  getAllInspectionActivity(id) {
    return this.httpClient.get<InspectionActivity[]>(this.REST_API_SERVER + '/activitiesNotAvailableDuringInspectionbysnapauditid/'+id)
  }

  retriveInspectionActivity(id) {
    return this.httpClient.get<InspectionActivity[]>(`${this.REST_API_SERVER}/activitiesNotAvailableDuringInspection/${id}`)
  }

  updateInspectionActivity(fromData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/ActivitiesNotAvailableDuringInspection/${id}`, fromData)
  }

  //INSPECTION ACTIVITY NOT AVAILABALE API


  //REFERENCE REPORT API CALL
  createReferenceReport(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addReferenceReports`, data)
  }
  getAllReferenceReport(id) {
    return this.httpClient.get<RefereneceReport[]>(this.REST_API_SERVER + '/referenceReportsbysnapauditid/'+id)
  }
  retirveReferenceReport(id) {
    return this.httpClient.get<RefereneceReport[]>(`${this.REST_API_SERVER}/referenceReports/${id}`)
  }

  updateReferenceNote(report: referenceReportData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/referenceReports/${id}`, report)
  }

  deleteReferenceReport(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/referenceReports/${id}`)
  }
  //REFERENCE REPORT API CALL


  // ASSESSOR NAME SERVICES
  createAssessor(assessorData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addassessorsName', assessorData);
  }
  getAllAssessorName(id) {
    return this.httpClient.get<AssessorName[]>(this.REST_API_SERVER + '/assessorsNamebysnapauditid/' + id)
  }

  retirveAssessor(id) {
    return this.httpClient.get<AssessorName[]>(this.REST_API_SERVER + '/assessorsName/' + id)
  }

  updateAssessorName(assessorData: AssessorNameData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/assessorsName/${id}`, assessorData)
  }

  deleteAssessorName(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/assessorsName/${id}`)
  }

  // ASSESSOR NAME SERVICES


  //STAGE OF WORK
  createStageOfWork(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addqualityRecommandation`, data)
  }
  getAllStageOfWork(id) {
    return this.httpClient.get<StageOfWork[]>(`${this.REST_API_SERVER}/qualityRecommandationbysnapauditid/${id}`)
  }

  retirveStageOfWork(id) {
    return this.httpClient.get<StageOfWork[]>(`${this.REST_API_SERVER}/qualityRecommandation/${id}`)

  }

  updateStageOfWork(formData: StageOfWorkData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/qualityRecommandation/${id}`, formData)

  }

  deleteStageOfWork(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/qualityRecommandation/${id}`)
  }
  //STAGE OF WORK


  //REMARKS  API CALL (LAST NOTES)
  createRemakr(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addlastNote`, data)
  }
  getRemarks(id) {
    return this.httpClient.get<Remarks[]>(`${this.REST_API_SERVER}/lastNotebysnapauditid/${id}`)
  }

  retirveRemark(id) {
    return this.httpClient.get<Remarks[]>(`${this.REST_API_SERVER}/lastNote/${id}`)
  }

  updateRemark(remarkData: RemarkData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/lastNote/${id}`, remarkData)
  }
  deleteRemark(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/lastNote/${id}`)
  }
  //REMARKS (LAST NOTES)

  // EQUIPMENT USED BY CQRA
  getEquipUsedByCqra(id) {
    return this.httpClient.get<EquipmentList[]>(`${this.REST_API_SERVER}/equipmentUsedByCqrabysnapauditid/${id}`)
  }

  retriveEquipment(id) {
    return this.httpClient.get<EquipmentList[]>(`${this.REST_API_SERVER}/EquipmentUsedByCqra/${id}`)
  }

  updateWquipment(equipmentData: EquipmentData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/equipmentUsedByCqra/${id}`, equipmentData)
  }

  createEquipementUsedByCQRA(data): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addEquipmentUsedByCqra`, data)
  }

  deleteEquipementUsedByCqra(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/equipmentUsedByCqra/${id}`)
  }
  // EQUIPMENT USED BY CQRA


  // EQUIPMENT USED BY CLIENT
  createEquipUsedByClient(data):Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addequipmentUsedByClient`, data)
  }

  getEquipUsedByClient(id) {
    return this.httpClient.get<EquipmentList[]>(`${this.REST_API_SERVER}/equipmentUsedByClientbysnapauditid/${id}`)
  }
  retriveEquipmentUsedByClinet(id) {
    return this.httpClient.get<EquipmentList[]>(`${this.REST_API_SERVER}/equipmentUsedByClient/${id}`)
  }
  updateWquipmentUsedByClient(equipmentData: EquipmentData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/equipmentUsedByClient/${id}`, equipmentData)
  }
  // EQUIPMENT USED BY CLIENT



  // EQUIPMENT USED BY CONTRACTOR

  createEquipUsedByContractor(data): Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addequipmentUsedByContractor`, data)
  }

  getEquipUsedByContractor(id) {
    return this.httpClient.get<EquipmentList[]>(`${this.REST_API_SERVER}/equipmentUsedByContractorbysnapauditid/${id}`)
  }
  retriveEquipmentUsedByContractor(id) {
    return this.httpClient.get<EquipmentList[]>(`${this.REST_API_SERVER}/equipmentUsedByContractor/${id}`)
  }
  updateWquipmentUsedByContractor(equipmentData: EquipmentData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/equipmentUsedByContractor/${id}`, equipmentData)
  }
  // EQUIPMENT USED BY CONTRACTOR


  getRegionalManagers() {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/user/getAllRegionalManager`);
  }


  //SAMPLING API CALL 
  createSampling(samplingData: SamplingData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER + '/addSampling', samplingData);
  }

  retriveSampling(id) {
    return this.httpClient.get<SamplingData[]>(`${this.REST_API_SERVER}/Sampling/${id}`)
  }

  updateSampling(samplingData: SamplingData, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/Sampling/${id}`, samplingData)
  }

  getAllSamplingView() {
    return this.httpClient.get<SamplingView[]>(`${this.REST_API_SERVER}/getSamplingViews`);

  }

  deleteSampling(id) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/Sampling/${id}`)
  }
  //SAMPLING API CALL 


  //LAST NOTE API CALL
  getAllLastNoteBySnapAudit(id){
    return this.httpClient.get<LastNoteData[]>(`${this.REST_API_SERVER}/lastNotebysnapauditid/${id}`)
  }

  createLastNote(data): Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addlastNote`, data)
  }

  retriveLastNote(id){
    return this.httpClient.get<LastNoteData[]>(`${this.REST_API_SERVER}/lastNote/${id}`)
  }

  updateLastNote(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/lastNote/${id}`, data)
  }
  //LAST NOTE API CALL


  //ASSING CONTRACTOR SUPRTVISOR
  assignContractorSupervisor(data: Array<AssignSupervisor>) :Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/schemeContractorSupervisor/addSchemeContractorSupervisor`, data)
  }

  assignContractorForeman(data: Array<AssignForeman>) :Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addSchemeContractorForeman`, data)
  }

  getAssignDataFromSupervisor(projectId, structureId, contractorId, supervisorId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/schemeContractorSupervisor/getsupervisordatabyidssss/${projectId}/${structureId}/${contractorId}/${supervisorId}`)
  }

  getAssignDataFromSupervisorByTrade(projectId, structureId, contractorId, tradeId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/schemeContractorSupervisor/getsupervisordataForUpdate/${projectId}/${structureId}/${contractorId}/${tradeId}`)

  }

  updateAssignSupervisor(projectId, structureId, contractorId, supervisorId, data){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/schemeContractorSupervisor/update/${projectId}/${structureId}/${contractorId}/${supervisorId}`, data)
  }

  updateAssignSupervisorByTrade(projectId, structureId, contractorId, tradeId, data){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/schemeContractorSupervisor/updatesupervidor/${projectId}/${structureId}/${contractorId}/${tradeId}`, data)
  }

  getAssignDataFromForeman(projectId, structureId, contractorId, foremanId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/getforemandatabyidssssss/${projectId}/${structureId}/${contractorId}/${foremanId}`)
  }

  getAssignDataFromForemanByTrade(projectId, structureId, contractorId, tradeId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/getforemandataForUpdate/${projectId}/${structureId}/${contractorId}/${tradeId}`)
  }

  updateAssignForeman(projectId, structureId, contractorId, foremanId, data){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/update/${projectId}/${structureId}/${contractorId}/${foremanId}`, data)
  }

  updateAssignForemanByTrade(projectId, structureId, contractorId, tradeId, data){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/updateforeman/${projectId}/${structureId}/${contractorId}/${tradeId}`, data)
  }

  //PMC API CALL
  createPmc(data) :Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addPmc`, data)
  }

  getAllPmcs(){
    return this.httpClient.get<PmcView>(`${this.REST_API_SERVER}/getPmcs`);
  }

  retrivePmc(id){
    return this.httpClient.get<PmcView>(`${this.REST_API_SERVER}/Pmc/${id}`)
  }

  updatePmc(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/Pmc/${id}`, data)
  }

  deletePmc(id){
    return this.httpClient.delete<PmcView>(`${this.REST_API_SERVER}/Pmc/${id}`)
  }

  getPmcByprojectId(projectId){
    return this.httpClient.get<Array<PmcView>>(`${this.REST_API_SERVER}/Pmcbyprojid/${projectId}`)
  }

  getPmcUser(typeId, pmcId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/UserDatabyrepresentingtypeidandrepid/${typeId}/${pmcId}`)
  }

  addPmcAllocation(data):Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/schemePmcSubunits/save`, data)
  }


  // getPmcAllocationData(projectId, structureId, pmcId, tradeId){
  //   return this.httpClient.get<Array<any>>(${this.REST_API_SERVER}/schemePmcSubunits/getallbyid/${projectId}/${structureId}/${pmcId}/${tradeId})
  // }

  getPmcAllocationData(projectId, structureId, pmcId){
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/schemePmcSubunits/getallbypmcid/${projectId}/${structureId}/${pmcId}`)
  }

  // updatePmcAllocation(projectId,structureId, pmcId, tradeId, data){
  //   return this.httpClient.put(${this.REST_API_SERVER}/schemePmcSubunits/update/${projectId}/${structureId}/${pmcId}/${tradeId}, data)
  // }

  updatePmcAllocation(projectId,structureId, pmcId, data){
    return this.httpClient.put(`${this.REST_API_SERVER}/schemePmcSubunits/updatebyprojectstructureandpmcid/${projectId}/${structureId}/${pmcId}`, data)
  }

  // CLIENT ALLOCATION
  addClientAllocation(data):Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/schemeclientallocation/save`, data)
  }

  // getClientAllocationData(projectId, structureId, clientId, tradeId){
  //   return this.httpClient.get<Array<any>>(${this.REST_API_SERVER}/schemeclientallocation/getallbyid/${projectId}/${structureId}/${clientId}/${tradeId})
  // }

  getClientAllocationData(projectId, structureId, clientId){
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/schemeclientallocation/getallclientsbyid/${projectId}/${structureId}/${clientId}`)
  }

  // updateClientAllocation(projectId, structureId, clientId, tradeId , data){
  //   return this.httpClient.put(${this.REST_API_SERVER}/schemeclientallocation/update/${projectId}/${structureId}/${clientId}/${tradeId}, data)
  // }

  updateClientAllocation(projectId, structureId, clientId,data){
    return this.httpClient.put(`${this.REST_API_SERVER}/schemeclientallocation/updateclientbyid/${projectId}/${structureId}/${clientId}`, data)
  }


  //PMC API CALL

  

  //GET CONTRACTOR BY PROJECT ID
  getContractorByProjectId(projectId){
    return this.httpClient.get<ContractorData>(`${this.REST_API_SERVER}/contractorbyprojectid/${projectId}`)
  }
  //GET CONTRACTOR BY PROJECT ID



  //MIS REPORT API CALL
  createMisReport(data) :Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/misReport`, data)
  }

  getMisReport(id){
    return this.httpClient.get<Object>(`${this.REST_API_SERVER}/misReport/${id}`)
  }

  updateMisReport(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/misReport/${id}`, data)
  }

  deactivateMisReport(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/misReport/${id}`)
  }

  getAllMisReport(){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/misReport`)
  }

  //MIS REPORT API CALL




}
