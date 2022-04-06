import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  DefaultLang:string |null;

  constructor(private translate:TranslateService) { 
    if(localStorage.getItem("lang") !=null){
      this.DefaultLang = localStorage.getItem("lang");
    }else{
      this.DefaultLang='en'
    }
  }

  ngOnInit(): void {
    if(this.DefaultLang === 'ar'){

      document.getElementsByTagName('html')[0].setAttribute("dir","rtl");
      this.translate.use(this.DefaultLang);
    }else{
      this.DefaultLang = 'en';
      document.getElementsByTagName('html')[0].setAttribute("dir","ltr");
      this.translate.use(this.DefaultLang);
    }
  }

}
