import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdNameList } from 'src/Models/id-name-list';
import { DocumentService } from 'src/Service/Documents/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  //#region Declare variables
  DocumentsForm:FormGroup
  Upload_Image:boolean;
  LegalDocumentList:IdNameList[];
  //#endregion

  //#region Constructor
constructor(
  private fb:FormBuilder ,
  private DocumentService:DocumentService
) { }
//#endregion

  //#region On Init Method
  ngOnInit(): void {

      //#region Init variables
    document.getElementById('Doctorinfo')?.classList.add('OnClick-Style');
    document.getElementById('Signup')?.classList.add('OnClick-Style');
    document.getElementById('Certificates')?.classList.add('OnClick-Style');
    document.getElementById('LegalDocuments')?.classList.add('OnClick-Style');

    this.Upload_Image = false;
    this.LegalDocumentList = [{"Name":'',"Id":0},{"Name":'',"Id":0},{"Name":'',"Id":0}];
    //#endregion

      //#region  Register Form Section
      this.DocumentsForm = this.fb.group(
        {
          NationalIDFront:['',[Validators.required]],
          NationalIDBack:['',[Validators.nullValidator]],
          SyndicateFront:['',[Validators.required]],
          SyndicateBack:['',[Validators.nullValidator]],
          ProfessionCertificate:['',[Validators.required]],
          });
      //#endregion

      //#region Invoke Method's
    this.GetLegalDocument('en');
    //#endregion

    }
//#endregion

  //#region Consume API's



    //#region Legal Document Method
      GetLegalDocument(lang:string)
      {
        this.DocumentService.GetLegalDocument(lang ).subscribe(
          (response)=>{
            this.LegalDocumentList = response.Data;
            // console.log(this.LegalDocumen tList[0].Name)
          },
          (err)=>{ }
        )
      }
      //#endregion

  //#region Doctor Documents
  CreateDoctorDocuments(lang:string , Model:FormData)
  {
    this.DocumentService.CreateDoctorDocuments(lang ,Model ).subscribe(
      (response)=>{
      console.log(response);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  //#endregion

//#endregion

  //#region review AND File FormData image from input file
    public imagePath: any;
    imgFront: any = null  ;
    imgBack: any  = null;
    SyndicateFront:any=null;
    SyndicateBack:any=null;
    ImgCertificate:any=null;
    public message: string;

    preview(files:any , typeImg:number , ID:number) {
      const formData = new FormData();
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
      reader.onload = (_event) =>
      {
        if(typeImg == 1)
        {
          this.imgFront = reader.result;
        }
        if(typeImg == 2)
        {
          this.imgBack = reader.result;
        }
        if(typeImg == 3)
        {
          this.SyndicateFront = reader.result;
        }
        if(typeImg == 4)
        {
          this.SyndicateBack = reader.result;
        }
        if(typeImg == 5)
        {
          this.ImgCertificate = reader.result;
        }
      }
      this.Upload_Image = true;

      formData.append('LegalDocumentTypeId', ID as unknown as Blob);
      formData.append('document',files[0] );
      console.log(formData)
      this.CreateDoctorDocuments('en',formData)
    }
    //#endregion

}
