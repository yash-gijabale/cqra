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

  retriveUSer(id){
    // return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/`)
  }


  //USER ALLOCATION API CALL
  createUserAllocation(data):Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/adduserAllocation`, data)
  }
  
  retriveAllocation(id){
    return this.httpClient.get<UseAllocationData>(`${this.REST_API_SERVER}/userAllocation/${id}`)
  }
  updateUserAllocation(data,id){
    return this.httpClient.put(`${this.REST_API_SERVER}/userAllocation/${id}`, data)
  }
}
