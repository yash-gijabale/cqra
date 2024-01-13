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

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  //private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working IP Adderess
  private REST_API_SERVER = "http://localhost:9090"; //local IP For Testing
  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(private httpClient: HttpClient) { }
  getAllClients() {
    return this.httpClient.get<ClientData[]>(this.REST_API_SERVER + '/getClients');
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

  // PROJECT API CALL
  getAllProject() {
    return this.httpClient.get<ProjectView[]>(this.REST_API_SERVER + '/project/getAllProjects');
  }

  retrieveProject(id) {
    return this.httpClient.get<ProjectData[]>(`${this.REST_API_SERVER}/project/project/${id}`);
  }

  createProject(project): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/project/addProject/`, project);
  }

  updateProject(clientData: ProjectData, id) {
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

  projectChecklistAlloaction(data):Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addschemeque`, data)

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
    return this.httpClient.get<ContractorData[]>(`${this.REST_API_SERVER}/contractor/${id}`)
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

  getContractorsForSamplingStep(projectId){
    return this.httpClient.get<ContractorDataForSamplingStep>(`${this.REST_API_SERVER}/getconbypid/${projectId}`)
  }

  getClientByProjectId(projectId){
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/clientbyproject/${projectId}`)
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
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addSchemeContractorSupervisor`, data)
  }

  assignContractorForeman(data: Array<AssignForeman>) :Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/addSchemeContractorForeman`, data)
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
  //PMC API CALL

  //GEt CLIENT STAFF BY PROJECT ID
  getClientStaffByProjectId(projectId){
    return this.httpClient.get<clientStaffData>(`${this.REST_API_SERVER}/clientstaffbyprojectid/${projectId}`)
  }
  //GEt CLIENT STAFF BY PROJECT ID

  //GET CONTRACTOR BY PROJECT ID
  getContractorByProjectId(projectId){
    return this.httpClient.get<ContractorData>(`${this.REST_API_SERVER}/contractorbyprojectid/${projectId}`)
  }
  //GET CONTRACTOR BY PROJECT ID
}
