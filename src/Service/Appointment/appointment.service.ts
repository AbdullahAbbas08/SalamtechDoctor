import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponseAppointment } from 'src/Models/general-response-appointment';
 import { PatientItem } from 'src/Models/patient-item';
 
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  culture:string = localStorage.getItem('lang') as string;
  auth:string =localStorage.getItem('Authorization') as string;

  EMRID:number;
  searchResult:number= null;
  public Result= new BehaviorSubject<any>(this.searchResult);


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
  GetHistoryDoctorAppointment(MaxResultCount:number , SkipCount:number):Observable<GeneralResponseAppointment<PatientItem>>{
    return this.http.get<GeneralResponseAppointment<PatientItem>>(`${environment.URL}${this.culture}/DoctorAppointment/GetHistoryDoctorAppointment?SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}`,this.httpOptions);
  }
  //#endregion

  SearchDoctorAppointment(body):Observable<any>{
    return this.http.post(`${environment.URL}${this.culture}/DoctorAppointment/SearchForDoctorAppointment` , body,this.httpOptions)
  }

  CancelApointment(appointmentId):Observable<any>{
    return this.http.get(`${environment.URL}${this.culture}/DoctorAppointment/CancelAppointment?AppointmentId=${appointmentId}` ,this.httpOptions)
  }
}
