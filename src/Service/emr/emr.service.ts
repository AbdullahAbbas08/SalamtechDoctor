import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmrService {
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

    //#region 
    GetEmrProfile( appointmentId):Observable<any>{
      return this.http.get(`${environment.URL}${this.culture}/Patient/GetPatientEmrDetails?appointmentId=${appointmentId}`,this.httpOptions);
    }
    //#endregion
}
