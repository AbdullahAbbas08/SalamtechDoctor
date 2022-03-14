import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignupService } from 'src/Service/signup/signup.service';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  user
  translation;
  emailTyped:string;
 
  constructor(private signupService:SignupService,
    private router:Router,  private translateSwal:TranslateSwalsService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTranslitation()
    this.emailTyped="";
  }
  //#endregion
  
  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      // console.log(values);
      this.translation =values 
      });
    }
  
 
}
