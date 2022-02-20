import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PatientItem } from 'src/Models/patient-item';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';
import Swal from 'sweetalert2';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  MedicalType =[];
  medicalImg=[];
  actionImg=[] 
  actions=[]
  translation;

   //#endregion

  //#region constructor
  constructor(private AppointmentService:AppointmentService,
    private router:Router,
    private translateSwal:TranslateSwalsService,
    private SpinnerService: NgxSpinnerService) { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {
    //#region  Init Values
    this.IamgeURL = environment.ImagesURL;
    document.getElementById('Current')?.classList.add('visited-appointemt-component');
    document.getElementById('History')?.classList.remove('visited-appointemt-component');
    document.getElementById('Filter')?.classList.remove('visited-appointemt-component');
    //#endregion
  
    //#region Invoke Methods
    this.GetCurrentDoctorAppointment(10,0 );
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

//#region Consume API's

  //#region Get Current Doctor Appointment
  GetCurrentDoctorAppointment(MaxResultCount:number,SkipCount:number ){
    // this.AppointmentService.GetCurrentDoctorAppointment(MaxResultCount,SkipCount).subscribe(
      this.SpinnerService.show();
 
      this.AppointmentService.GetCurrentDoctorAppointment(MaxResultCount,SkipCount).subscribe(
        (response)=>{
          // console.log(response);
          this.SpinnerService.hide();
          
           this.PatientList = response.Data.Items;
           let re = /\*/gi;
           
           this.PatientList.forEach(element => {
              element.PatientName = element.PatientName.replace(re, " ");
              let s= (element.PatientName.split(" ", 2)).toString();
              element.PatientName = (s.replace(","," "));
          });
          // console.log("data : ",response.Data);
  
          this.PatientList.map(item=>{
            if(item.MedicalExaminationTypeId==1){
              this.MedicalType.push("Clinic Appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/location.png")
              this.actionImg.push("../../../../../../assets/img/medical-type/icons-white/loc.png")
              this.actions.push('Location')
            }
            else if(item.MedicalExaminationTypeId==2){
              this.MedicalType.push("Home visit")
              this.medicalImg.push("../../../../../../assets/img/medical-type/location.png")
              this.actionImg.push("../../../../../../assets/img/medical-type/icons-white/loc.png")
              this.actions.push('Location')
            }
            else if(item.MedicalExaminationTypeId==3){
              this.MedicalType.push("Video appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/video.png")
              this.actionImg.push("../../../../../../assets/img/medical-type/icons-white/call.png")
              this.actions.push('Video')
            }
            else if(item.MedicalExaminationTypeId==4){
              this.MedicalType.push("Call appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/call.png")
              this.actionImg.push("../../../../../../assets/img/medical-type/icons-white/call.png")
              this.actions.push('Call')
            }
            else if(item.MedicalExaminationTypeId==5){
              this.MedicalType.push("Chat appointment")
              this.medicalImg.push("../../../../../../assets/img/medical-type/chat.png")
              this.actionImg.push("../../../../../../assets/img/medical-type/chat.png")
              this.actions.push('Call')
            } 
            
            
          })
        },
        (err)=>{
        this.SpinnerService.hide();

        })
      
  }
  //#endregion

//#endregion

  //#region EmrProfile Method
  EmrProfile(ID:number , appId){
    this.router.navigate(['/main/emr',ID], { queryParams: {appointment_id : appId} 
  })
  }
  //#endregion

  cancelAppointment(id){
  

    Swal.fire({
      title: this.translation.areusure,
      text: this.translation.cancelapp,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translation.yes,
      cancelButtonText:this.translation.Cancel
    })
    
    .then((result) => {

      if (result.isConfirmed) {
        this.AppointmentService.CancelApointment(id).subscribe(res=>{
          
          Swal.fire(
            this.translation.Cancelled,
            'success'
          )
      },
      (err)=>{
        // console.log(err)
        Swal.fire( this.translation.errocur);
      })
       
      } else {
        Swal.fire(
          this.translation.appointmentactive,
        );
      }
    }); 
  }
}
