import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponseAppointment } from 'src/Models/general-response-appointment';
import { GeneralResponseSingleObject } from 'src/Models/general-response-single-object';
import { PatientItem } from 'src/Models/patient-item';
import { UpdateClinic } from 'src/Models/update-clinic';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  culture:string = localStorage.getItem('lang') as string;
  auth:string =localStorage.getItem('Authorization') as string;

  constructor(private http: HttpClient) { }


  //#region Options
  httpOptions = {  headers: new HttpHeaders({ 'Authorization':  `Bearer ${this.auth}` } )};
  //#endregion


  //#region Get Current Doctor Appointment
  GetCurrentDoctorAppointment(MaxResultCount:number , SkipCount:number):Observable<GeneralResponseAppointment<PatientItem>>{
    return this.http.get<GeneralResponseAppointment<PatientItem>>(`${environment.URL}${this.culture}/DoctorAppointment/GetCurrentDoctorAppointment?SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`,this.httpOptions);
  }
  //#endregion

  //#region Ge tHistory Doctor Appointment
  GetHistoryDoctorAppointment(MaxResultCount:number , SkipCount:number):Observable<GeneralResponseSingleObject<UpdateClinic>>{
    return this.http.get<GeneralResponseSingleObject<UpdateClinic>>(`${environment.URL}${this.culture}/DoctorAppointment/GetHistoryDoctorAppointment?SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`,this.httpOptions);
  }
  //#endregion

}
