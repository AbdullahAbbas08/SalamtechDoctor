import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { LoginResponse } from 'src/Models/LoginResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Login } from 'src/Models/Login';
import { LoginService } from 'src/Service/login.service';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('closeModal') closebutton: ElementRef;

  //#region Declare Variables
  LoginForm:FormGroup;
  loginDoctorForm:Login=new Login();
  errorMsg:string
  AuthenticatedUser:LoginResponse=new LoginResponse()
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
          PhoneNumber:['',[Validators.required]],
          Password:['',[Validators.required , Validators.minLength(6)]]
        });
    //#endregion

  }
  //#endregion

  //#region Login Method
  LoginDoctor(){
    this.loginDoctorForm.Phone =(this.LoginForm.controls.PhoneNumber.value).toString();
    this.loginDoctorForm.Password = this.LoginForm.controls.Password.value;
    this.loginService.login(this.loginDoctorForm).subscribe((res)=>{
      this.AuthenticatedUser= res      
      localStorage.setItem('Authorization',this.AuthenticatedUser.Data.Token)
      this.toastr.success("Login Successfully ", 'Successfully');
      this.router.navigateByUrl("/main");
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
  //#endregion


  //#region Get Doctor Profile

  //#endregion

  //#region password Icon Method
  passwordIcon(){
    const password = document.querySelector('#Password');

    // toggle the type attribute
    const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
    password?.setAttribute('type', type);
    // toggle the eye slash icon
    password?.classList.toggle('fa-eye-slash');
  }
  //#endregion

}
