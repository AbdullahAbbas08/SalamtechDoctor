import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { SignupService } from 'src/Service/signup/signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/Service/CreateUser/user.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  @Input() timer;
  @Input() user;
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

  
    //#endregion
    console.log(this.timer);
    console.log(this.SignupService.Phone);
    
    //#region Call Methods
    this.counter();
    //#endregion

    this.getTranslitation()
  }
  //#endregion
  
  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      // console.log(values);
      this.translation =values 
      });
    }
  

  //#region counter interval
  counter() {

    if(this.timer !=0){
      setInterval(() => {
            this.timer--
      }, 1000)
    }


  }

  //#region  ResendCode
  ResendCode() {

  }
  //#endregion

  //#region  Verify Code
  verify() {
    this.SpinnerService.show();
    var NCODE = this.NCODE1.toString() + this.NCODE2.toString() + this.NCODE3.toString() + this.NCODE4.toString();
  //  console.log(NCODE);
   
    if (this.SignupService.ResenderCodeObject.Code == NCODE) {
      // this.router.navigateByUrl("/doctor-profile");
      this.verifyCode=true
       
    // console.log(this.user);
    this.UserService.CreateUser( this.user).subscribe(
      (response)=>{
        // console.log(response.Data.Token);
        this.SpinnerService.hide();
        localStorage.setItem('Authorization',response.Data.Token)
        localStorage.setItem('Name',response.Data.Name);
        let auth=localStorage.getItem('Authorization')        
        setTimeout(() => {
          if(auth){
            // console.log(auth);
            this.router.navigate(["/doctor-profile"]);          
          }
        }, 2000);
        // window.location.reload();
      },
      (err)=>{
        this.SpinnerService.hide();
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
      }
    )
      // document.getElementById('cancelbtn').click();
    }
    else {
      this.SpinnerService.hide();
      this.toastr.error("الكود الذى أدخلته غير صحيح ","خطأ")
    }
  }
  //#endregion

}
