import { Component, OnInit } from '@angular/core';
import { GeneralResponseSingleObject } from 'src/Models/general-response-single-object';
import { GetDoctorDashboard } from 'src/Models/MedicalType';
import { DashboardApiService } from 'src/Service/Dashboard/dashboard-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imgURL1: any = '../../../../assets/img/dashboard/kabsoul.png';
  imgURL2: any = '../../../../assets/img/dashboard/hear.png';
  imgURL3: any = '../../../../assets/img/dashboard/home.png';

  imgURLcall: any = '../../../../assets/img/dashboard/call.png';
  imgURLvideo: any = '../../../../assets/img/dashboard/video.png';
  imgURLclinic: any = '../../../../assets/img/dashboard/clinic.png';
  imgURLchat: any = '../../../../assets/img/dashboard/chat.png';
  response : GetDoctorDashboard;
  constructor(private ApiService: DashboardApiService) { 
    this.getData()
  }


  ngOnInit(): void {
    this.response = new GetDoctorDashboard();
    this.response.TodayAppointmentCount = 0;
    this.response.TotalAppointmentCount = 0;
    this.response.UpComingAppointmentCount = 0;
    this.response.getMedicalEximationListDtos  = [];

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

  getData() {
    this.ApiService.GetDashboardData().subscribe(
      (data) => {
        this.response=data.Data;
        this.response.UpComingAppointmentCount
        console.log(data.Data);
        
      },
      (err) => {

      }
    )
  }

}
