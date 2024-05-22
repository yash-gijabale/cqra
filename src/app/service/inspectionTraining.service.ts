import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from 'src/config/Global';
import { ApprovedTrade } from '../create-user-allocation/create-user-allocation.component';

@Injectable({
  providedIn: 'root'
})
export class InspectorTraning {

  // private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working Ip


  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(private httpClient: HttpClient,
    private global: Global) { }

  private REST_API_SERVER = this.global.SERVER; //local IP For Testing

  getAllUserTradeTraining() {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/mulispecttradetraining/getallinspectrade`)
  }

  newUserTradeTraining(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/mulispecttradetraining/addinspectrade`, data)
  }

  getUserTrainingData(id) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/mulispecttradetraining/getallinspectradebyuserid/${id}`)
  }

  uploadTrainingAttachment(id, file: File) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('file', file)
    return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/updatetrainingattach/${id}`, formParams, config)
    // return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/updatetrainingattach/${id}`, data, config);
  }

  uploadEquipment(id, data) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('eimage', data.img1)
    formParams.append('ccimage', data.img2)
    // let formData = {
    //   eimage: data.img1,
    //   ccimage: data.img2
    // }
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/updateimages/${id}`, formParams, config)
    // return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/updatetrainingattach/${id}`, data, config);
  }

  updateTrainingMark(userId, tradeId, mark, passOrfail) {
    return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/updatemarks/${userId}/${tradeId}/${mark}/${passOrfail}`, '')
  }

  addTrainingQuestions(userId, TradeId, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/addquestiontotid/${userId}/${TradeId}`, data)
  }

  getUserTradeQuestion(userId, tradeId) {
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/mulispecttradetraining/getallbyuserandtradeid/${userId}/${tradeId}`)
  }
  submitTradeAnswer(userId, tradeId, data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/mulispecttradetraining/addanswerstoque/${userId}/${tradeId}`, data)
  }
  getUserQuestionAnswer(userId, TradeId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/mulispecttradetraining/getanswerbyusertradeid/${userId}/${TradeId}`)
  }

  submitUserExamResult(data) {
    return this.httpClient.put<Array<Object>>(`${this.REST_API_SERVER}/mulispecttradetraining/updatestatus`, data)
  }

  updateUserTradeStatus(userId, tradeId, status) {
    return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/updateuserapprover/${userId}/${tradeId}/${status}`, '')

  }

  //INSPECTION DECLARATION
  getTrainingApprovedUser() {
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/mulispecttradetraining/getbyuserapprover`)
  }

  assignMultipleProject(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/addmuluserproject`, data)
  }

  sendMailDeclaration(id) {
    return this.httpClient.post<any>(`${this.REST_API_SERVER}/mulispecttradetraining/emailsend/${id}`, '')
  }


  // DTM
  getDeclarationUserList() {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/userprojectvieww/getall`)
  }

  getUserDeclarationDetails(id) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/userprojectvieww/getallbyid/${id}`)
  }

  submitDeclarationForm(data) {
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/updateuserproject`, data)
  }

  updateDtmStatus(projectId, UserId, data) {
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/updateuserprojectdtmstatus/${UserId}/${projectId}`, data)
  }

  getUserDeclarationByuserAndProject(userId, projectId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/userprojectvieww/getallbyuserandpid/${userId}/${projectId}`)

  }


  //SNAPAUDIT PRE PROCCESS SERVICES
  addInspectionTeamComposition(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/inspectionteammaster/save`, data)
  }

  updateInspectionTeamComposition(masterID, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/inspectionteammaster/updatebymasterid/${masterID}`, data)
  }

  getUserEquipmentList(id) {
    return this.httpClient.get<Array<Object>>(`${this.REST_API_SERVER}/getequipmentbyassignto/${id}`)
  }

  getMasterDetails(id, userId) {
    return this.httpClient.get<Object>(`${this.REST_API_SERVER}/inspectionTeamMasterView/getbymasterid/${id}/${userId}`)
  }

  getMasterIdsByUserId(id) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/inspectionteammaster/masteridbyuserid/${id}`)
  }

  addEquipmentMaintenanceForm(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/equipmentMaintenanceFormat/save`, data)
  }

  getEquipmentForm(masterId, userId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/equipmentMaintenanceFormat/getallbymasterid/${masterId}/${userId}`)
  }

  updateEquipementForm(masterId, userId, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/equipmentMaintenanceFormat/update/${masterId}/${userId}`, data)
  }

  checkUserDeclarationForProject(userId, projectId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/getUserProjectbyuseridandprojectids/${userId}/${projectId}`)
  }

  addOpeningClosingForm(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/OCMeetingAttandance/save`, data)
  }

  getOpeningClosingForm(masterId) {
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/OCMeetingAttandance/getbymasterid/${masterId}`)
  }

  updateOpeningClosingFrom(masterId, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/OCMeetingAttandance/update/${masterId}`, data)
  }

  uploadOpeningClosingImage(masterId, data) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('file', data.openingImg)
    formParams.append('file1', data.closingImg)
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/OCMeetingAttandance/images/${masterId}`, formParams, config)
  }


  getComposedTeamByMasterId(masterId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/inspectionteammaster/getbymasterid/${masterId}`)
  }

  addSupervisorL1L2Data(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/supervisorForm/save`, data)
  }

  getSupervisroFormData(masterId) {
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/supervisorForm/getbymasterid/${masterId}`)
  }

  updateSupervisorFrom(masterId, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/supervisorForm/update/${masterId}`, data)
  }


  addInspectorOnsitePerformance(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/inspectorOnsitePerformanceEvaluation/save`, data)
  }

  getOnsitePerformanceFormData(masterId) {
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/inspectorOnsitePerformanceEvaluation/getviewbymasterid/${masterId}`)
  }

  updateInspectionOnsitePerformance(masterId, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/inspectorOnsitePerformanceEvaluation/update/${masterId}`, data)
  }

  addInternalReviewForm(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/intRevMeetAtProSiteMaster/save`, data)
  }

  getInternalReviewForm(masterID) {
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/intRevMeetAtProSiteMaster/getbymasterid/${masterID}`)
  }

  updateInternalReviewForm(masterID, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/intRevMeetAtProSiteMaster/update/${masterID}`, data)
  }

  //feedback form
  addClientFeedbackForm(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/ClientFeedbackForm/save`, data)
  }


  // IMAGE UPLOADING FOR PRE SNAP FORM
  uploadEquipmentMaintainenceForm(masterId, data: File) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('file', data)
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/equipmentMaintenanceFormat/updateimage/${masterId}`, formParams, config)
  }

  uploadOpeningClosingForm(masterId, data: File) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('file', data)
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/OCMeetingAttandance/formimages/${masterId}`, formParams, config)
  }


  uploadInternalReviewForm(masterId, data: File) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('file', data)
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/intRevMeetAtProSiteMaster/updateimage/${masterId}`, formParams, config)
  }

  uploadSuperVisorL1L2form(masterId, data: File) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('file', data)
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/supervisorForm/updateimage/${masterId}`, formParams, config)
  }


  uploadPerformanceForm(masterId, data: File) {
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('file', data)
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/inspectorOnsitePerformanceEvaluation/updateimage/${masterId}`, formParams, config)
  }

  getAllFormStatus(masterId, userId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/SAInspectionFormStatus/getstaus/${masterId}/${userId}`)
  }

  getAllMasterDataView(userId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/inspectionTeamMasterView/getbyuserid/${userId}`)
  }


  getApprovedTradeByuserandProject(projectId, userId) {
    return this.httpClient.get<Array<ApprovedTrade>>(`${this.REST_API_SERVER}/mulispecttradetraining/getbyprojectidtradeswhicharepass/${projectId}/${userId}`)
  }


  downloadOnsitePerformanceForm(masterId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadinspectoronsiteperformanceevaluation/${masterId}`)
  }

  downloadSupervisionL1L2(masterID) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadsupervisorformforl1andl2/${masterID}`)
  }

  downloadOpeningClosingMeeting(masterId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadopeningclossingmeetingattendancesheet/${masterId}`)
  }

  downloadInternelReviewMeeting(masterId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadinternalreviewmeeting/${masterId}`)
  }
  
  downloadTeamInspectionForm(masterId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadinspectionteamcomposition/${masterId}`)
  }

  downloadEquipmentForm(masterId,userId) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadequipmentmaintenanceformat/${masterId}/${userId}`)
  }
  
}
