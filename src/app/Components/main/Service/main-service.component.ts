import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/Service/DoctorService/doctor-service.service';

@Component({
  selector: 'app-main-service',
  templateUrl: './main-service.component.html',
  styleUrls: ['./main-service.component.css']
})
export class MainServiceComponent implements OnInit {

  //#region Declare variables
  ActiveComponent:string = "Home Visits";
  //#endregion

  //#region constructor
  constructor(private DoctorService:DoctorService , private router:Router) { }
  //#endregion

  //#region On Init
  ngOnInit(): void {

    //#region Init Values
    document.getElementById('Dashboard')?.classList.remove('OnClick-Style');
    document.getElementById('DashboardIcon')?.classList.remove('calender-visited');
    document.getElementById('Clinics')?.classList.remove('OnClick-Style');
    document.getElementById('ClinicsIcon')?.classList.remove('OnClick-Style');
    document.getElementById('Appointments')?.classList.remove('OnClick-Style');
    document.getElementById('AppointmentIcon')?.classList.remove('calender-visited');
    document.getElementById('Services')?.classList.add('OnClick-Style');
    document.getElementById('ServiceIcon')?.classList.add('calender-visited');
    //#endregion

    //#region Invoke Method

    //#endregion

  }
  //#endregion

  //#region ChangeTitle Method
  ChangeTitle(Title:string){
    this.ActiveComponent = Title;
  }
  //#endregion
}
