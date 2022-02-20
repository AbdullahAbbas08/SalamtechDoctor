import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdNameList } from 'src/Models/id-name-list';
import { DocumentService } from 'src/Service/Documents/document.service';
import { LoginService } from 'src/Service/login.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  //#region Declare variables
  DocumentsForm:FormGroup
  // Upload_Image:boolean;
  LegalDocumentList;
  Documents;
  translation;

  //#endregion

  //#region Constructor
constructor(
  private fb:FormBuilder ,
  private DocumentService:DocumentService,
  private loginService:LoginService,
  private router:Router,
  private translateSwal:TranslateSwalsService
) { }
//#endregion

  //#region On Init Method
  ngOnInit(): void {
      //#region Init variables
    document.getElementById('Doctorinfo')?.classList.add('OnClick-Style');
    document.getElementById('Signup')?.classList.add('OnClick-Style');
    document.getElementById('Certificates')?.classList.add('OnClick-Style');
    document.getElementById('LegalDocuments')?.classList.add('OnClick-Style');



      //#region Invoke Method's
    this.GetLegalDocument('en');
    this.GetDocuments('en')
    //#endregion
    this.getTranslitation()
  }
  //#endregion

  getTranslitation()  {
    this.translateSwal.Translitation().subscribe((values) => {
      console.log(values);
      this.translation =values 
      });
    }


  //#region Consume API's



    //#region Legal Document Method
      GetLegalDocument(lang:string)
      {
        this.DocumentService.GetLegalDocument(lang ).subscribe(
          (response)=>{
            this.LegalDocumentList = response.Data;
            // console.log(this.LegalDocumentList)
          },
          (err)=>{ }
        )
      }
      //#endregion

         

         //#region  Document Method
         GetDocuments(lang:string)
         {
           this.DocumentService.GetDocuments(lang ).subscribe(
             (response)=>{
               this.Documents = response.Data;
              //  console.log(this.Documents)
             },
             (err)=>{ }
           )
         }
         //#endregion

          //#region delete Document Method
          DeleteDocument(lang:string , id)
          {
            // console.log(id);
            
           

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
                this.DocumentService.DeleteDocuments(lang , id).subscribe((res)=>{
                  this.GetDocuments('en')
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
          //#endregion


  //#region Doctor Documents
  CreateDoctorDocuments(lang:string , Model:FormData)
  {
    this.DocumentService.CreateDoctorDocuments(lang ,Model ).subscribe(
      (response)=>{
      // console.log(response);
      this. GetLegalDocument('en')
      this.GetDocuments('en')
      },
      (err)=>{
        // console.log(err);
        this.GetDocuments('en')
      }
    )
  }
  //#endregion

//#endregion

  //#region review AND File FormData image from input file
    public message: string;

    preview(files:any  , id) {
      // console.log(id);
      // console.log(files);
      
      
      const formData = new FormData();
      if (files.length === 0)
       { return ;
       }

        if (files[0].size > 3000000)
        {
        this.message = "image size is larger than 3mb.";
        Swal.fire(
          this.translation.Error,
          this.translation.imagesize,
          'error'
        )
        return;
      }

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return ;
      }
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
     
      formData.append('LegalDocumentTypeId', id );
      formData.append('document',files[0] );
      // console.log(formData)
      this.CreateDoctorDocuments('en',formData)
      this.GetDocuments('en')

    }
    //#endregion


    next(){

      if(this.Documents.length>2){
        Swal.fire({
          title: this.translation.Great,
        text: this.translation.welcome,
        icon: 'success',
          showCancelButton: true,
          confirmButtonText: this.translation.Done,
          cancelButtonText: this.translation.AddClinic,
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/main'])
          } else   {
            this.router.navigate(['/clinic'])
          }
        })
      }
      else{
        Swal.fire({
          title:  this.translation.Error,
          text:  this.translation.AddDocs,
          icon: 'warning',
        })
      }
      }

}
