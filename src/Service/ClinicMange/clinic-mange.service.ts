import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from 'src/Models/clinic';
import { Duration } from 'src/Models/duration';
import { GeneralResponse } from 'src/Models/general-response';

@Injectable({
  providedIn: 'root'
})
export class ClinicMangeService {

  culture:string = localStorage.getItem('lang') as string;
  auth:string =localStorage.getItem('Authorization') as string;

  constructor(private http:HttpClient) { }

    //#region Options
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
        })};
    //#endregion
    
    //#region Get Doctor Clinics
    GetDoctorClinics():Observable<GeneralResponse<Clinic>>{
      return this.http.get<GeneralResponse<Clinic>>(`${environment.URL}${this.culture}/DoctorClinic/GetDoctorClinics`,this.httpOptions);
    }
    //#endregion

  

}
