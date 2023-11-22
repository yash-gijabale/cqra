import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserView } from '../user-log/user-log.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private REST_API_SERVER = "http://18.217.108.137:8080";
  private REST_API_SERVER = "http://localhost:9090";

  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+'/user/getAllusers/');
  }

  
}
