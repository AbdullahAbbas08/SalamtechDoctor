import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { GeneralResponseSingleObject } from 'src/Models/general-response-single-object';
import { GetDoctorDashboard } from 'src/Models/MedicalType';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  culture:string = localStorage.getItem('lang') as string;
  auth:string =localStorage.getItem('Authorization') as string;
  constructor(private http: HttpClient) { }


  //#region Options
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
      }
    )};
  //#endregion


      //#region Get Dashoard Data
      GetDashboardData():Observable<GeneralResponseSingleObject<GetDoctorDashboard>>{
        return this.http.get<GeneralResponseSingleObject<GetDoctorDashboard>>(`${environment.URL}${this.culture}/DoctorDashboard/GetDoctorDashboard`,this.httpOptions);
      }
      //#endregion
      
}
