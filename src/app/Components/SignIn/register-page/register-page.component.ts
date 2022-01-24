import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  //#region Declare Variables
  LoginForm:FormGroup;
  //#endregion

  //#region constructor
  constructor(private fb:FormBuilder,
              private toastr:ToastrService,
              private router:Router) {
  }
  //#endregion

  //#region On Init Method
  ngOnInit() {

     //#region  Register Form Section
     this.LoginForm = this.fb.group(
      {
          // PhoneNumber:['',[Validators.required]],
          // Password:['',[Validators.required , Validators.minLength(6)]]
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
}
