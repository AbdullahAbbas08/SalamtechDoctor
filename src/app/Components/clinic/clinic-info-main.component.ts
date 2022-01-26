import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Service/login.service';

@Component({
  selector: 'app-clinic-info-main',
  templateUrl: './clinic-info-main.component.html',
  styleUrls: ['./clinic-info-main.component.css']
})
export class ClinicInfoMainComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.GetDoctorProfile()
  }

  GetDoctorProfile(){
    this.loginService.GetDoctorProfile().subscribe(
      (response)=>{
        localStorage.setItem("NameEnglish",response.Data.FirstName + response.Data.MiddelName + response.Data.LastName);
        localStorage.setItem("NameArabic",response.Data.FirstNameAr + response.Data.MiddelNameAr + response.Data.LastNameAr);
        localStorage.setItem("logo",response.Data.Image);
      },
      (err)=>{

      }
    )
  }

}
