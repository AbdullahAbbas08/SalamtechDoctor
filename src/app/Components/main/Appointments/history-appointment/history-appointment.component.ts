import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientItem } from 'src/Models/patient-item';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';

@Component({
  selector: 'app-history-appointment',
  templateUrl: './history-appointment.component.html',
  styleUrls: ['./history-appointment.component.css']
})
export class HistoryAppointmentComponent implements OnInit {

  //#region Decalre Variables
  IamgeURL:string;
  p:number = 1;
  PatientList:PatientItem[];
  //#endregion

  //#region constructor
  constructor(private AppointmentService:AppointmentService) { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {

    //#region  Init Values
    this.IamgeURL = environment.ImagesURL;
    document.getElementById('Current')?.classList.remove('visited-appointemt-component');
    document.getElementById('History')?.classList.add('visited-appointemt-component');
    document.getElementById('Upcoming')?.classList.remove('visited-appointemt-component');
    //#endregion
  
    //#region Invoke Methods
    this.GetHistoryDoctorAppointment(10,1);
    //#endregion
  }
  //#endregion

//#region Consume API's

  //#region Get History Doctor Appointment
  GetHistoryDoctorAppointment(MaxResultCount:number,SkipCount:number){
    this.AppointmentService.GetHistoryDoctorAppointment(MaxResultCount,SkipCount).subscribe(
      (response)=>{
         this.PatientList = response.Data.Items;
         let re = /\*/gi;
         
         this.PatientList.forEach(element => {
            element.PatientName = element.PatientName.replace(re, " ");
            let s= (element.PatientName.split(" ", 2)).toString();
            element.PatientName = (s.replace(","," "));
        });
      },
      (err)=>{
      }
    )
  }
  //#endregion

//#endregion

}
