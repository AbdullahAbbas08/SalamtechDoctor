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
        Email:['aaa@aaa.cpm',[Validators.required]],
        PhoneNumber:['',[Validators.required]],
        checkboxcont:['',[Validators.required]],
        Password:['',[Validators.required , Validators.minLength(6)]],
        ReEnterPassword:['',[Validators.required , Validators.minLength(6)]],
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

    this.CreateUser.Email = this.RegisterForm.controls.Email.value;
    this.CreateUser.Name =  this.RegisterForm.controls.FirstName.value +" "+
                            this.RegisterForm.controls.MiddleName.value+" "+
                            this.RegisterForm.controls.LastName.value ;

    this.CreateUser.Password = this.RegisterForm.controls.Password.value;
    this.CreateUser.Phone = this.RegisterForm.controls.PhoneNumber.value;
    
    if(this.RegisterForm.controls.Password.value == this.RegisterForm.controls.ReEnterPassword.value){
      this.CreateUser.UserTypeId = 2;
    this.UserService.CreateUser( this.CreateUser).subscribe(
      (response)=>{
        console.log(response);
        localStorage.setItem('Authorization',response.Data.Token)
        this.GetDoctorProfile();

        this.router.navigate(["/main"]);
        window.location.reload();
      },
      (err)=>{
        
      }
    )
    }
    else
    {
      this.toastr.error("Password and Confirm Password not Match","Error !")
    }
  }
  //#endregion

  //#region Get Doctor Profile
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
  //#endregion

}
