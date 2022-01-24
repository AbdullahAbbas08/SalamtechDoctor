import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DropDownModel } from 'src/Models/drop-down-model';
import { Galary } from 'src/Models/galary';
import { GeneralResponse } from 'src/Models/general-response';

@Injectable({
  providedIn: 'root'
})
export class GalaryService {


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

      //#region CreateClinicGallery
        CreateClinicGallery(lang:string , formData:FormData){
          return this.http.post(`${environment.URL}${this.culture}/DoctorClinic/CreateClinicGallery`,formData,this.httpOptions);
        }
        //#endregion

      //#region Get Clinic Gallery By ClinicId
        GetClinicGalleryByClinicId(lang:string , ID:number):Observable<GeneralResponse<Galary>>{
          return this.http.get<GeneralResponse<Galary>>(`${environment.URL}${this.culture}/DoctorClinic/GetClinicGalleryByClinicId?ClinicId=${ID}`,this.httpOptions);
        }
        //#endregion

      //#region Delete Clinic Gallery
        DeleteClinicGallery(lang:string , ID:number):Observable<GeneralResponse<Galary>>{
          return this.http.delete<GeneralResponse<Galary>>(`${environment.URL}${this.culture}/DoctorClinic/DeleteClinicGallery?ClinicGalleryId=${ID}`,this.httpOptions);
        }
        //#endregion

}
