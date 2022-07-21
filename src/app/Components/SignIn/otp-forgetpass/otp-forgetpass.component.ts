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
  PhoneNumber:any;
  PhoneCheck:boolean=true;
  EmailCheck:boolean=false;



  //#region Constructor
  constructor(private translateSwal:TranslateSwalsService,
               private toastr: ToastrService,
              private UserService:UserService,
              private SpinnerService: NgxSpinnerService,
              private router:Router) {  
               
            }
  //#endregion

  //#region OnInit Method
  ngOnInit(): void {
   
    this.useremail = "";
  }
  //#endregion

  
  ValidProccessemail(){
      this.UserService.ResetPassword({
        "ResetMethod": 1,
        "Phone":this.PhoneNumber ,
        "Email": this.useremail,
        "UserTypeId": 2
      }).subscribe(
        (res)=>{
            this.ShowPopup( res['Data'].Code,res['Data'].UserId);
        },
        (err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error["Message"],
            // footer: '<a href="">Why do I have this issue?</a>'
          })
          
        })
    }

    ValidProccessphone(){
      this.SpinnerService.show();
      this.UserService.ResetPassword({
        "ResetMethod": 2,
        "Phone":this.PhoneNumber ,
        "Email": this.useremail,
        "UserTypeId": 2
      }).subscribe(
        (res)=>{
            this.ShowPopup( res['Data'].Code,res['Data'].UserId);
        },
        (err)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error["Message"],
            // footer: '<a href="">Why do I have this issue?</a>'
          })
         })
         this.SpinnerService.hide();
    }

    onphoneChange(event){
      this.PhoneCheck = true;
      this.EmailCheck = false;
    }
    
    onemailChange(event){
      this.PhoneCheck = false;
      this.EmailCheck = true;
    }

    
    ShowPopup(code,userid){
      Swal.fire({
        title: 'Enter the sent code ',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Confirm',
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
          // console.log(result.value.login);
          
          if( code == result.value.login )
          {
            this.router.navigate(["forget-password/",userid]); 
            this.toastr.success('Code Success ' , 'Success');
           
            // this.create(this.CreateUser); 
          }
          else
          {
            this.ShowPopup(code,userid);
            this.toastr.error('Please make sure that the code sent is correct' , 'Incorrect Code');
          }
        }
      })
    }






}