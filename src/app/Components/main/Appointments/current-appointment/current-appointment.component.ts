import { Component, OnInit } from '@angular/core';
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
    this.GetCurrentDoctorAppointment(10,1);
    //#endregion
  }
  //#endregion

//#region Consume API's

  //#region Get Current Doctor Appointment
  GetCurrentDoctorAppointment(MaxResultCount:number,SkipCount:number){
    // this.AppointmentService.GetCurrentDoctorAppointment(MaxResultCount,SkipCount).subscribe(
    this.AppointmentService.GetHistoryDoctorAppointment(MaxResultCount,SkipCount).subscribe(
      (response)=>{
         this.PatientList = response.Data.Items;
         let re = /\*/gi;
         
         this.PatientList.forEach(element => {
            element.PatientName = element.PatientName.replace(re, " ");
            let s= (element.PatientName.split(" ", 2)).toString();
            element.PatientName = (s.replace(","," "));
        });
        console.log("data : ",response.Data);

      },
      (err)=>{
      }
    )
  }
  //#endregion

//#endregion

  //#region EmrProfile Method
  EmrProfile(ID:number){
    this.router.navigate(['/main/emr',ID])
  }
  //#endregion
}
