import { Component, Input, OnInit } from '@angular/core';
import { SignupService } from 'src/Service/signup/signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/Service/CreateUser/user.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp-forgetpass',
  templateUrl: './otp-forgetpass.component.html',
  styleUrls: ['./otp-forgetpass.component.css']
})
export class OtpForgetpassComponent implements OnInit {
  @Input() useremail;
  //#region Declare Variables
  // count: number = 4;
   verifyCode=false;
  EnableResendLink: boolean;
  NCODE1: any;
  NCODE2: any;
  NCODE3: any;
  NCODE4: any;
  iterate: number;
  PhoneNumber:any;
  translation;
    //#endregion
    user

  //#region Constructor
  constructor(private SignupService: SignupService ,
              private SpinnerService: NgxSpinnerService,
              private translateSwal:TranslateSwalsService,
              private UserService:UserService,
              private toastr:ToastrService ,
              private router:Router) { }
  //#endregion

  //#region OnInit Method
  ngOnInit(): void {

    //#region Init Values
    this.EnableResendLink = true; 
    this.PhoneNumber = this.SignupService.Phone;

  
  
    this.getTranslitation()
  }
  //#endregion
  
  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      // console.log(values);
      this.translation =values 
      });
    }
  
  checkemail(){
setTimeout(() => {

  let body={
    "Email":this.useremail,
    "UserTypeId": 2
  }
  this.SignupService.forgetpass(body).subscribe(res=>{
    this.user=res['Data']  
  },
  err=>{
    document.getElementById('cancelbtn').click();
     Swal.fire({
      title:this.translation.Error,
      text: err.error.Message,
      icon: 'error',
      showCancelButton: true,
      showConfirmButton:false,
      cancelButtonColor:"#f00",
      confirmButtonText:this.translation.Ok,
      cancelButtonText:this.translation.Ok,
      reverseButtons: true
    })
 
  })
}, 2000);
    
  }


  //#region  Verify Code
  verify() {
    this.SpinnerService.show();
    var NCODE = this.NCODE1.toString() + this.NCODE2.toString() + this.NCODE3.toString() + this.NCODE4.toString();
  //  console.log(NCODE);
   
    if (this.user.Code == NCODE) {
      // this.router.navigateByUrl("/doctor-profile");
      this.verifyCode=true
      this.SpinnerService.hide();
        
      this.router.navigate(['/forget-password' , this.user.UserId])
      document.getElementById('cancelbtn').click();

    }
    else {
      this.SpinnerService.hide();
      document.getElementById('cancelbtn').click();

      this.toastr.error("الكود الذى أدخلته غير صحيح ","خطأ")
    }
  }
  //#endregion

}