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
    GetLegalDocument(lang:string):Observable<any>{
      return this.http.get<any>(`${environment.URL}${this.culture}/Doctor/GetDoctorLegalDocuments`,this.httpOptions);
    }


        //#region Get Document
        GetDocuments(lang:string):Observable<any>{
          return this.http.get<any>(`${environment.URL}${this.culture}/Doctor/GetDoctorDocuments`,this.httpOptions);
        }
       
           //#region delete Document
           DeleteDocuments(lang, DocumentId:number):Observable<any>{
            return this.http.delete(`${environment.URL}${this.culture}/Doctor/DeleteDoctorDocument?DocumentId=${DocumentId}` ,this.httpOptions);
          }

    //#region Create Documents
    CreateDoctorDocuments(lang:string , Documents:FormData){
      return this.http.post(`${environment.URL}${this.culture}/Doctor/CreateDoctorDocuments`,Documents,this.httpOptions);
    }
    //#endregion


}
