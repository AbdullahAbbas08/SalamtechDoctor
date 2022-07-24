import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdNameList } from 'src/Models/id-name-list';
import { DocumentService } from 'src/Service/Documents/document.service';
import { LoginService } from 'src/Service/login.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

 
  //#region Declare variables
  DocumentsForm:FormGroup
  // Upload_Image:boolean;
  LegalDocumentList :any[]=[];
  Documents:any[]=[];
  translation;
  idDocs=null;
  proffDocs=null;
  count:number
  url:string
  Input_Documents:{[Id:number]:{url:string,id:number}} = {}
  image_path:string = environment.ImagesURL ;
  idDocument:number=-1;
  Doc_id_To_Delete = -1;
  //#endregion

  //#region Constructor
constructor(
  private fb:FormBuilder ,
  private DocumentService:DocumentService,
  private loginService:LoginService,
  private router:Router,
  private translateSwal:TranslateSwalsService,
  private SpinnerService: NgxSpinnerService
) { }
//#endregion

  //#region On Init Method
  ngOnInit(): void {
    this.url = environment.ImagesURL
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
       this.translation =values 
      });
    }



    //#region Legal Document Method
      GetLegalDocument(lang:string)
      {
        this.DocumentService.GetLegalDocument(lang ).subscribe(
          (response)=>{
            this.LegalDocumentList = response.Data;            
            // console.log("LegalDocumentList : ",this.LegalDocumentList)
          },
          (err)=>{ }
        )
      }
      //#endregion

      DocumentExist(id:number):boolean{
        // console.log(this.image_path+this.Input_Documents[id]);
        // let res = this.Documents.filter(x=>x.LegalDocumentTypeId == id)
        // return res.length > 0 ?true:false;
        // console.log(id);
        
        return this.Documents.find(x=>x.LegalDocumentTypeId == id);
      }
     

         //#region  Document Method
         GetDocuments(lang:string)
         {
           this.DocumentService.GetDocuments(lang ).subscribe(
             (response)=>{
               this.Documents = response.Data;
                // console.log("xxx : ",response.Data)

                response.Data.forEach(element => {
                  this.Input_Documents[element.LegalDocumentTypeId] ={url:element.DocumentUrl , id:element.Id} ;
                // console.log(this.Input_Documents[element.LegalDocumentTypeId]);
                
                });
              //  this.count = response.Data.length
              //  this.Documents.map(item=>{
              //    if(item.LegalDocumentTypeId == 1){
              //      this.idDocs=item                   
              //    }
              //    if(item.LegalDocumentTypeId == 2){
              //     this.proffDocs=item
              //     // console.log(this.proffDocs);
                  
              //   }
              //  })
             },
             (err)=>{ }
           )
         }
         //#endregion

         DeleteDocumentToUpdate(id:number){
          this.SpinnerService.show();
          this.DocumentService.DeleteDocuments( "",id).subscribe((res)=>{        
          // console.log("success");
          
        },
        (err)=>{
          // console.log("failed");
        })
        this.SpinnerService.hide();
         }


          //#region delete Document Method
          DeleteDocument( id,LegalDocumentTypeId:any)
          {
            let count = this.Documents.filter(c=>c["LegalDocumentTypeId"] == LegalDocumentTypeId);
            // console.log( count.length > 1);
            
            if( count.length > 1 ){
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
                  this.DocumentService.DeleteDocuments( "",id).subscribe((res)=>{
                   
                    Swal.fire(
                      this.translation.Deleted,
                      this.translation.fileDeleted,
                      'success'
                    )
                    this.GetDocuments('en')
                    window.location.reload();
                },
                (err)=>{
                  this.GetDocuments('en')
  
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
            }else
            {
              Swal.fire({
                icon: 'error',
                title: 'Warning',
                text: 'It is not possible to delete all required Documents',
              })
            }

          
           
          }
          //#endregion


  //#region Doctor Documents
  CreateDoctorDocuments(lang:string , Model:FormData)
  {
    
    this.DocumentService.CreateDoctorDocuments(lang ,Model ).subscribe(
      (response)=>{
      // console.log("create : ",response);
      // this. GetLegalDocument('en')
      this.GetLegalDocument('en')
      window.location.reload();
      },
      (err)=>{
        // console.log(err);
        this.GetDocuments('en')
        Swal.fire(
          this.translation.Error,
          err.error.Message,
          'error'
        )
      }
    )
  }
  //#endregion

//#endregion

  //#region review AND File FormData image from input file
    public message: string;
    counter = 1;
    preview(event) { 
     
     if(this.Doc_id_To_Delete)
     this.DeleteDocumentToUpdate(this.Doc_id_To_Delete);
      const files:File = event.target.files[0];      
      if (files.size / 1024 / 1024 >= 5)
      {
        Swal.fire(
          'Error!',
          'File size should not be more than 5 MB',
          'error'
        )
        // files = null
      this.message = "File size should not be more than 5 MB.";
      return;
    }
      const formData = new FormData();
      if (files.size === 0)
        return ;

      var mimeType = files.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return ;
      }
      var reader = new FileReader();
      reader.readAsDataURL(files);
     
      formData.append('LegalDocumentTypeId',  this.idDocument as unknown as Blob );
      formData.append('document',files );
       this.CreateDoctorDocuments('en',formData)
      // this.GetDocuments('en')      
     

    }
    //#endregion


    next(){
 
      Swal.fire({
        title: this.translation.Great,
        text: this.translation.UpdatedSuccessfully,
        icon: 'success',
      }).then((result) => {
          this.router.navigate(['/main'])
      })
    }


    setidDocument(DocTypeId:number,id:any){
      this.idDocument = DocTypeId;
      this.Doc_id_To_Delete = id;
     }
   

}
