import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PatientItem } from 'src/Models/patient-item';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';

@Component({
  selector: 'app-current-appointment',
  templateUrl: './current-appointment.component.html',
  styleUrls: ['./current-appointment.component.css']
})
export class CurrentAppointmentComponent implements OnInit {

  //#region Decalre Variables
  IamgeURL:string;
  p:number = 1;
  PatientList:PatientItem[];
  searchResults;
  MedicalType =[];
  medicalImg=[]; 
  search:boolean=false
  //#endregion

  //#region constructor
  constructor(private AppointmentService:AppointmentService,private router:Router) { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {
    //#region  Init Values
    this.IamgeURL = environment.ImagesURL;
    document.getElementById('Current')?.classList.add('visited-appointemt-component');
    document.getElementById('History')?.classList.remove('visited-appointemt-component');
    //#endregion
  
    //#region Invoke Methods
    // this.GetCurrentDoctorAppointment(10,1 );
    //#endregion

    // subscribe on search data
   this.AppointmentService.Result.subscribe(res=>{
    if(res){
      this.searchResults=res
      this.GetCurrentDoctorAppointment(10,1 , this.search=true);
    }
    else{
    this.GetCurrentDoctorAppointment(10,1 );

    }
   })

  }
  //#endregion

//#region Consume API's

  //#region Get Current Doctor Appointment
  GetCurrentDoctorAppointment(MaxResultCount:number,SkipCount:number ,  search?){
    // this.AppointmentService.GetCurrentDoctorAppointment(MaxResultCount,SkipCount).subscribe(
    if(!search){
      this.AppointmentService.GetCurrentDoctorAppointment(MaxResultCount,SkipCount).subscribe(
        (response)=>{
           this.PatientList = response.Data.Items;
           let re = /\*/gi;
           
           this.PatientList.forEach(element => {
              element.PatientName = element.PatientName.replace(re, " ");
              let s= (element.PatientName.split(" ", 2)).toString();
              element.PatientName = (s.replace(","," "));
          });
          console.log("data : ",response.Data);
  
          this.PatientList.map(item=>{
            if(item.MedicalExaminationTypeId==1){
              this.MedicalType.push("Clinic Appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/location.png")
            }
            else if(item.MedicalExaminationTypeId==2){
              this.MedicalType.push("Home visit")
              this.medicalImg.push("../../../../../../assets/img/medical-type/location.png")
            }
            else if(item.MedicalExaminationTypeId==3){
              this.MedicalType.push("Video appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/video.png")
            }
            else if(item.MedicalExaminationTypeId==4){
              this.MedicalType.push("Call appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/call.png")
            }
            else if(item.MedicalExaminationTypeId==5){
              this.MedicalType.push("Chat appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/chat.png")
            } 
            
            
          })
        },
        (err)=>{
        })
        if(search){
          console.log(this.PatientList);
          
        }
    }
  }
  //#endregion

//#endregion

  //#region EmrProfile Method
  EmrProfile(ID:number , appId){
    this.router.navigate(['/main/emr',ID], { queryParams: {appointment_id : appId} 
  })
  }
  //#endregion
}
