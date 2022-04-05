import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmrService } from 'src/Service/emr/emr.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-emr-profile',
  templateUrl: './emr-profile.component.html',
  styleUrls: ['./emr-profile.component.css']
})
export class EmrProfileComponent implements OnInit {
  id; //patientid
  appointmentID;
  data=[];
  MedicalType ;
  medicalImg;
  medicals=[]
  profileHistory;
  profiledetails;
  imageDoc
 ImgeURL = environment.ImagesURL;
 translation;
  formData = new FormData();

  constructor(private route:ActivatedRoute ,
     private emrService : EmrService ,
     private lookupService:LookupsService,
     private translateSwal:TranslateSwalsService,
     private SpinnerService: NgxSpinnerService
     ) { 
     this.route.paramMap.subscribe(param=>{
      this.route.queryParamMap.subscribe(qparam=>{
        this.appointmentID=qparam.get('appointment_id');
        this.emrService.appointmentId.next(this.appointmentID)  
      })
      this.id=param.get('ID');
      this.GetEmrHistory(this.id)
      this.emrService.patientId.next(this.id)  
    })
  }

  ngOnInit(): void {

    //#region Init Values
    document.getElementById('PatientProfile')?.classList.remove('visited-appointemt-component');
    document.getElementById('EMRProfile')?.classList.add('visited-appointemt-component');
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


  getMedicalTYpe(id){   
   let body={
      medicalType:null,
      medicalimg:null
    } 
    if(id==1){
      body.medicalType="Clinic Appointment"
      body.medicalimg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==2){
       body.medicalType= "Home visit"
      body.medicalimg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==3){
      body.medicalType=  "Video appointment"
      body.medicalimg="../../../../../../assets/img/medical-type/video.png"
    }
    else if(id==4){
       body.medicalType= "Call appointment"
      body.medicalimg="../../../../../../assets/img/medical-type/call.png"
    }
    else if(id==5){
       body.medicalType= "Chat appointment"
     body.medicalimg="../../../../../../assets/img/medical-type/chat.png"
    }
    return body
  }

  GetEmrHistory(id){
    this.SpinnerService.show();
    this.emrService.GetEmrHistory(id).subscribe(res=>{
      this.profileHistory= res.Data;
      this.SpinnerService.hide();
      this.profileHistory.map(item=>{
        
        this.medicals.push(this.getMedicalTYpe(item.MedicalExaminationTypeId))
      })
      // console.log( "------",this.medicals);
      // console.log(this.profileHistory);
      
    })
  }

  GetEmrDetails(id){
    this.SpinnerService.show();
    this.emrService.GetEmrDetails(id).subscribe(res=>{
      this.profiledetails= res.Data;   
      this.SpinnerService.hide();
      // console.log(this.profiledetails);
      
      
    })
  }


  // 3 functions post --------------------------------


  postEmretails(title , description){
    this.SpinnerService.show();
   let body ={
    "Title" : title ,
    "Description" : description,
    "AppointmentId" : parseInt(this.appointmentID)
  }
  this.emrService.PostEmrDetails(body).subscribe(res=>{
    // console.log(res);
    this.GetEmrHistory(this.id)
    this.SpinnerService.hide();
  }, 
  err=>{
    // console.log(err);
    this.GetEmrHistory(this.id)
    this.SpinnerService.hide();
  })
  }
  postEmrInstructions(instructions ){
    this.SpinnerService.show();
    let body ={
     "Instructions" : instructions , 
     "AppointmentId" : parseInt(this.appointmentID)
   }
   this.emrService.PostEmrInstructions(body).subscribe(res=>{
    //  console.log(res);
     this.GetEmrHistory(this.id)
     this.SpinnerService.hide();
   }, 
   err=>{
    //  console.log(err);
     this.GetEmrHistory(this.id)
     this.SpinnerService.hide();
   })
   }


   public message: string;

   preview(files:any ) { 
     
    this.SpinnerService.show();
    
     if (files.length === 0)
       return ;

       if (files[0].size / 1024 / 1024 >= 5)
       {
         this.SpinnerService.hide();
         Swal.fire(
           'Error!',
           'File size should not be more than 5 MB',
           'error'
         )
         files = null
       this.message = "File size should not be more than 5 MB.";
       return;
     }
     this.SpinnerService.hide();
    //  var mimeType = files[0].type;
    //  if (mimeType.match(/image\/*/) == null) {
    //    this.message = "Only images are supported.";
    //    return ;
    //  }
     var reader = new FileReader();
     reader.readAsDataURL(files[0]);
    
     this.formData.append('document',files[0] );
     this.formData.append('AppointmentId',  this.appointmentID  );
 
    //  this.PostEmrDocs(formData ) 

   }

   PostEmrDocs(){ 
    
    if(this.formData.has("document") && this.formData.has("AppointmentId") ){
      this.SpinnerService.show();
      this.emrService.PostEmrDocs(this.formData).subscribe(res=>{
        // console.log(res);
        this.GetEmrHistory(this.id)
        this.SpinnerService.hide();
      }, 
      err=>{
        // console.log(err);
        this.GetEmrHistory(this.id)
        this.SpinnerService.hide();
        Swal.fire(
          this.translation.Error,
          err.error.Message,
          'error'
        )
      })
    }
    else
    {
      Swal.fire(
        this.translation.Error,
        "Invalid Data Please try again",
        'error'
      )
    }
   }


}
