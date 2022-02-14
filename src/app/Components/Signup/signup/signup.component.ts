import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Signup } from 'src/Models/signup';
import { Responsesignup } from 'src/Service/signup/responsesignup';
import { SignupService } from 'src/Service/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //#region  Declare Variables
  signupform : FormGroup ;
  SignUp:Signup = new Signup();
  ErrorMessege:string;
  _Responsesignup:Responsesignup= new Responsesignup();
  direction:any;
  //#endregion

  //#region Constructor
  constructor(private fb:FormBuilder ,
              private SignupService:SignupService ,
              private router:Router,
              private toastr:ToastrService) {

  }
  //#endregion

  //#region OnInit Section
  ngOnInit(): void
  {
    //#region Init Section
    this.ErrorMessege="";
    this.direction = document.getElementsByTagName('html')[0].getAttribute("dir");
    // console.log(this.direction);
    //#endregion

     //#region Sidebar Section
       document.getElementById('Doctorinfo')?.classList.remove('OnClick-Style');
       document.getElementById('Signup')?.classList.add('OnClick-Style');
       //#endregion

     //#region  Register Form Section
     this.signupform = this.fb.group(
       {
           FirstName:['',[Validators.required , Validators.minLength(3)]],
           MiddleName:['',[Validators.minLength(3) , Validators.required]],
           LastName:['',[Validators.minLength(3) , Validators.required]],
           Email:['',[Validators.email , Validators.required]],
           PhoneNumber:['',[Validators.required]],
           Password:['',[Validators.required , Validators.minLength(6)]],
           ConfirmPassword:['',[Validators.required ]],
         });
     //#endregion
   }
  //#endregion

  //#region Submit values
   Submit()
   {
        this.SignUp.Name = this.signupform.controls.FirstName.value  + " " +
                          this.signupform.controls.MiddleName.value + " " +
                          this.signupform.controls.LastName.value;

        this.SignUp.Password = this.signupform.controls.Password.value;
        let ConfirmPassword = this.signupform.controls.ConfirmPassword.value;

       

        if(this.SignUp.Password == ConfirmPassword){
          this.SignUp.Phone = (this.signupform.controls.PhoneNumber.value).toString();
          // this.SignUp.Phone = '2'+this.SignUp.Phone;
          this.SignUp.Email = this.signupform.controls.Email.value;
          this.SignUp.UserTypeId = 2;
  
            let reuslt = this.SignupService.SignUp(this.SignUp).subscribe(
  
                (data)=> {
                  this._Responsesignup.Data = data;
                      this.router.navigateByUrl("/signup/OTP");
                      this.SignupService.ResenderCodeObject = this._Responsesignup.Data["Data"];
                      // console.log(this.SignupService.ResenderCodeObject);
                      this.SignupService.Phone = this.SignUp.Phone;
                    },
                (err)=> {
                  this.ErrorMessege = err.error['Message'];
                      // console.log(err.error['Message']);
                    }
            )
        }
        else{
          this.toastr.error("Confirm Password not Match ","Password Error !")
        }    
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


}
