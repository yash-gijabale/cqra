import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientData } from '../client/client.component';
import { FormanData } from '../contractor-forman/contractor-forman.component';
import { ProjectData } from '../project/project.component';
import { StructureData } from '../wbs/wbs.component';
import {ProjectView} from '../project/project.component';
import { SupervisorData } from '../contractor-supervisor/contractor-supervisor.component';
import {ContractorData} from '../contractor/contractor.component'
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

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  //private REST_API_SERVER = "http://18.217.108.137:8080";
  private REST_API_SERVER = "http://localhost:9090";
  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(private httpClient: HttpClient) { }
  getAllClients(){
    return this.httpClient.get<ClientData[]>(this.REST_API_SERVER+'/getClients');
  }
  createClient(clientData: ClientData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER+'/addClient', clientData);
  }

  retrieveClient(id){
    return this.httpClient.get<ClientData>(`${this.REST_API_SERVER}/client/${id}`);
  }

  updateClient( clientData:ProjectData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/client/${id}` , clientData);
  }

  getAllProject(){
    return this.httpClient.get<ProjectView[]>(this.REST_API_SERVER+'/project/getAllProjects');
  }

  retrieveProject(id){
    return this.httpClient.get<ProjectData[]>(`${this.REST_API_SERVER}/project/project/${id}`);
  }

  createProject(clientData:ProjectData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/project/addProject`, clientData);
  }
 
  updateProject( clientData:ProjectData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/project/project/${id}` , clientData);
  }


  retrieveStructure(id){
    return this.httpClient.get<StructureData[]>(`${this.REST_API_SERVER}/structure/structure/${id}`);
  }

  createStructure(clientData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/structure/addStructure`, clientData);
  }
 
  updateStructure( clientData:StructureData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/structure/structure/${id}` , clientData);
  }

  getAllForemans(){
    return this.httpClient.get<FormanData[]>(this.REST_API_SERVER+'/getForemans');
  }

  createFormeman(clientData: FormanData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER+'/addforeman', clientData);
  }

  retrieveForeman(id){
    return this.httpClient.get<FormanData>(`${this.REST_API_SERVER}/foreman/${id}`);
  }

  updateForeman( clientData:FormanData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/foreman/${id}` , clientData);
  }

  getAllSupervisor(){
    return this.httpClient.get<SupervisorData[]>(this.REST_API_SERVER+'/getSupervisors');
  }

  createContractor(contractorData: ContractorData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER+'/addcontractor', contractorData);
  }

  createSupervisor(supervisorData: SupervisorData): Observable<ClientServiceService>{
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER+'/addsupervisor', supervisorData);
  }

  retrieveSupervisor(id){
    return this.httpClient.get<SupervisorData>(`${this.REST_API_SERVER}/supervisor/${id}`);
  }

  updateSupervisor(supervisorData:SupervisorData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/supervisor/${id}` , supervisorData);
  }

  deleteForeman(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/foreman/${id}`)
  }

  deleteSupervisor(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/supervisor/${id}`)
  }

  createClientStaff(clientStaffData: clientStaffData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER+'/addclientStaff', clientStaffData);
  }

  getAllClientStaff(){
    return this.httpClient.get<clientStaffData[]>(this.REST_API_SERVER+'/getClientStaffs');
  }

  retrieveClientStaff(id){
    return this.httpClient.get<clientStaffData>(`${this.REST_API_SERVER}/clientStaff/${id}`);
  }

  updateClientStaff(clientStaffData:clientStaffData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/clientStaff/${id}`, clientStaffData)
  }

  addFirstNote(firstNoteData: FirstNoteData): Observable<ClientServiceService> {
    return this.httpClient.post<ClientServiceService>(this.REST_API_SERVER+'/addclientStaff', firstNoteData);
  }

  retrieveFirstNote(id)
  {
    return this.httpClient.get<FirstNoteData>(`${this.REST_API_SERVER}/firstNote/${id}`);
  }
  updateFirstNote(firstNote:FirstNoteData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/firstNote/${id}`, firstNote)
  }
  deleteFirstNote(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/firstNote/${id}`)
  }

  getAllOfferedArea(){
    return this.httpClient.get<OffredArea[]>(this.REST_API_SERVER+'/getofferdAreas');
  }
  
  retriveOfferedArea(id)
  {
    return this.httpClient.get<OffredArea>(`${this.REST_API_SERVER}/offerdArea/${id}`);
  }

  updateOfferedArea(offerdAreaData:offerdAreaData, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/offerdArea/${id}`, offerdAreaData)

  }
  deleteOfferedArea(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/offerdArea/${id}`)
  }
  getAllSampledArea()
  {
    return this.httpClient.get<SampledArea[]>(this.REST_API_SERVER+'/getSampledAreas')
  }
  
  retriveSampledArea(id)
  {
    return this.httpClient.get<SampledArea>(`${this.REST_API_SERVER}/sampledArea/${id}`);
  }

  updateSampledArea(sampledAreaData:SampledAreaData, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/sampledArea/${id}`, sampledAreaData)
  }

  deleteSampledArea(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/sampledArea/${id}`)
  }

  getAllInspectionActivity()
  {
    return this.httpClient.get<InspectionActivity[]>(this.REST_API_SERVER+'/getactivitiesNotAvailableDuringInspections')
  }

  retriveInspectionActivity(id)
  {
    return this.httpClient.get<InspectionActivity[]>(`${this.REST_API_SERVER}/activitiesNotAvailableDuringInspection/${id}`)
  }

  updateInspectionActivity(fromData:InspectionActivityData, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/activitiesNotAvailableDuringInspection/${id}`, fromData)
  }

  getAllReferenceReport()
  {
    return this.httpClient.get<RefereneceReport[]>(this.REST_API_SERVER+'/getReferenceReports')
  }
  retirveReferenceReport(id)
  {
    return this.httpClient.get<RefereneceReport[]>(`${this.REST_API_SERVER}/referenceReports/${id}`)
  }

  updateReferenceNote(report:referenceReportData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/referenceReports/${id}`, report)
  }

  deleteReferenceReport(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/referenceReports/${id}`)
  }


// ASSESSOR NAME SERVICES
  getAllAssessorName(id)
  {
    return this.httpClient.get<AssessorName[]>(this.REST_API_SERVER+'/assessorsNamebysnapauditid/'+id)
  }

  retirveAssessor(id)
  {
    return this.httpClient.get<AssessorName[]>(this.REST_API_SERVER+'/assessorsName/'+id)
  }

  updateAssessorName(assessorData:AssessorNameData, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/assessorsName/${id}`, assessorData)
  }

  deleteAssessorName(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/assessorsName/${id}`)
  }
// ASSESSOR NAME SERVICES


//STAGE OF WORK
getAllStageOfWork(id)
{
  return this.httpClient.get<StageOfWork[]>(`${this.REST_API_SERVER}/qualityRecommandationbysnapauditid/${id}`)
}

retirveStageOfWork(id)
{
  return this.httpClient.get<StageOfWork[]>(`${this.REST_API_SERVER}/qualityRecommandation/${id}`)

}

updateStageOfWork(formData: StageOfWorkData, id)
{
  return this.httpClient.put(`${this.REST_API_SERVER}/qualityRecommandation/${id}`, formData)

}

deleteStageOfWork(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/qualityRecommandation/${id}`)
  }
//STAGE OF WORK


//REMARKS (LAST NOTES)
getRemarks(id)
{
  return this.httpClient.get<Remarks[]>(`${this.REST_API_SERVER}/lastNotebysnapauditid/${id}`)
}

retirveRemark(id)
{
  return this.httpClient.get<Remarks[]>(`${this.REST_API_SERVER}/lastNote/${id}`)
}

updateRemark(remarkData: RemarkData, id)
{
  return this.httpClient.put(`${this.REST_API_SERVER}/lastNote/${id}`, remarkData)
}
deleteRemark(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/lastNote/${id}`)
  }
//REMARKS (LAST NOTES)

}
