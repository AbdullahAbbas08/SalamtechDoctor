import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DropDownModel } from 'src/Models/drop-down-model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

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

    //#region Get Legal Document
    GetLegalDocument(lang:string):Observable<DropDownModel>{
      return this.http.get<DropDownModel>(`${environment.URL}${this.culture}/LookUp/GetLegalDocument`,this.httpOptions);
    }
    //#endregion CreateDoctorDocuments

    //#region Create Documents
    CreateDoctorDocuments(lang:string , Documents:FormData){
      return this.http.post(`${environment.URL}${this.culture}/Doctor/CreateDoctorDocuments`,Documents,this.httpOptions);
    }
    //#endregion


}
