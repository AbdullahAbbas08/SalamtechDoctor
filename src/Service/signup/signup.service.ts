import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signup } from 'src/Models/signup';
import { ResenderCode } from './resender-code';

@Injectable({
  providedIn: 'root'
})
export class SignupService implements OnInit {

  auth:string =localStorage.getItem('Authorization') as string;
  culture:string = localStorage.getItem('lang') as string;


  constructor(private http: HttpClient) { }

  //#region On Init Method
  ngOnInit(): void {
    this.ResenderCodeObject.Code = 0;
  }
  //#endregion

  //#region Declare varaibles
  ResenderCodeObject:ResenderCode = new ResenderCode();
  Phone:any;
  //#endregion

  //#region Options
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
      }

    )};
  //#endregion

  //#region Signup API
  SignUp(user:Signup){
    return this.http.post(`${environment.URL}${this.culture}/User/Register`,user,this.httpOptions);
  }
  //#endregion


  forgetpass(email){
    return this.http.post(`${environment.URL}${this.culture}/User/ResetPassword`,email,this.httpOptions);
  }
  changepass(body){
    return this.http.post(`${environment.URL}${this.culture}/User/UpdatePassword`,body,this.httpOptions);
  }
}
