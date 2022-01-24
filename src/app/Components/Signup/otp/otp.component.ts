import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/Service/signup/signup.service';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  //#region Declare Variables
  // count: number = 4;
  minute: number;
  second: any;
  EnableResendLink: boolean;
  NCODE1: any;
  NCODE2: any;
  NCODE3: any;
  NCODE4: any;
  iterate: number;
  PhoneNumber:any;
  //#endregion

  //#region Constructor
  constructor(private SignupService: SignupService ,private toastr:ToastrService ,private router:Router) { }
  //#endregion

  //#region OnInit Method
  ngOnInit(): void {

    //#region Init Values
    this.EnableResendLink = true;
    this.minute = 0;
    this.second = 0;
    this.PhoneNumber = this.SignupService.Phone;

    if(!isNaN(this.SignupService.ResenderCodeObject.ReSendCounter))
    {
    this.minute = this.SignupService.ResenderCodeObject.ReSendCounter / 60;
    this.second = this.SignupService.ResenderCodeObject.ReSendCounter % 60;
    // this.iterate = 2;
    }
    //#endregion

    //#region Call Methods
    this.counter();
    //#endregion

  }
  //#endregion

  //#region counter interval
  counter() {

    if(this.minute !=0){
      let interval = setInterval(() => {
        if (this.second != 0) {
          this.second--
        } else {
          if (this.minute > 0) {
            this.minute--
            this.second = 59
          } else {
            clearInterval(interval)
            console.log("end");
          }
        }
      }, 1000)
    }


  }

  //#region  ResendCode
  ResendCode() {

  }
  //#endregion

  //#region  Verify Code
  verify() {

    var NCODE = this.NCODE1.toString() + this.NCODE2.toString() + this.NCODE3.toString() + this.NCODE4.toString();
    if (this.SignupService.ResenderCodeObject.Code == NCODE) {
      this.router.navigateByUrl("/signup/doctorinfo");
    }
    else {
      this.toastr.error("الكود الذى أدخلته غير صحيح ","خطأ")
    }
  }
  //#endregion

}
