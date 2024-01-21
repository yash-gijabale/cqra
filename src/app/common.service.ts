import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checklist } from './checklist/checklist.component';
import { ProjectData, ProjectView } from './project/project.component';
import { QuestionGroup } from './question-group/question-group.component';
import { Question } from './question/question.component';
import { Trade } from './trade/trade.component';
import { ContractorData } from './contractor-forman/contractor-forman.component';
import { UserView } from './users/users.component';
import { StageData, StructureData } from './wbs/wbs.component';
import { FirstNote } from './manualIndexCalulator/firstNote/first-note/first-note.component';
import { RegionList, CycleOfInspection } from './ncclosure-sa/ncclosure-sa.component';
import { UserLogDataView } from './user-log/user-log.component';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { NcCountReportData } from './nc-count-report/nc-count-report.component';
import { QualityIndexReport } from './quality-index-report/quality-index-report.component';
import { InspectionReport } from './creaate-inspectionreport/creaate-inspectionreport.component';
import { SnaggingReportView } from './create-snagging-document/create-snagging-document.component';
import { StepTrackerData } from './create-sampling-step-three/create-sampling-step-three.component';
import { ChecklistData } from './create-checklist/create-checklist.component';
import { MisFromData } from './create-mis-report/create-mis-report.component';
import { MisReport } from './mis-report/mis-report.component';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // private REST_API_SERVER = "http://18.217.108.137:9090";//working IP Address
  private REST_API_SERVER = "http://localhost:9090"; //local IP For Testing
  //private REST_API_SERVER = "http://18.217.108.137:8080";
  constructor(private httpClient: HttpClient) { }

  getClientProject(id) {
    return this.httpClient.get<ProjectData[]>(this.REST_API_SERVER + `/common/ClientProjects/${id}`);
  }

  getStructures(clientId, projectId) {
    return this.httpClient.get<StructureData[]>(this.REST_API_SERVER + `/common/getSelectedStructure/${clientId}/${projectId}`);
  }

  getStages(clientId, projectId, structureId) {
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER + `/common/getSelectedStages/${clientId}/${projectId}/${structureId}`);
  }

  getUnits(clientId, projectId, structureId, stageId) {
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER + `/common/getSelectedUnits/${clientId}/${projectId}/${structureId}/${stageId}`);
  }

  getSubUnit(clientId, projectId, structureId, stageId, unitId) {
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER + `/common/getSelectedSubUnits/${clientId}/${projectId}/${structureId}/${stageId}/${unitId}`);
  }
  getRegionalManagers() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + `/user/getAllRegionalManager`);
  }
  getUsers() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + `/user/getAllusers`);
  }

  getProjects(userId) {
    return this.httpClient.get<ProjectView[]>(this.REST_API_SERVER + `/user/getAllRproject/${userId}`);
  }

  getTrades(projectId, structureId) {
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER + `/common/getAllTrades/${projectId}/${structureId}`);
  }

  getChecklists(userId, tradeId) {
    return this.httpClient.get<Checklist[]>(this.REST_API_SERVER + `/common/getAllChecklists/${userId}`);
  }
  getChecklistsByTrade(tradeId) {
    return this.httpClient.get<Checklist[]>(this.REST_API_SERVER + `/findbytradeid/${tradeId}`);
  }

  getQuestionGroup(userId) {
    return this.httpClient.get<QuestionGroup[]>(this.REST_API_SERVER + `/common/getAllQuestionGroup/${userId}`);
  }

  getQuestion(userId, questionGroup) {
    return this.httpClient.get<Question[]>(this.REST_API_SERVER + `/common/getAllQuestion/${userId}/${questionGroup}`);
  }

  getAllProject() {
    return this.httpClient.get<ProjectData[]>(this.REST_API_SERVER + `/project/getAllProjects`);
  }

  getAllContractors() {
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER + `/getContractors`);
  }

  getProjectTrades(projectId) {
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER + `/common/getProjectTrades/${projectId}`);

  }

  getTrade(clientId, projectId, structureId) {
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER + `/common/getProjectAllTrades/${projectId}/${structureId}`);
  }

  getContractors(clientId, projectId, structureId, tradeId) {
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER + `/common/getProjectAllContractors/${projectId}/${structureId}/${tradeId}`);
  }

  getApprovers() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + `/common/getAllApprover`);
  }

  getReviewer() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + `/common/getAllReviwer`);
  }

  getCreater() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + `/common/getAllCreater`);
  }

  getQuestionByTrade(tradeId, groupId) {
    return this.httpClient.get<Question[]>(this.REST_API_SERVER + `/question/question/${tradeId}/${groupId}`);

  }

  getContractorsList() {
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER + `/getContractors/`);
  }
  getContractorsById(id) {
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER + `/contractor/107`);
  }

  getAllUsers() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + '/user/getAllusers');
  }

  getAllFirstNotes() {
    return this.httpClient.get<FirstNote[]>(this.REST_API_SERVER + '/getfirstNotes')
  }

  getAllRegions() {
    return this.httpClient.get<RegionList[]>(`${this.REST_API_SERVER}/getRegions`)
  }

  getAllCycleOfInspection() {
    return this.httpClient.get<CycleOfInspection[]>(`${this.REST_API_SERVER}/getCycleOfInspections`)
  }

  getNcClosedSAReport(region, project, cycle, trade, status) {
    return this.httpClient.get<CycleOfInspection[]>(`${this.REST_API_SERVER}/getCycleOfInspections`)

  }


  //USer log
  getUserLogData(id) {
    return this.httpClient.get<UserLogDataView[]>(`${this.REST_API_SERVER}/getCountViews/${id}`)

  }

  getUserLogAnswers(data): Observable<CommonService> {
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/getarrayy`, data);

  }

  //CHECKLIST API CALL
  addCheckList(data): Observable<CommonService> {
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/checklist/adddatalist`, data);
  }

  getCheckList(id) {
    return this.httpClient.get<ChecklistData>(`${this.REST_API_SERVER}/checklist/checklist/${id}`)
  }

  updateChecklist(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/checklist/updatebychecklistid/${id}`, data)
  }


  //REPORT API CALL
  //NC COUNT API CALL
  getNcCountReports() {
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/getAllnccount`)
  }

  createNcCountReport(data): Observable<CommonService> {
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/NcCount`, data)
  }

  retirveNcCountReport(id) {
    return this.httpClient.get<NcCountReportData>(`${this.REST_API_SERVER}/NcCount/${id}`)
  }

  updateNcCountReport(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/NcCount/${id}`, data)
  }

  //QUALITY INDEX REPORT
  getAllQualityIndexReport() {
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/`)
  }
  createQualityIndexReport(data): Observable<CommonService> {
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/QualityIndex/addQualityIndex`, data)
  }

  retriveQualityIndexReport(id) {
    return this.httpClient.get<QualityIndexReport>(`${this.REST_API_SERVER}/QualityIndex/QualityIndexx/${id}`)
  }

  updateQualityINdexReport(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/QualityIndex/QualityIndex/${id}`, data)
  }


  //NEW API FOR STRUCURES AND STAGE GET
  getStructureByProjectId(id) {
    return this.httpClient.get<StructureData[]>(`${this.REST_API_SERVER}/structure/getSelectedStructure/${id}`)
  }

  getStagesByStructureId(id) {
    return this.httpClient.get<StageData[]>(`${this.REST_API_SERVER}/stage/getstagebystructure/${id}`)

  }



  //INSPECTION REPORT CRUD API CALL
  createInspectionReport(data): Observable<CommonService> {
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/addminspectrep`, data)
  }

  retriveInspectionReport(id) {
    return this.httpClient.get<InspectionReport>(`${this.REST_API_SERVER}/getInspectDataByReportId/${id}`)
  }

  updateInspectionReport(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/updateminspectrep/${id}`, data)
  }



  //SANGGING REPORT
  createSnaggingReport(data): Observable<CommonService> {
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/addSnaggingMul`, data)
  }

  getSnaggingReport(id) {
    return this.httpClient.get<SnaggingReportView>(`${this.REST_API_SERVER}/getSnaggingMul/${id}`)
  }

  updateSnaggingReport(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/updateSnaggingMul/${id}`, data)
  }

  // createStructure(clientData): Observable<ClientServiceService> {
  //   return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/structure/addStructure`, clientData);
  // }
  //



  //MIS REPORT API CALL
  createMisReport(data: MisFromData): Observable<CommonService> {
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/addMis`, data)
  }
  getMisReport(id) {
    return this.httpClient.get<Object>(`${this.REST_API_SERVER}/Mis/${id}`)
  }

  updateMisReport(data: MisFromData, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/Mis/${id}`, data)
  }

  getAllMisReport(){
    return this.httpClient.get<MisReport>(`${this.REST_API_SERVER}/getMis`)
  }





  private oldMessage = sessionStorage.getItem('pkId')
  private message = new BehaviorSubject(this.oldMessage)
  getMessage = this.message.asObservable();

  setMessage(message: string) {
    this.message.next(message)
  }


  //Sampling step data
  test = {
    step1: {
      status: true,
      data: [
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 23,
          status: "118991",
          workArea: [
            118986,
            118987,
            118988,
            118989,
            118990
          ]
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 24,
          status: "118996",
          workArea: [
            118992,
            118993,
            118994,
            118995
          ]
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 56,
          status: "118997",
          workArea: [
            118997,
            118996,
            118995,
            118999,
            119000,
            119001
          ]
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 54,
          status: "notStarted",
          workArea: []
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 57,
          status: "118997",
          workArea: [
            131796,
            125928,
            122910,
            119000,
            118999
          ]
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 566,
          status: "notStarted",
          workArea: []
        }
      ]
    },
    step2: {
      status: true,
      data: [
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 23,
          status: "118991",
          samplingType: 1,
          contractor: "45",
          contractorName: "Test",
          staff: "131",
          staffName: "tets",
          allocatedArea: [
            {
              "stageId": 118986,
              "stageName": "Floor 1"
            },
            {
              "stageId": 116486,
              "stageName": "Floor 2"
            },
            {
              "stageId": 648986,
              "stageName": "Floor 3"
            },
          ]
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 24,
          status: "118996",
          samplingType: 1,
          contractor: "45",
          contractorName: "Test",
          staff: "131",
          staffName: "tets",
          allocatedArea: [
            {
              "stageId": 1986,
              "stageName": "Floor 4"
            },
            {
              "stageId": 1486,
              "stageName": "Floor 5"
            },
            {
              "stageId": 69865,
              "stageName": "Floor 6"
            },
            {
              "stageId": 6986,
              "stageName": "Floor 7"
            },
          ]
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 56,
          status: "118997",
          samplingType: 1,
          contractor: "31",
          contractorName: "Test2",
          staff: "131",
          staffName: "tets",
          allocatedArea: [
            {
              "stageId": 19866,
              "stageName": "Besment 1"
            },
            {
              "stageId": 14864,
              "stageName": "Besment 2"
            },

          ]
        },
        {
          projectId: "284",
          structureId: "2508",
          tradeId: 57,
          status: "118997",
          samplingType: 1,
          contractor: "31",
          contractorName: "Test 2",
          staff: "131",
          staffName: "tets",
          allocatedArea: [
            {
              "stageId": 1986,
              "stageName": "Floor 8"
            },
            {
              "stageId": 1464,
              "stageName": "Floor 9"
            },
            {
              "stageId": 19486,
              "stageName": "Floor 10"
            },

          ]
        }
      ]
    },
    step3: {
      status: false,
      data: []
    }
  }

  // private stepData = new BehaviorSubject(this.test)
  private stepData = new BehaviorSubject(this.test)
  getSamplingStepData = this.stepData.asObservable();

  setSamplingStepData(stepData: StepTrackerData) {
    this.stepData.next(stepData)

  }



}
