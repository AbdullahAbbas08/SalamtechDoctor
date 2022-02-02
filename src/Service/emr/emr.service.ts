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
  
  appointmentId:number = null;
  public id = new BehaviorSubject<any>(this.appointmentId);
  
  constructor(private http: HttpClient) { 
    this.id.subscribe(res=>{
      // console.log(res);
      
    })

  }
 
  
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


}
