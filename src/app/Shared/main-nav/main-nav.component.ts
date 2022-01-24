import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  DefaultLang:string |null;

  constructor(private translate:TranslateService) { 
    if(localStorage.getItem("lang") !=null){
      this.DefaultLang = localStorage.getItem("lang");
    }else{
      this.DefaultLang='en'
    }
  }

  //#region On Init Method
  ngOnInit(): void {


    //#region Init Variables Scope
    if(this.DefaultLang === 'ar'){

      document.getElementsByTagName('html')[0].setAttribute("dir","rtl");
      this.translate.use(this.DefaultLang);
    }else{
      this.DefaultLang = 'en';
      document.getElementsByTagName('html')[0].setAttribute("dir","ltr");
      this.translate.use(this.DefaultLang);
    }
    //#endregion

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


}
