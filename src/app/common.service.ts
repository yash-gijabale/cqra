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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private REST_API_SERVER = "http://localhost:9090";
  //private REST_API_SERVER = "http://18.217.108.137:8080";
  constructor(private httpClient: HttpClient) { }

  getClientProject(id){
    return this.httpClient.get<ProjectData[]>(this.REST_API_SERVER+`/common/ClientProjects/${id}`);
  }

  getStructures(clientId,projectId){
    return this.httpClient.get<StructureData[]>(this.REST_API_SERVER+`/common/getSelectedStructure/${clientId}/${projectId}`);
  }

  getStages(clientId,projectId,structureId){
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER+`/common/getSelectedStages/${clientId}/${projectId}/${structureId}`);
  }

  getUnits(clientId,projectId,structureId,stageId){
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER+`/common/getSelectedUnits/${clientId}/${projectId}/${structureId}/${stageId}`);
  }

  getSubUnit(clientId,projectId,structureId,stageId,unitId){
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER+`/common/getSelectedSubUnits/${clientId}/${projectId}/${structureId}/${stageId}/${unitId}`);
  }
  getRegionalManagers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/user/getAllRegionalManager/`);
  }
  getUsers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/user/getAllusers/`);
  }

  getProjects(userId){
    return this.httpClient.get<ProjectView[]>(this.REST_API_SERVER+`/user/getAllRproject/${userId}`);
  }
  
  getTrades(projectId,structureId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getAllTrades/${projectId}/${structureId}`);
  }

  getChecklists(userId,tradeId){
    return this.httpClient.get<Checklist[]>(this.REST_API_SERVER+`/common/getAllChecklists/${userId}`);
  }

  getQuestionGroup(userId){
    return this.httpClient.get<QuestionGroup[]>(this.REST_API_SERVER+`/common/getAllQuestionGroup/${userId}`);
  }

  getQuestion(userId,questionGroup){
    return this.httpClient.get<Question[]>(this.REST_API_SERVER+`/common/getAllQuestion/${userId}/${questionGroup}`);
  }

  getAllProject(){
    return this.httpClient.get<ProjectData[]>(this.REST_API_SERVER+`/project/getAllProjects`);
  }

  getAllContractors(){
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER+`/getContractors`);
  }

  getProjectTrades(projectId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getProjectTrades/${projectId}`);

  }

  getTrade(clientId,projectId,structureId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getProjectAllTrades/${projectId}/${structureId}`);
  }

  getContractors(clientId,projectId,structureId,tradeId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getProjectAllContractors/${projectId}/${structureId}/${tradeId}`);
  }

  getApprovers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/common/getAllApprover`);
  }

  getReviewer(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/common/getAllReviwer`);
  }

  getCreater(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/common/getAllCreater`);
  }

  getQuestionByTrade(tradeId, groupId)
  {
    return this.httpClient.get<Question[]>(this.REST_API_SERVER+`/question/question/${tradeId}/${groupId}`);
    
  }
 
  getContractorsList(){
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER+`/getContractors/`);
  }
  getContractorsById(id){
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER+`/contractor/107`);
  }

  getAllUsers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+'/user/getAllusers');
  }

  getAllFirstNotes()
  {
    return this.httpClient.get<FirstNote[]>(this.REST_API_SERVER+'/getfirstNotes')
  }

 

}
