import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/Service/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  
  constructor(private router:Router , private loginService:LoginService) { }

  ngOnInit(): void {
    this.GetDoctorProfile()
  }

  RemoveAuth(){
    localStorage.removeItem('Authorization')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    this.router.navigate(['/Login']);
    window.location.reload();
  }

    //  collapse navbar

    navBarTogglerIsVisible() {
      return this.navbarToggler.nativeElement.offsetParent !== null;
    }
  
    collapseNav() {
      if (this.navBarTogglerIsVisible()) {
        this.navbarToggler.nativeElement.click();
        
      }
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
