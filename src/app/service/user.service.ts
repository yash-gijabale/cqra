import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserView } from '../user-log/user-log.component';
import { Observable } from 'rxjs';
import { UseAllocationData } from '../create-user-allocation/create-user-allocation.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working Ip
  private REST_API_SERVER = "http://localhost:9090"; //local IP For Testing


  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+'/user/getAllusers/');
  }

  createUser(data) :Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/user/adduserData`,data)
  }

  retriveUser(id){
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserData/${id}`)
  }

  updateUSer(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/UserData/${id}`,data)
  }

  deactivateUser(id){
    return this.httpClient.put(`${this.REST_API_SERVER}/UserData/${id}/${false}`,'')
  }

  //USER ALLOCATION API CALL
  getUserAllocation(){
    return this.httpClient.get(`${this.REST_API_SERVER}/getUserAllocations`)
  }
  createUserAllocation(data):Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/saveData`, data)
  }
  
  retriveAllocation(id){
    return this.httpClient.get<UseAllocationData>(`${this.REST_API_SERVER}/userAllocation/${id}`)
  }
  updateUserAllocation(data,id){
    return this.httpClient.put(`${this.REST_API_SERVER}/userAllocation/${id}`, data)
  }


  //USER LIST FOR INSPECTION REPORT

  getApproverList(){
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabyapprover`)
  }

  getReviewverList(){
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabyrevever`)
  }

  getCreaterList(){
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabycreater`)
  }
}
