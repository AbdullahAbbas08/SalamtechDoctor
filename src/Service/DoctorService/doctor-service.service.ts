import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClinicSchedule } from 'src/Models/clinic-schedule';
import { ClinicScheduleDay } from 'src/Models/clinic-schedule-day';
import { Duration } from 'src/Models/duration';
import { GeneralResponse } from 'src/Models/general-response';
import { CreateClinicSchedule } from 'src/Models/create-clinic-schedule';
import { GeneralResponseSingleObject } from 'src/Models/general-response-single-object';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  //#region Declare Variables
  ActiveComponent:string = "Home Visits";
  //#endregion

  culture:string = localStorage.getItem('lang') as string;
  auth:string =localStorage.getItem('Authorization') as string;

  constructor(private http:HttpClient) { }

    //#region Options
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
        })};
    //#endregion
  


    //#region Doctor Home Visit

        //#region Get Doctor Home Visit Schedual
        GetDoctorHomeVisitSchedual():Observable<GeneralResponse<ClinicSchedule>>{
          return this.http.get<GeneralResponse<ClinicSchedule>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorHomeVisitSchedual`,this.httpOptions);
        }
        //#endregion

        //#region Create Doctor Home Visit Schedual
        CreateDoctorHomeVisitSchedual(CreateClinicSchedule:CreateClinicSchedule):Observable<GeneralResponseSingleObject<null>>{
          return this.http.post<GeneralResponseSingleObject<null>>( `${environment.URL}${this.culture}/DoctorService/CreateDoctorHomeVisitSchedual`,
                                                                     CreateClinicSchedule                                                          ,
                                                                     this.httpOptions
                                                                  )
        }
        //#endregion

        //#region Get Doctor Home Visit Schedual By DayId
        GetDoctorHomeVisitSchedualByDayId( DayId :number):Observable<GeneralResponse<ClinicScheduleDay>>{
          return this.http.get<GeneralResponse<ClinicScheduleDay>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorHomeVisitSchedualByDayId?DayId=${DayId}`,this.httpOptions);
        }
        //#endregion

    //#endregion

    //#region Doctor Video Call

        //#region Get Doctor Video Call Schedual
        GetDoctorVideoAppointmentSchedual():Observable<GeneralResponse<ClinicSchedule>>{
          return this.http.get<GeneralResponse<ClinicSchedule>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorVideoAppointmentSchedual`,this.httpOptions);
        }
        //#endregion

        //#region Create Doctor Video Schedual
        CreateDoctorVideoSchedual(CreateClinicSchedule:CreateClinicSchedule):Observable<GeneralResponse<null>>{
          return this.http.post<GeneralResponse<null>>(`${environment.URL}${this.culture}/DoctorService/CreateDoctorVideoSchedual`,CreateClinicSchedule,this.httpOptions);
        }
        //#endregion

        //#region Get Doctor Video Appointment Schedual By DayId
        GetDoctorVideoAppointmentSchedualByDayId( DayId :number):Observable<GeneralResponse<ClinicScheduleDay>>{
          return this.http.get<GeneralResponse<ClinicScheduleDay>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorVideoAppointmentSchedualByDayId?DayId=${DayId}`,this.httpOptions);
        }
        //#endregion

    //#endregion
    
    //#region Doctor Call 

        //#region Get Doctor Call Appointment Schedual
        GetDoctorCallAppointmentSchedual():Observable<GeneralResponse<ClinicSchedule>>{
          return this.http.get<GeneralResponse<ClinicSchedule>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorCallAppointmentSchedual`,this.httpOptions);
        }
        //#endregion

        //#region Create Doctor Call Schedual
        CreateDoctorCallSchedual(CreateClinicSchedule:CreateClinicSchedule):Observable<GeneralResponse<null>>{
          return this.http.post<GeneralResponse<null>>(`${environment.URL}${this.culture}/DoctorService/CreateDoctorCallSchedual`,CreateClinicSchedule,this.httpOptions);
        }
        //#endregion

        //#region Get Doctor Call Appointment Schedual By DayId
        GetDoctorCallAppointmentSchedualByDayId( DayId :number):Observable<GeneralResponse<ClinicScheduleDay>>{
          return this.http.get<GeneralResponse<ClinicScheduleDay>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorCallAppointmentSchedualByDayId?DayId=${DayId}`,this.httpOptions);
        }
        //#endregion

    //#endregion

    //#region Doctor Chat

        //#region Get Doctor Chat Appointment Schedual
        GetDoctorChatAppointmentSchedual():Observable<GeneralResponse<ClinicSchedule>>{
          return this.http.get<GeneralResponse<ClinicSchedule>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorChatAppointmentSchedual`,this.httpOptions);
        }
        //#endregion

        //#region Create Doctor Chat Schedual
        CreateDoctorChatSchedual(CreateClinicSchedule:CreateClinicSchedule):Observable<GeneralResponse<null>>{
          return this.http.post<GeneralResponse<null>>(`${environment.URL}${this.culture}/DoctorService/CreateDoctorChatSchedual`,CreateClinicSchedule,this.httpOptions);
        }
        //#endregion
    
        //#region Get Doctor Chat Appointment Schedual By DayId
        GetDoctorChatAppointmentSchedualByDayId( DayId :number):Observable<GeneralResponse<ClinicScheduleDay>>{
          return this.http.get<GeneralResponse<ClinicScheduleDay>>(`${environment.URL}${this.culture}/DoctorService/GetDoctorChatAppointmentSchedualByDayId?DayId=${DayId}`,this.httpOptions);
        }
        //#endregion

    //#endregion




    //#region GetDuration Medical Examination
    GetDurationMedicalExamination(lang:string):Observable<GeneralResponse<Duration>>{
      return this.http.get<GeneralResponse<Duration>>(`${environment.URL}${this.culture}/LookUp/GetDurationMedicalExamination`,this.httpOptions);
    }
    //#endregion


























    //#region Update Doctor Clinic Schedual
    UpdateDoctorClinicSchedual(CreateClinicSchedule:ClinicScheduleDay):Observable<GeneralResponse<null>>{
      return this.http.post<GeneralResponse<null>>(`${environment.URL}${this.culture}/DoctorClinic/UpdateDoctorClinicSchedual`,CreateClinicSchedule,this.httpOptions);
    }
    //#endregion

  }
