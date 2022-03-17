import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certificate } from 'src/Models/certificate';
import { CertificateResponse } from 'src/Models/certificateResponse';
import { CertificateService } from 'src/Service/Certificate/certificate.service';
import { LoginService } from 'src/Service/login.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-update-doctor-certificates',
  templateUrl: './update-doctor-certificates.component.html',
  styleUrls: ['./update-doctor-certificates.component.css']
})
export class UpdateDoctorCertificatesComponent implements OnInit {

  sendButton:boolean=false
  buttonAdd:boolean=false;
  showImgbox:boolean=false
  ImageCer:any;
  count:number;

  submittedCertificate:CertificateResponse

  certificate:Certificate;
  CertificateForm:FormGroup
  imageName:string='Upload Certificate'

  editableCertificate:Certificate
  translation;


  constructor(private fb:FormBuilder ,
    private certificateService:CertificateService ,
     private loginService:LoginService,
     private translateSwal:TranslateSwalsService) { }

  ngOnInit(): void {

    this.GetDoctorCertificate();
    //#region Sidebar style
    document.getElementById('Doctorinfo')?.classList.add('OnClick-Style');
    document.getElementById('Signup')?.classList.add('OnClick-Style');
    document.getElementById('Certificates')?.classList.add('OnClick-Style');
    //#endregion

    this.editableCertificate=new Certificate()
    this.certificate=new Certificate()

    this.CertificateForm = this.fb.group(
      {
        title:['',[Validators.required , Validators.minLength(3)]],
        titleAr:['',[Validators.required , Validators.minLength(3)]],
        year:['',[Validators.required ]],
        Description:['',[Validators.required , Validators.minLength(3)]],
        DescriptionAr:['',[Validators.required , Validators.minLength(3)]],
        ImageCertificate:['',[Validators.nullValidator ]]
      }
    )

    this.getTranslitation()
    // console.log(this.editableCertificate);
  }
  //#endregion

  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
       this.translation =values 
      });
    }
  changeStyle()
  {
  //  document.getElementById('Signup')?.classList.remove('OnClick-Style');
  //  document.getElementById('Doctorinfo')?.classList.remove('OnClick-Style');
  //  document.getElementById('Certificates')?.classList.remove('OnClick-Style');
   document.getElementById('LegalDocuments')?.classList.add('OnClick-Style');


  }

  //#region toggle button add certificate
  showAdd(){
    this.buttonAdd=!this.buttonAdd
    this.SubmitCertificate()
  }
  //#endregion

  SubmitCertificate(){
    if(this.ImageCer != null ){
      const formData = new FormData();

      formData.append('Title',this.CertificateForm.controls.title.value)
      formData.append('Description',this.CertificateForm.controls.Description.value)
      formData.append('TitleAr',this.CertificateForm.controls.titleAr.value)
      formData.append('DescriptionAr',this.CertificateForm.controls.DescriptionAr.value)
      formData.append('Year', +this.CertificateForm.controls.year.value as unknown as Blob)
      formData.append('certificateImage',this.ImageCer)
  
      this.CreateCertificate('en',formData)
      this.ImageCer = null
    }
    else
    {
      Swal.fire(
        this.translation.Cancelled,
        "Image Certificate Required",
        'error'
      );
    }
   
  }

  GetDoctorCertificate(){
    this.certificateService.GetDoctorCertificate('en').subscribe((res)=>{
      this.submittedCertificate= res as CertificateResponse
      this.count = this.submittedCertificate.Data.length;
      // console.log(this.count);
      
     
    })
  }

  //#region review AND File FormData image from input file
  CreateCertificate(lang:string,certificate:FormData){
    this.certificateService.CreateCertificate('en',certificate).subscribe((res)=>{
      this.GetDoctorCertificate()
      this.resetForm()
    },
    (err)=>{
      // console.log(err)
      Swal.fire(
        this.translation.Error,
        err.error.Message,
        'error'
      )
    })
  }

  public imagePath: any;
  imgURL: any = "";
  public message: string;

  preview(files:any) {

    if (files.length === 0)
      return;

      if (files[0].size > 3000000)
      {
        Swal.fire(
          this.translation.Error,
          this.translation.imagesize,
          'error'
        )
      this.message = "image size is larger than 3mb.";
      return;
    }
    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = "Only images are supported.";
    //   return;
    // }

    var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }

    this.ImageCer = files[0];
    this.imageName=files[0].name
    this.imgURL = files[0]
    this.showImgbox=true
    this.editableCertificate.CertificateUrl=null;
  }
  //#endregion

  //#region Delete Certificate
    DeleteCertificate(id:number){
      this.GetDoctorCertificate()
      if( this.count >1){
        Swal.fire({
          title:  this.translation.areusure,
          text: this.translation.wontrevert,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.translation.yes,
          cancelButtonText: this.translation.Cancel
        })
        .then((result) => {
  
          if (result.isConfirmed) {
            this.certificateService.DeleteCertificate('en',id).subscribe((res)=>{
              this.certificateService.GetDoctorCertificate('en').subscribe((res)=>{
                this.submittedCertificate= res as CertificateResponse
                // console.log(this.submittedCertificate)
              }
              )
              Swal.fire(
                this.translation.Deleted,
                this.translation.fileDeleted,
                'success'
              )
          },
          (err)=>{
            // console.log(err)
            Swal.fire( this.translation.errocur);
          })
           
          } else {
            Swal.fire(
              this.translation.Cancelled,
              this.translation.filesafe,
              'error'
            );
          }
        }); 
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Warning',
          text: 'It is not possible to delete all required certificates',
        })
      }
    }
  //#endregion


  DeleteImg(){
    this.showImgbox=!this.showImgbox
    this.imageName='Upload Certificate'

  }

  resetForm(){
    this.CertificateForm = this.fb.group(
      {
        title:['',[Validators.required , Validators.minLength(3)]],
        titleAr:['',[Validators.required , Validators.minLength(3)]],
        year:['',[Validators.required ]],
        Description:['',[Validators.required , Validators.minLength(3)]],
        DescriptionAr:['',[Validators.required , Validators.minLength(3)]],
        ImageCertificate:['',[Validators.nullValidator ]]
      }
    )
    this.editableCertificate.CertificateUrl=null;
    this.sendButton = false
    
  }

  Edit(id:number){
    this.GetDoctorCertificate()
    this.editableCertificate= this.submittedCertificate.Data.find((item)=>item.Id==id) as Certificate
    this.sendButton=true
    // console.log(this.editableCertificate);
    
  }

  SaveCertificate(){

    if(this.ImageCer !=null)
    {
      const formData = new FormData();
      formData.append('CertificateId',+this.editableCertificate.Id as unknown as Blob)
      formData.append('Title',this.editableCertificate.Title)
      formData.append('Description',this.editableCertificate.Description)
      formData.append('TitleAr',this.editableCertificate.TitleAr)
      formData.append('DescriptionAr',this.editableCertificate.DescriptionAr)
      formData.append('Year', +this.editableCertificate.Year as unknown as Blob)
      formData.append('certificateImage',this.ImageCer)
      this.UpdateCertificate('en',formData)
    }
    else{
      const formData = new FormData();
      formData.append('CertificateId',+this.editableCertificate.Id as unknown as Blob)
      formData.append('Title',this.editableCertificate.Title)
      formData.append('Description',this.editableCertificate.Description)
      formData.append('TitleAr',this.editableCertificate.TitleAr)
      formData.append('DescriptionAr',this.editableCertificate.DescriptionAr)
      formData.append('Year', +this.editableCertificate.Year as unknown as Blob)
      formData.append('certificateImage',this.editableCertificate.CertificateUrl)
      this.UpdateCertificate('en',formData)
    }
   
  }

  UpdateCertificate(lang:string,certificate:FormData){
    this.certificateService.UpdateCertificate('en',certificate).subscribe((res)=>{
      this.GetDoctorCertificate()
      this.resetForm()
      Swal.fire(
        "Update",
        "updated Sucessfully",
        'success'
      )
    },
    (err)=>{
      // console.log(err)
      Swal.fire(
        this.translation.Error,
        err.error.Message,
        'error'
      )
    })
  }

 
}
