import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectorTraning {

  // private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working Ip
  private REST_API_SERVER = "http://localhost:9090"; //local IP For Testing


  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(private httpClient: HttpClient) { }


  getAllUserTradeTraining() {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/mulispecttradetraining/getallinspectrade`)
  }

  newUserTradeTraining(data): Observable<InspectorTraning> {
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/mulispecttradetraining/addinspectrade`, data)
  }

  getUserTrainingData(id) {
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/mulispecttradetraining/getallinspectradebyuserid/${id}`)
  }

  uploadTrainingAttachment(id, data) {
    let token = sessionStorage.getItem('token')
    let config = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };
    return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/updatetrainingattach/${id}`, data, config)
  }

  updateTrainingMark(userId, tradeId, mark) {
    return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/updatemarks/${userId}/${tradeId}/${mark}`, '')
  }

  addTrainingQuestions(userId, TradeId, data) {
    return this.httpClient.put(`${this.REST_API_SERVER}/mulispecttradetraining/addquestiontotid/${userId}/${TradeId}`, data)
  }


  getUserTradeQuestion(userId, tradeId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/mulispecttradetraining/getallbyuserandtradeid/${userId}/${tradeId}`)
  }

  submitTradeAnswer(userId, tradeId, data):Observable<InspectorTraning>{
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/mulispecttradetraining/addanswerstoque/${userId}/${tradeId}`, data)
  }

}