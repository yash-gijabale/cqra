import { HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const TOKEN_HEADER_KEY = 'Authorization';
const USER_ID = 'userId';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
token
userId
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    this.token  = localStorage.getItem('token');
    this.userId = localStorage.getItem('id');

    console.log("refresh token"+this.token)
    if (this.token != null) {
      
      let headers = new HttpHeaders()
      .set(TOKEN_HEADER_KEY, this.token)
      // .set(USER_ID, this.userId)

      authReq = req.clone({ headers:headers });
    }
    return next.handle(authReq);
  }
}

