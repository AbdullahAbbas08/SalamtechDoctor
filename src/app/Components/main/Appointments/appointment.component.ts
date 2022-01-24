import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  //#region Declare Variables
  AppointmentVisited:boolean ;
  //#endregion

  //#region constructor
  constructor() { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {

    //#region Init Values
    this.AppointmentVisited = false;

    document.getElementById('Dashboard')?.classList.remove('OnClick-Style');
    document.getElementById('DashboardIcon')?.classList.remove('calender-visited');
    document.getElementById('Clinics')?.classList.remove('OnClick-Style');
    document.getElementById('ClinicsIcon')?.classList.remove('OnClick-Style');
    document.getElementById('Services')?.classList.remove('OnClick-Style');
    document.getElementById('ServiceIcon')?.classList.remove('calender-visited');
    document.getElementById('Appointments')?.classList.add('OnClick-Style');
    document.getElementById('AppointmentIcon')?.classList.add('calender-visited');
    //#endregion
  }
  //#endregion



}
