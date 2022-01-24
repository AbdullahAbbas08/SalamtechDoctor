import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
        //#region Init Values
        document.getElementById('Dashboard')?.classList.add('OnClick-Style');
        document.getElementById('DashboardIcon')?.classList.add('calender-visited');
        document.getElementById('Profile')?.classList.remove('OnClick-Style');
        document.getElementById('ProfileIcon')?.classList.remove('calender-visited');
        document.getElementById('Services')?.classList.remove('OnClick-Style');
        document.getElementById('ServiceIcon')?.classList.remove('calender-visited');
        document.getElementById('Appointments')?.classList.remove('OnClick-Style');
        document.getElementById('AppointmentIcon')?.classList.remove('calender-visited');
        document.getElementById('Clinics')?.classList.remove('OnClick-Style');
        document.getElementById('ClinicsIcon')?.classList.remove('OnClick-Style');
        //#endregion
  }

}
