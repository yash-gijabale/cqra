import { HttpClient } from '@angular/common/http';
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


  newUserTradeTraining(data): Observable<InspectorTraning>{
    return this.httpClient.post<InspectorTraning>(`${this.REST_API_SERVER}/mulispecttradetraining/addinspectrade`, data)
  }
  
}
