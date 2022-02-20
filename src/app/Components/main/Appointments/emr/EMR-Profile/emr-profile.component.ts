import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmrService } from 'src/Service/emr/emr.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';

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
  profileHistory;
  profiledetails;
  imageDoc
 ImgeURL = environment.ImagesURL;
 translation;

  constructor(private route:ActivatedRoute ,
     private emrService : EmrService ,
     private lookupService:LookupsService,
     private translateSwal:TranslateSwalsService
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
      console.log(values);
      this.translation =values 
      });
    }


  getMedicalTYpe(id){    
    if(id==1){
      this.MedicalType="Clinic Appointment"
      this.medicalImg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==2){
      this.MedicalType= "Home visit"
      this.medicalImg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==3){
      this.MedicalType=  "Video appointment"
      this.medicalImg="../../../../../../assets/img/medical-type/video.png"
    }
    else if(id==4){
      this.MedicalType= "Call appointment"
      this.medicalImg="../../../../../../assets/img/medical-type/call.png"
    }
    else if(id==5){
      this.MedicalType= "Chat appointment"
      this.medicalImg="../../../../../../assets/img/medical-type/chat.png"
    }
  }

  GetEmrHistory(id){
    this.emrService.GetEmrHistory(id).subscribe(res=>{
      this.profileHistory= res.Data;
      console.log(this.profileHistory);
      this.profileHistory.map(res=>{
        // this.GetEmrDetails(res.AppointmentId)
        // this.getMedicalTYpe(res.MedicalExaminationTypeId)
      })
    })
  }

  GetEmrDetails(id){
    this.emrService.GetEmrDetails(id).subscribe(res=>{
      this.profiledetails= res.Data;   
      // console.log(this.profiledetails);
         
    })
  }


  // 3 functions post --------------------------------


  postEmretails(title , description){
   let body ={
    "Title" : title ,
    "Description" : description,
    "AppointmentId" : parseInt(this.appointmentID)
  }
  this.emrService.PostEmrDetails(body).subscribe(res=>{
    // console.log(res);
    this.GetEmrHistory(this.id)
  }, 
  err=>{
    // console.log(err);
    this.GetEmrHistory(this.id)
  })
  }
  postEmrInstructions(instructions ){
    let body ={
     "Instructions" : instructions , 
     "AppointmentId" : parseInt(this.appointmentID)
   }
   this.emrService.PostEmrInstructions(body).subscribe(res=>{
    //  console.log(res);
     this.GetEmrHistory(this.id)

   }, 
   err=>{
    //  console.log(err);
     this.GetEmrHistory(this.id)
   })
   }


   public message: string;

   preview(files:any ) { 
     
     const formData = new FormData();
     if (files.length === 0)
       return ;

       if (files[0].size > 2000000)
       {
       this.message = "image size is larger than 2mb.";
       Swal.fire(
        this.translation.Error,
        this.translation.imagesize2mb,
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
    
     formData.append('document',files[0] );
     formData.append('AppointmentId',  this.appointmentID  );
 
     this.PostEmrDocs(formData ) 

   }

   PostEmrDocs(formData :FormData ){ 
    
    this.emrService.PostEmrDocs(formData).subscribe(res=>{
      // console.log(res);
      this.GetEmrHistory(this.id)
    }, 
    err=>{
      // console.log(err);
      this.GetEmrHistory(this.id)
    })
   }


}
