import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/Service/login.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  DefaultLang:string |null;

  name;
  logo;
  IamgeURL:string;

  constructor(private translate:TranslateService , private loginService:LoginService , private router:Router) { 
    if(localStorage.getItem("lang") !=null){
      this.DefaultLang = localStorage.getItem("lang");

    }else{
      this.DefaultLang='en'
    }
  }

  //#region On Init Method
  ngOnInit(): void {
    this.GetDoctorProfile();
    this.IamgeURL = environment.ImagesURL;

    //#region Init Variables Scope
    if(this.DefaultLang === 'ar'){

      document.getElementsByTagName('html')[0].setAttribute("dir","rtl");
      this.translate.use(this.DefaultLang);
      this.name=localStorage.getItem('NameArabic');

    }else{
      this.DefaultLang = 'en';
      document.getElementsByTagName('html')[0].setAttribute("dir","ltr");
      this.translate.use(this.DefaultLang);
      this.name=localStorage.getItem('NameEnglish');
    }
    //#endregion
    this.logo = localStorage.getItem("logo")

  }
  //#endregion

  //#region change Language Method
  ChangeLanguage(e:any)
  {
    if(e === 'en')
    {

      console.log(localStorage.getItem("lang"))

      this.DefaultLang = 'ar';
      localStorage.setItem("lang",'ar')
      this.translate.use(this.DefaultLang);
      document.getElementsByTagName('html')[0].setAttribute("dir","rtl");
      window.location.reload();

    }
    if(e === 'ar')
    {
      localStorage.setItem("lang","en")
      this.DefaultLang = 'en';
      this.translate.use(this.DefaultLang);
      document.getElementsByTagName('html')[0].setAttribute("dir","ltr");
      window.location.reload();
    }

  }
  //#endregion

  GetDoctorProfile(){
    this.loginService.GetDoctorProfile().subscribe(
      (response)=>{
        // console.log(response);
        
        localStorage.setItem("NameEnglish",response.Data.FirstName + ' ' + response.Data.MiddelName + ' ' + response.Data.LastName);
        localStorage.setItem("NameArabic",response.Data.FirstNameAr+ ' ' + response.Data.MiddelNameAr + ' ' + response.Data.LastNameAr);
        localStorage.setItem("logo",response.Data.Image);
      },
      (err)=>{

      }
    )
  }

  RemoveAuth(){
    localStorage.removeItem('Authorization')
    localStorage.removeItem('NameArabic')
    localStorage.removeItem('NameEnglish')
    this.router.navigate(['/Login']);
    window.location.reload();
  }

}
