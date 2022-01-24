import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  auth:string =localStorage.getItem('Authorization') as string;
  culture:string = localStorage.getItem('lang') as string;

  constructor(private http: HttpClient) { }


  //#region Options
  httpOptions = {
    headers: new HttpHeaders({
        'Authorization':  `Bearer ${this.auth}`
      }

    )};
  //#endregion

  CreateCertificate(lang: string, Certificate: FormData) {
    return this.http.post(
      `${environment.URL}${this.culture}/Doctor/CreateDoctorCertificate`,
      Certificate,
      this.httpOptions
    );
  }

  //#region Get Certificate
  GetDoctorCertificate(lang: string) {
    return this.http.get(
      `${environment.URL}${this.culture}/Doctor/GetDoctorCertificate`,
      this.httpOptions
    );
  }
  //#endregion

  //#region Delete Certificate Id
  DeleteCertificate(lang: string,id:number) {
    return this.http.delete(
      `${environment.URL}${this.culture}/Doctor/DeleteDoctorCertificates?CertificateId=${id}`,
      this.httpOptions
    );
  }
  //#endregion

  //#region Update Certificate Id
  UpdateCertificate(lang: string,Certificate: FormData) {
    return this.http.post(
      `${environment.URL}${this.culture}/Doctor/UpdateDoctorCertificate`,Certificate,
      this.httpOptions
    );
  }
  //#endregion
}
