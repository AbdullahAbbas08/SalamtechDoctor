import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/Models/create-user';
import { UserService } from 'src/Service/CreateUser/user.service';
import { LoginService } from 'src/Service/login.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Signup } from 'src/Models/signup';
import { Responsesignup } from 'src/Service/signup/responsesignup';
import { SignupService } from 'src/Service/signup/signup.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  //#region Declare Variables
  RegisterForm:FormGroup;
  CreateUser:CreateUser = new CreateUser();
  passFormat= true;
  translation;
  SignUp:Signup = new Signup();
  ErrorMessege:string;
  _Responsesignup:Responsesignup= new Responsesignup();
  direction:any;
  Timer
  //#endregion

  //#region constructor
  constructor(private fb:FormBuilder,
              private toastr:ToastrService,
              private router:Router, 
              private SignupService:SignupService ,
              private UserService:UserService,
              private loginService:LoginService,
              private translateSwal:TranslateSwalsService,
              private SpinnerService: NgxSpinnerService) {
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
        Email:['',[Validators.required , Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)]],
        PhoneNumber:['',[Validators.required , Validators.maxLength(11)]], 
        checkboxcont:['',[Validators.required]],
        Password:['',[Validators.required , Validators.minLength(6)]],
        ReEnterPassword:['',[Validators.required , Validators.minLength(6)]  ],
        });
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
  


  isFieldValid(field): boolean {
    return (
      !this.RegisterForm.get(field).valid && this.RegisterForm.get(field).touched
    )
  }



  checkPass(pass , rePass) {
    if(pass === rePass){
      this.passFormat=true
    }
    else{
      this.passFormat=false
     }
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
  
  if(element.checked == false)
    {
      element.checked = false;
      console.log('false');
      
     this.RegisterForm.get('checkboxcont').setValue(element.checked)
    }
  else
   {
    element.checked = true;
    // console.log(true);
    
    this.RegisterForm.get('checkboxcont').setValue(element.checked)
   }

}
//#endregion

  //#region Submit
  // Submit(){
  //   this.SpinnerService.show();
  //   if(this.RegisterForm.controls.Password.value == this.RegisterForm.controls.ReEnterPassword.value && this.RegisterForm.valid && this.RegisterForm.get('checkboxcont').value == true){
  //     console.log(this.RegisterForm.value);
      
  //     let con=this.RegisterForm.get('PhoneNumber').value;
  //     // this.RegisterForm.get('PhoneNumber').setValue(`0${con}`)
      
  //     this.CreateUser.Email = this.RegisterForm.controls.Email.value;
  //     this.CreateUser.Name =  this.RegisterForm.controls.FirstName.value +" "+
  //                             this.RegisterForm.controls.MiddleName.value+" "+
  //                             this.RegisterForm.controls.LastName.value ;
  
  //     this.CreateUser.Password = this.RegisterForm.controls.Password.value;
  //     this.CreateUser.Phone = '0'+this.RegisterForm.controls.PhoneNumber.value;
  //     this.CreateUser.UserTypeId = 2;
  //   this.UserService.CreateUser( this.CreateUser).subscribe(
  //     (response)=>{
  //       // console.log(response.Data.Token);
  //       localStorage.setItem('Authorization',response.Data.Token)
  //       localStorage.setItem('Name',response.Data.Name);
  //       let auth=localStorage.getItem('Authorization')        
  //       setTimeout(() => {
  //         if(auth){
  //           // console.log(auth);
  //           this.SpinnerService.hide();
  //           this.router.navigate(["/doctor-profile"]);          
  //         }
  //       }, 2000);
  //       // window.location.reload();
  //     },
  //     (err)=>{
  //       this.SpinnerService.hide();
  //       Swal.fire({
  //         title:this.translation.Error,
  //         text: err.error.Message,
  //         icon: 'error',
  //         showCancelButton: true,
  //         showConfirmButton:false,
  //         cancelButtonColor:"#f00",
  //         confirmButtonText:this.translation.Ok,
  //         cancelButtonText:this.translation.Ok,
  //         reverseButtons: true
  //       })
  //     }
  //   )
  //   }
  //   else
  //   {
  //     this.SpinnerService.hide();
  //     this.RegisterForm.markAllAsTouched()
  //   }
  // }
  //#endregion

  Submit(){
    this.SpinnerService.show();
    if(this.RegisterForm.controls.Password.value == this.RegisterForm.controls.ReEnterPassword.value && this.RegisterForm.valid && this.RegisterForm.get('checkboxcont').value == true){
      // console.log(this.RegisterForm.value);
      
      let con=this.RegisterForm.get('PhoneNumber').value;
      // this.RegisterForm.get('PhoneNumber').setValue(`0${con}`)
      
      this.CreateUser.Email = this.RegisterForm.controls.Email.value;
      this.CreateUser.Name =  this.RegisterForm.controls.FirstName.value +" "+
                              this.RegisterForm.controls.MiddleName.value+" "+
                              this.RegisterForm.controls.LastName.value ;
  
      this.CreateUser.Password = this.RegisterForm.controls.Password.value;
      this.CreateUser.Phone = '0'+this.RegisterForm.controls.PhoneNumber.value;
      this.CreateUser.UserTypeId = 2;
        this.SignupService.SignUp(this.CreateUser).subscribe(
        (data)=> {
          this.SpinnerService.hide();

          this._Responsesignup.Data = data;
          console.log(data['Data'].ReSendCounter);
          this.Timer=data['Data'].ReSendCounter
          
              // this.router.navigateByUrl("otp");
              this.SignupService.ResenderCodeObject = this._Responsesignup.Data["Data"];
              // console.log(this.SignupService.ResenderCodeObject);
              this.SignupService.Phone = this.SignUp.Phone;
            },
        (err)=> {
              this.SpinnerService.hide();
              this.ErrorMessege = err.error['Message'];
              console.log(err.error['Message']);
            }
    )
    }
    else
    {
      this.SpinnerService.hide();
      this.RegisterForm.markAllAsTouched()
    }
  }

  //#region Get Doctor Profile

  //#endregion

}
