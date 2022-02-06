import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmrService {


  culture:string = localStorage.getItem('lang') as string;
  auth:string =localStorage.getItem('Authorization') as string;
  
  Id:number = null;
  public patientId = new BehaviorSubject<any>(this.Id);
  public appointmentId = new BehaviorSubject<any>(this.Id);
  
  constructor(private http: HttpClient) { }
 
  
  //#region Options
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
      }
    )};
  //#endregion

  //#region 
  GetEmrHistory( Id):Observable<any>{
    return this.http.get(`${environment.URL}${this.culture}/Patient/GetPatientEmrHistory?patientId=${Id}`,this.httpOptions);
  }
  //#endregion

  //#region 
  GetEmrDetails( appointmentId):Observable<any>{
    return this.http.get(`${environment.URL}${this.culture}/Patient/GetPatientEmrDetails?appointmentId=${appointmentId}`,this.httpOptions);
  }
  //#endregion


  //#region 
  PostEmrInstructions( body):Observable<any>{
    return this.http.post(`${environment.URL}${this.culture}/Patient/CreatePatientEmr`,body,this.httpOptions);
  }
  //#endregion

  //#region 
  PostEmrDetails( body):Observable<any>{
    return this.http.post(`${environment.URL}${this.culture}/Patient/CreatePatientEmrDetails`,body,this.httpOptions);
  }
  //#endregion

  //#region 
  PostEmrDocs( body):Observable<any>{ 
    return this.http.post(`${environment.URL}${this.culture}/Patient/CreatePatientEmrDocument`,body,this.httpOptions);
  }
  //#endregion

}
