import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/Models/Login';
import { LoginResponse } from 'src/Models/LoginResponse';
import { LoginService } from 'src/Service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  //#region Declare Variables
  LoginForm:FormGroup;
  loginDoctorForm:Login=new Login();
  errorMsg:string
  AuthenticatedUser:LoginResponse=new LoginResponse()
  toggle=false;
  //#endregion


  //#region constructor
  constructor( private loginService:LoginService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router) {
this.loginDoctorForm.UserTypeId=2
}
//#endregion
//#region On Init Method
ngOnInit() {

  //#region  Register Form Section
  this.LoginForm = this.fb.group(
   {
       PhoneNumber:['',[Validators.required  , Validators.minLength(11) ,  Validators.maxLength(12)]],
       Password:['',[Validators.required , Validators.minLength(6)]]
     });
 //#endregion

}
//#endregion


isFieldValid(field): boolean {
 return (
   !this.LoginForm.get(field).valid && this.LoginForm.get(field).touched
 )
}


//#region Login Method
LoginDoctor(){
 if(this.LoginForm.valid){
   this.loginDoctorForm.Phone =(this.LoginForm.controls.PhoneNumber.value).toString();
   this.loginDoctorForm.Password = this.LoginForm.controls.Password.value;
   this.loginService.login(this.loginDoctorForm).subscribe((res)=>{
     this.AuthenticatedUser= res  
    //  console.log(res);
         
     localStorage.setItem('Authorization',this.AuthenticatedUser.Data.Token)
     localStorage.setItem('Name',this.AuthenticatedUser.Data.Name);
     localStorage.setItem("logo",this.AuthenticatedUser.Data.Image);
     this.toastr.success("Login Successfully ", 'Successfully');
     this.router.navigate(["/main"]);
     window.setInterval(() => {
       window.location.reload();
     }, 2000);
   },
   (err)=>{
     Swal.fire({
       title: 'Error !',
       text: err.error.Message,
       icon: 'error',
       showCancelButton: true,
       showConfirmButton:false,
       cancelButtonColor:"#f00",
       confirmButtonText: 'OK',
       cancelButtonText:"OK",
       reverseButtons: true
     })
     
   })
 }
 else{
   this.LoginForm.markAllAsTouched()
 }
}
//#endregion


//#region Get Doctor Profile

//#endregion

//#region password Icon Method
passwordIcon(){
 const password = document.getElementById('Pass');

 // toggle the type attribute
//   password?.getAttribute('type') === 'password' ? 'text' : 'password';
//  password?.setAttribute('type', type);
 // toggle the eye slash icon
//  password?.classList.toggle('fa-eye-slash');
  if(this.toggle==false){
    this.toggle=true ;
    password?.setAttribute('type', 'text')
  }
  else{
    this.toggle=false;
    password?.setAttribute('type', 'password')
  }
}
//#endregion

}