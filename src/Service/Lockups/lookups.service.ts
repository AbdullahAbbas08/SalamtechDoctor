import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from 'src/Models/Area';
import { City } from 'src/Models/City';
import { DropDownModel } from 'src/Models/drop-down-model';
import { Duration } from 'src/Models/duration';
import { GeneralResponse } from 'src/Models/general-response';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  culture:string = localStorage.getItem('lang') as string;

  auth:string =localStorage.getItem('Authorization') as string
  constructor(private http: HttpClient) { }


  //#region Options
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization':  `Bearer ${localStorage.getItem('Authorization') as string}`
      }

    )};
  //#endregion
      //#region Get Cities
      GetCountries(lang:string):Observable<GeneralResponse<City>>{
        return this.http.get<GeneralResponse<City>>(`${environment.URL}${this.culture}/LookUp/GetCountries`,this.httpOptions);
      }
      //#endregion CreateDoctorDocuments

    //#region Get Cities
    GetCities(lang:string):Observable<GeneralResponse<City>>{
      return this.http.get<GeneralResponse<City>>(`${environment.URL}${this.culture}/City/GetAllCities`,this.httpOptions);
    }
    //#endregion CreateDoctorDocuments

    //#region Get Areas
    GetAreas(lang:string):Observable<GeneralResponse<Area>>{
      return this.http.get<GeneralResponse<Area>>(`${environment.URL}${this.culture}/Area/GetAllAreas`,this.httpOptions);
    }
    //#endregion

    GetAreaByCityId(cityId):Observable<any>{
      return this.http.get(`${environment.URL}${this.culture}/Area/GetAreasByCityId?cityId=${cityId}` ,this.httpOptions)
    }

    //#region Get Services
    GetServices(lang:string):Observable<DropDownModel>{
      return this.http.get<DropDownModel>(`${environment.URL}${this.culture}/Services/GetServicesBySpecialist`,this.httpOptions);
    }
    //#endregion

    //#region Get Days
    GetDays(lang:string):Observable<DropDownModel>{
      return this.http.get<DropDownModel>(`${environment.URL}${this.culture}/LookUp/GetDays`,this.httpOptions);
    }
    //#endregion

    //#region 
    GetMedicalType():Observable<any>{
      return this.http.get(`${environment.URL}${this.culture}/LookUp/GetMedicalExaminationType`,this.httpOptions);
    }
    //#endregion
}
