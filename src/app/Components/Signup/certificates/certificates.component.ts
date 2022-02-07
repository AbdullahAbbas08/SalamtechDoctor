import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certificate } from 'src/Models/certificate';
import { CertificateResponse } from 'src/Models/certificateResponse';
import { CertificateService } from 'src/Service/Certificate/certificate.service';
import { LoginService } from 'src/Service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  sendButton:boolean=false
  buttonAdd:boolean=false;
  showImgbox:boolean=false

  submittedCertificate:CertificateResponse

  certificate:Certificate;
  CertificateForm:FormGroup
  imageName:string='Upload Certificate'

  editableCertificate:Certificate

  constructor(private fb:FormBuilder ,private certificateService:CertificateService , private loginService:LoginService) { }

  ngOnInit(): void {


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
        ImageCertificate:['',[Validators.required ]]
      }
    )
    this.getCertificate()

  }
  getCertificate(){
    this.certificateService.GetDoctorCertificate('en').subscribe((res)=>{
      this.submittedCertificate= res as CertificateResponse
      console.log(this.submittedCertificate);
      
      this.resetForm()
    })
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
    const formData = new FormData();

    formData.append('Title',this.CertificateForm.controls.title.value)
    formData.append('Description',this.CertificateForm.controls.Description.value)
    formData.append('TitleAr',this.CertificateForm.controls.titleAr.value)
    formData.append('DescriptionAr',this.CertificateForm.controls.DescriptionAr.value)
    formData.append('Year', +this.CertificateForm.controls.year.value as unknown as Blob)
    formData.append('certificateImage',this.certificate.CertificateUrl)

    this.CreateCertificate('en',formData)
  }


  //#region review AND File FormData image from input file
  CreateCertificate(lang:string,certificate:FormData){
    this.certificateService.CreateCertificate('en',certificate).subscribe((res)=>{
      this.getCertificate()
    },
    (err)=>{
      console.log(err)
    })
  }

  public imagePath: any;
  imgURL: any = "";
  public message: string;

  preview(files:any) {

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }

    this.certificate.CertificateUrl = files[0];
    this.editableCertificate.CertificateUrl=files[0]
    this.imageName=files[0].name
    this.showImgbox=true
    // this.FormDataImage.append('EpisodeIamge', files[0]);
  }
  //#endregion

  //#region Delete Certificate
    DeleteCertificate(id:number){

      Swal.fire({
        title:'Are You Sure You want to delete',
        icon:'warning', 
        showCancelButton:true,
      })
      .then((isConfirmed) => {

        if (isConfirmed) {
           this.certificateService.DeleteCertificate('en',id).subscribe((res)=>{
            this.getCertificate()
            Swal.fire({
              title:"Your file has been deleted!", 
              icon: "success",
            });
        },
        (err)=>{
          console.log(err)
          Swal.fire("An error occur");
        })
         
        } else {
          Swal.fire("Your imaginary file is safe!");
        }
      }); 



      // this.certificateService.DeleteCertificate('en',id).subscribe((res)=>{
      //   this.certificateService.GetDoctorCertificate('en').subscribe((res)=>{
      //     this.submittedCertificate= res as CertificateResponse
      //     console.log(this.submittedCertificate)}
      //   )},
      //   (err)=>{console.log(err)})
      }
  //#endregion


  DeleteImg(){
    this.showImgbox=!this.showImgbox
    this.imageName='Upload Certificate'

  }

  resetForm(){
    this.CertificateForm.reset()
    if(this.imageName !='Upload Certificate'){
      this.DeleteImg()
    }
  }



  Edit(id:number){
    this.editableCertificate= this.submittedCertificate.Data.find((item)=>item.Id==id) as Certificate
    this.sendButton=true
  }

  SaveCertificate(){
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

  UpdateCertificate(lang:string,certificate:FormData){
    this.certificateService.UpdateCertificate('en',certificate).subscribe((res)=>{
      this.certificateService.GetDoctorCertificate('en').subscribe((res)=>{
        this.submittedCertificate= res as CertificateResponse
        this.resetForm()}
      )
    },
    (err)=>{console.log(err)})
  }

 
}
