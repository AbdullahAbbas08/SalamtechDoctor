import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdNameList } from 'src/Models/id-name-list';
import { DocumentService } from 'src/Service/Documents/document.service';
import { LoginService } from 'src/Service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-doctor-docs',
  templateUrl: './update-doctor-docs.component.html',
  styleUrls: ['./update-doctor-docs.component.css']
})
export class UpdateDoctorDocsComponent implements OnInit {

 
  //#region Declare variables
  DocumentsForm:FormGroup
  // Upload_Image:boolean;
  LegalDocumentList;
  Documents;
  //#endregion

  //#region Constructor
constructor(
  private fb:FormBuilder ,
  private DocumentService:DocumentService,
  private loginService:LoginService,
  private router:Router
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

    }
//#endregion

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

            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
      
              if (result.isConfirmed) {
                this.DocumentService.DeleteDocuments(lang , id).subscribe((res)=>{
                  this.GetDocuments('en')
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
              },
              (err)=>{
                // console.log(err)
                Swal.fire("An error occur");
              })
               
              } else {
                Swal.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
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
      
      if (files[0].size > 3000000)
      {
        Swal.fire(
          'Error!',
          'image size is larger than 3mb',
          'error'
        )
      this.message = "image size is larger than 3mb.";
      return;
    }
      const formData = new FormData();
      if (files.length === 0)
        return ;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return ;
      }
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
     
      formData.append('LegalDocumentTypeId', id );
      formData.append('document',files[0] );
       this.CreateDoctorDocuments('en',formData)
      this.GetDocuments('en')

    }
    //#endregion


    next(){

      
      
      Swal.fire({
        title: 'Great',
        text: "Your profile has updated successfully",
        icon: 'success',
      }).then((result) => {
          this.router.navigate(['/main'])
      })
    }

}
