import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  devUrl = 'https://nxkxdr3l14.execute-api.us-east-1.amazonaws.com/dev/';
  constructor(private http:HttpClient) { }


  signupUser(body:any): Observable<any>{
    console.log(body);
    return this.http.post(this.devUrl + 'signUpUser',body);
  }

  loginUser(body:any) : Observable<any>{
    return this.http.post(this.devUrl + 'login',body)
  }


}
