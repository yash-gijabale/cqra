import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Checklist } from './checklist/checklist.component';
import { InspectionView } from './inspection-report/inspection-report.component';
import { NcBeanData, NcBeanSAView } from './ncclosure-sa/ncclosure-sa.component';
import { QuestionGroupView, QuestionGroup } from './question-group/question-group.component';
import { QuestionHeading, QuestionHeadingView } from './question-heading/question-heading.component';
import { Question } from './question/question.component';
import { InspectionDocView } from './snagging-document/snagging-document.component';
import { SnggingView } from './snagging-report/snagging-report.component';
import { Subgroup, SubgroupView } from './subgroup/subgroup.component';
import { TradeGroup } from './trade-group/trade-group.component';
import { Trade } from './trade/trade.component';
import { SubgroupData } from './create-subgroup/create-subgroup.component';
import { QuestionGroupData } from './create-question-group/create-question-group.component';
import { QuesHeadingData } from './create-question-heading/create-question-heading.component';
import { NcReportDetails } from './nc-closer-view-report/nc-closer-view-report.component';

@Injectable({
  providedIn: 'root'
})
export class TradeMaintanceService {
 // private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  //private REST_API_SERVER = "http://18.217.108.137:8080";
  private REST_API_SERVER = "http://localhost:9090";
  constructor(private httpClient: HttpClient) { }

  getAllTradeGroups(){
    return this.httpClient.get<TradeGroup[]>(this.REST_API_SERVER+'/tradeGroup/getAllTradeGroup');
  }

  getAllTrades(){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+'/trade/getAllTrade');
  }

  getAllSubgroups(){
    return this.httpClient.get<SubgroupView[]>(this.REST_API_SERVER+'/SubGroup/getAllSubGroup');
  }

  getAllQuestionGroups(){
    return this.httpClient.get<QuestionGroupView[]>(this.REST_API_SERVER+'/questionGroup/getAllQuestionGroup');
  }

  getAllQuestionHeadings(){
    return this.httpClient.get<QuestionHeadingView[]>(this.REST_API_SERVER+'/questionHeading/getAllQuestionHeading');
  }

  getAllQuestions(){
    return this.httpClient.get<Question[]>(this.REST_API_SERVER+'/question/getAllQuestion');
  }

  getAllChecklist(){
    return this.httpClient.get<Checklist[]>(this.REST_API_SERVER+'/checklist/getAllChecklist');
  }

  getAllInspectionDocReports(){
    return this.httpClient.get<InspectionDocView[]>(this.REST_API_SERVER+'/SAReports/inspectionDoc');
  }

  getAllSnggingReports(){
    return this.httpClient.get<SnggingView[]>(this.REST_API_SERVER+'/SAReports/snggingReports');
  }

  getAllInspectionReports(){
    return this.httpClient.get<InspectionView[]>(this.REST_API_SERVER+'/SAReports/inspectionReports');
  }

  getAllNCsforSA(){
    return this.httpClient.get<NcBeanSAView[]>(this.REST_API_SERVER+'/SAReports/SANCs');
  }

  saveReport(file: any | undefined): Observable<any> {
    return this.httpClient.post(this.REST_API_SERVER+`/SAReports/saveReport/`,file ,{
      responseType: 'blob'
    });
  }

  createTradeGroup(tradeGp: TradeGroup): Observable<TradeMaintanceService> {
    return this.httpClient.post<TradeMaintanceService>(`${this.REST_API_SERVER}/tradeGroup/addTradeGroup`, tradeGp);
  }

  retriveTradeGroup(id)
  {
    return this.httpClient.get<TradeGroup[]>(this.REST_API_SERVER+'/tradeGroup/tradeGroup/'+id);
  }

  updateTradeGroup(data: TradeGroup, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/tradeGroup/tradeGroup/${id}`, data)
  }

  deleteTradeGroup(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/tradeGroup/trade/${id}`)
  }

  // TRADE
  createTrade(tradeDAta: TradeGroup): Observable<TradeMaintanceService>{
    return this.httpClient.post<TradeMaintanceService>(`${this.REST_API_SERVER}/trade/addTrade`, tradeDAta);
  }

  retriveTrade(id)
  {
    return this.httpClient.get<TradeGroup>(`${this.REST_API_SERVER}/trade/trade/${id}`)
  }

  updateTrade(tradeData:TradeGroup, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/trade/trade/${id}`, tradeData)
  }
  deleteTrade(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/trade/trade/${id}`)
  }
  // TRADE

  // SUBGROUP
  createSubgroup(subgroupData: Subgroup): Observable<TradeMaintanceService>{
    return this.httpClient.post<TradeMaintanceService>(`${this.REST_API_SERVER}/SubGroup/addSubGroup`, subgroupData);
  }
  retirveSubgroup(id)
  {
    return this.httpClient.get<Subgroup>(`${this.REST_API_SERVER}/SubGroup/questionGroup/${id}`)
  }
  updateSubgroup(data:SubgroupData, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/SubGroup/questionGroup/${id}`, data)
  }

  deleteSubgroup(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/SubGroup/questionGroup/${id}`)
  }
  // SUBGROUP


  //QUESTION GROUP
  createQuestionGroup(data: QuestionGroup): Observable<TradeMaintanceService>{
    return this.httpClient.post<TradeMaintanceService>(`${this.REST_API_SERVER}/questionGroup/addQuestionGroup`, data);
  }

  retriveQuestionGroup(id)
  {
    return this.httpClient.get<QuestionGroup>(`${this.REST_API_SERVER}/questionGroup/questionGroup/${id}`)
  }

  updateQuestionGroup(data: QuestionGroupData, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/questionGroup/questionGroup/${id}`, data)
  }

  deleteQuetionGroup(id)
  {
    return this.httpClient.delete(`${this.REST_API_SERVER}/questionGroup/questionGroup/${id}`)
  }
  //QUESTION GROUP

  //QUESTION HEADING 
  createQuestionHeading(data: QuestionHeading) :Observable<TradeMaintanceService>{
    return this.httpClient.post<TradeMaintanceService>(`${this.REST_API_SERVER}/questionHeading/addQuestionHeading`, data)
  }
 
  retriveQuestionHeading(id)
  {
    return this.httpClient.get<QuestionHeadingView>(`${this.REST_API_SERVER}/questionHeading/questionHeading/${id}`)
  }

  updateQuestionHeading(data: QuesHeadingData, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/questionHeading/questionHeading/${id}`, data)
  }

  deleteQuestionHeading(id)
  {
    return  this.httpClient.delete(`${this.REST_API_SERVER}/questionHeading/questionHeading/${id}`)
  }
  //QUESTION HEADING

  //NC REPORT
  getNcsByReportId(project, trade, status, cycle, location){
    return this.httpClient.get<NcBeanData[]>(`${this.REST_API_SERVER}/findbyidss/${project}/${trade}/${status}/${cycle}/${location}`)

  }
  
  getNcReportById(id)
  {
    return this.httpClient.get<NcReportDetails[]>(`${this.REST_API_SERVER}/findbyidsss/${id}`)
  }

  updateNcReport(data: NcReportDetails, id)
  {
    return this.httpClient.put(`${this.REST_API_SERVER}/updatebyidss/${id}`, data)

  }

}
