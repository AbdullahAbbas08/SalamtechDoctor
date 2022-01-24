import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClinicSchedule } from 'src/Models/clinic-schedule';
import { ClinicScheduleDay } from 'src/Models/clinic-schedule-day';
import { CreateClinicSchedule } from 'src/Models/create-clinic-schedule';
import { DropDownModel } from 'src/Models/drop-down-model';
import { Duration } from 'src/Models/duration';
import { GeneralResponse } from 'src/Models/general-response';

@Injectable({
  providedIn: 'root'
})
export class ClinicScheduleService {



  culture:string = localStorage.getItem('lang') as string;
  auth:string =localStorage.getItem('Authorization') as string;

  constructor(private http:HttpClient) { }

    //#region Options
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
        })};
    //#endregion
    
    //#region GetDuration Medical Examination
    GetDurationMedicalExamination(lang:string):Observable<GeneralResponse<Duration>>{
      return this.http.get<GeneralResponse<Duration>>(`${environment.URL}${this.culture}/LookUp/GetDurationMedicalExamination`,this.httpOptions);
    }
    //#endregion

    //#region Get Clinic Schedual By ClinicId
    GetClinicSchedualByClinicId(lang:string , ID:number):Observable<GeneralResponse<ClinicSchedule>>{
      return this.http.get<GeneralResponse<ClinicSchedule>>(`${environment.URL}${this.culture}/DoctorClinic/GetClinicSchedualByClinicId?ClinicId=${ID}`,this.httpOptions);
    }
    //#endregion

    //#region Get Clinic Schedual By ClinicId
    GetClinicSchedualByClinicDayId(lang:string ,  ClinicId :number , DayId :number):Observable<GeneralResponse<ClinicScheduleDay>>{
      return this.http.get<GeneralResponse<ClinicScheduleDay>>(`${environment.URL}${this.culture}/DoctorClinic/GetClinicSchedualByClinicDayId?ClinicId=${ClinicId}&DayId=${DayId}`,this.httpOptions);
    }
    //#endregion

    //#region Create Doctor Clinic Schedual
    CreateDoctorClinicSchedual(CreateClinicSchedule:CreateClinicSchedule):Observable<GeneralResponse<null>>{
      return this.http.post<GeneralResponse<null>>(`${environment.URL}${this.culture}/DoctorClinic/CreateDoctorClinicSchedual`,CreateClinicSchedule,this.httpOptions);
    }
    //#endregion

    //#region Update Doctor Clinic Schedual
    UpdateDoctorClinicSchedual(CreateClinicSchedule:ClinicScheduleDay):Observable<GeneralResponse<null>>{
      return this.http.post<GeneralResponse<null>>(`${environment.URL}${this.culture}/DoctorClinic/UpdateDoctorClinicSchedual`,CreateClinicSchedule,this.httpOptions);
    }
    //#endregion

  }
