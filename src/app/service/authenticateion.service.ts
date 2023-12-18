import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateionService {

  //private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working Ip
  private REST_API_SERVER = "http://localhost:9090"; //local Ip for testing
 // private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:8080";
// Adds CORS header to the request?
//private httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*'})};

  constructor(private httpClient: HttpClient) { }

  authenticateUser(userName,password){
    if(userName==='pramod' && password==='pramod'){
      console.log(userName+password)
     return true;
     
    } else {
      return false;
    }
}

authenticate(username, password) {
  return this.httpClient.post<any>(this.REST_API_SERVER+'/api/auth/signin',{username,password}).pipe(
   map(
     userData => {
      sessionStorage.setItem('username',userData.username);
      sessionStorage.setItem('id',userData.id);
      sessionStorage.setItem('email',userData.email);
      let tokenStr= 'Bearer '+userData.accessToken;
      sessionStorage.setItem('token', tokenStr);
      return userData;
     }
   )

  );
}


isUserLoggedIn() {
let user = sessionStorage.getItem('username')
//console.log(!(user === null))
return !(user === null)
}

logOut() {
sessionStorage.removeItem('username')
}


}