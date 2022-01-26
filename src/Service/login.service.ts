import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './../Models/Login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from 'src/Models/general-response';
import { LoginResponse } from 'src/Models/LoginResponse';
import { DoctorInfoModel } from 'src/Models/doctor-info-model';
import { GeneralResponseSingleObject } from 'src/Models/general-response-single-object';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  culture:string = localStorage.getItem('lang') as string;


  auth:string =localStorage.getItem('Authorization') as string;

  constructor(private http:HttpClient) { }

    //#region Options
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
        })};
    //#endregion
  


  login(user:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.URL}${this.culture}/User/Login`,user);
  }

  GetDoctorProfile():Observable<GeneralResponseSingleObject<DoctorInfoModel>>{
    return this.http.get<GeneralResponseSingleObject<DoctorInfoModel>>(`${environment.URL}${this.culture}/Doctor/GetDoctorProfile` , this.httpOptions);
  }



}
