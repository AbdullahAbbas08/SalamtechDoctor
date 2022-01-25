import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/Models/Login';
import { LoginResponse } from 'src/Models/LoginResponse';
import { LoginService } from 'src/Service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  //#region Declare Variables
  LoginForm:FormGroup;
  LoginObj:Login;
  AuthenticatedUser:LoginResponse=new LoginResponse()
  //#endregion

  //#region constructor
  constructor(private fb:FormBuilder,
              private loginService:LoginService,
              private toastr:ToastrService,
              private router:Router) {
  }
  //#endregion

  //#region On Init Method
  ngOnInit() {

    //#region  Init Values
    this.LoginObj = {"Phone":"","Password":"","UserTypeId":2};
    //#endregion

     //#region  Register Form Section
     this.LoginForm = this.fb.group(
      {
        PhoneNumber:['',[Validators.required,Validators.minLength(10)]],
        Password:['',[Validators.required , Validators.minLength(6)]]
      });
    //#endregion

  }
  //#endregion

    //#region Toggle Password Method
    passwordIcon(id:string){
      const password = document.querySelector('#'+id);

      // toggle the type attribute
      const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
      password?.setAttribute('type', type);
      // toggle the eye slash icon
      password?.classList.toggle('fa-eye-slash');
    }
    //#endregion


    //#region Consume API's

      //#region Login
      Login(){
        this.LoginObj.Phone ="0"+ (this.LoginForm.controls.PhoneNumber.value).toString();
        this.LoginObj.Password = (this.LoginForm.controls.Password.value).toString();
       
    
        this.loginService.login(this.LoginObj).subscribe((res)=>{
          console.log(res);
          
          // this.buttonEnable=true;
          this.AuthenticatedUser= res
          localStorage.setItem('Authorization',this.AuthenticatedUser.Data.Token)
          this.toastr.success("Login Successfully ", 'Successfully');
          this.router.navigateByUrl("dashboard");
          window.setInterval(() => {
            window.location.reload();
          }, 2000);
        },
        (err)=>{
          console.log(err)
          // this.toastr.success("", 'Errors...!');
        })
      }
      //#endregion

    //#endregion
  }
