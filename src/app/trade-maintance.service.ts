import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Checklist } from './checklist/checklist.component';
import { InspectionView } from './inspection-report/inspection-report.component';
import { NcBeanSAView } from './ncclosure-sa/ncclosure-sa.component';
import { QuestionGroupView } from './question-group/question-group.component';
import { QuestionHeadingView } from './question-heading/question-heading.component';
import { Question } from './question/question.component';
import { InspectionDocView } from './snagging-document/snagging-document.component';
import { SnggingView } from './snagging-report/snagging-report.component';
import { SubgroupView } from './subgroup/subgroup.component';
import { TradeGroup } from './trade-group/trade-group.component';
import { Trade } from './trade/trade.component';

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
    return this.httpClient.post<TradeMaintanceService>("http://18.217.108.137:8080/tradeGroup/addTradeGroup", tradeGp);
  }
  
  
}
