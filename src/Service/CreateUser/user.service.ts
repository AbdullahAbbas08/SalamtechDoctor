import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser } from 'src/Models/create-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

   //#region Create User
   CreateUser( CreateUser:CreateUser):Observable<any>{
    return this.http.post(`${environment.URL}${this.culture}/User/CreateUser`,CreateUser);
  }
  //#endregion
}
