import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from 'src/Service/signup/signup.service';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  toggle=false;
  param
  translation
  constructor(private signupService:SignupService,  private translateSwal:TranslateSwalsService,private activateroute:ActivatedRoute,
    private router:Router) {
    this.activateroute.paramMap.subscribe(param=>{
      this.param=param.get('id')
    })
   }

   ngOnInit(): void {
    this.getTranslitation()
  }
  //#endregion
  
  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      // console.log(values);
      this.translation =values 
      });
    }

  //#region password Icon Method
passwordIcon(){
  const password = document.getElementById('Pass'); 
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


 changepass(pass){
   let body={
    "UserId": parseInt(this.param),
    "Password": pass
   }
   this.signupService.changepass(body).subscribe(res=>{
     Swal.fire({
      title:this.translation.UpdatedSuccessfully, 
      icon: 'success',  
    })
    this.router.navigateByUrl('/Login')
   },
   err=>{
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
 }

}
