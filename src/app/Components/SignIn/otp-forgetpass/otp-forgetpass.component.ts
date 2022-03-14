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
  useremail:string;
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

    this.useremail = "";
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
// setTimeout(() => {

let userid;
  let body={
    "Email":this.useremail,
    "UserTypeId": 2
  }
  
  this.SignupService.forgetpass(body).subscribe(res=>{
    this.user=res['Data']  
    // code here - -----------------------------
    this.ShowPopup(res['Data'].Code,res['Data'].UserId);
    // end code here ---------------------------
  },
  err=>{
    // document.getElementById('cancelbtn').click();
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
// }, 2000);
    
  }

  ShowPopup(code:any,userid:any){
    Swal.fire({
      title: 'Phone Verification : '+code,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'تحقق',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            "ghjg"
            if (!response.ok) { throw new Error(response.statusText)}
            return response.json()
          })
          .catch(error => { Swal.showValidationMessage(`Request failed : ${error}` )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(code == result.value.login )
        {
          this.toastr.success('Code Success ' , 'Success');
          // this.create(this.CreateUser); 
          this.updatePassword(userid);
        }
        else
        {
          this.ShowPopup(code,userid);
          this.toastr.error('Please make sure that the code sent is correct' , 'Incorrect Code');
        }
      }
    })
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


  updatePassword(userid:any){
   
    Swal.fire({
      title: 'Enter New Password',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let sernderObj = {
          "UserId": userid,
          "Password": result.value.login
        }

        this.SignupService.changepass(sernderObj).subscribe(
          (response)=>{
            this.router.navigateByUrl("/Login");
          },
          (err)=>{
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error,
            })
          }
        )
        // Swal.fire({
        //   title: `${result.value.login}'s avatar`,
        //   imageUrl: result.value.avatar_url
        // })
      }
    })
  }

}