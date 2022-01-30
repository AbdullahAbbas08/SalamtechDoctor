import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/Models/create-user';
import { UserService } from 'src/Service/CreateUser/user.service';
import { LoginService } from 'src/Service/login.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  //#region Declare Variables
  RegisterForm:FormGroup;
  CreateUser:CreateUser = new CreateUser();
  //#endregion

  //#region constructor
  constructor(private fb:FormBuilder,
              private toastr:ToastrService,
              private router:Router,
              private UserService:UserService,
              private loginService:LoginService,) {
  }
  //#endregion

  //#region On Init Method
  ngOnInit() {


     //#region  Register Form Section
     this.RegisterForm = this.fb.group(
      {
        FirstName:['',[Validators.required]],
        MiddleName:['',[Validators.required]],
        LastName:['',[Validators.required]],
        Email:['',[Validators.required , Validators.email]],
        PhoneNumber:['',[Validators.required]],
        checkboxcont:['',[Validators.required]],
        Password:['',[Validators.required , Validators.minLength(6)]],
        ReEnterPassword:['',[Validators.required , Validators.minLength(6)]],
        });
    //#endregion

  }
  //#endregion


  isFieldValid(field): boolean {
    return (
      !this.RegisterForm.get(field).valid && this.RegisterForm.get(field).touched
    )
  }









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

    //#region  Check input Method
Checkinput(){
  var element = <HTMLInputElement> document.getElementById('checkboxTermsConditions');
  
  if(element.checked == true)
    element.checked = false;
  else
    element.checked = true;
}
//#endregion

  //#region Submit
  Submit(){

    
    if(this.RegisterForm.controls.Password.value == this.RegisterForm.controls.ReEnterPassword.value && this.RegisterForm.valid){
      this.CreateUser.Email = this.RegisterForm.controls.Email.value;
      this.CreateUser.Name =  this.RegisterForm.controls.FirstName.value +" "+
                              this.RegisterForm.controls.MiddleName.value+" "+
                              this.RegisterForm.controls.LastName.value ;
  
      this.CreateUser.Password = this.RegisterForm.controls.Password.value;
      this.CreateUser.Phone = this.RegisterForm.controls.PhoneNumber.value;
      this.CreateUser.UserTypeId = 2;
    this.UserService.CreateUser( this.CreateUser).subscribe(
      (response)=>{
        // console.log(response);
        localStorage.setItem('Authorization',response.Data.Token)
        // this.GetDoctorProfile();
        let auth=localStorage.getItem('Authorization')        
        if(auth){
          this.router.navigate(["/doctor-profile"]);
        }
        // window.location.reload();
      },
      (err)=>{
        console.log(err)
      }
    )
    }
    else
    {
      this.RegisterForm.markAllAsTouched()
    }
  }
  //#endregion

  //#region Get Doctor Profile

  //#endregion

}
