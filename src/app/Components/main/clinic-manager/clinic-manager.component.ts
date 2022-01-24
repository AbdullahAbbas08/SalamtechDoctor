import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Clinic } from 'src/Models/clinic';
import { ClinicMangeService } from 'src/Service/ClinicMange/clinic-mange.service';

@Component({
  selector: 'app-clinic-manager',
  templateUrl: './clinic-manager.component.html',
  styleUrls: ['./clinic-manager.component.css']
})
export class ClinicManagerComponent implements OnInit {

  //#region Declare Variables
  tempvar:boolean;
  ClinicList:Clinic[];
  IamgeURL:string;
  //#endregion

  //#region constructor
  constructor(private ClinicMangeService:ClinicMangeService , private router:Router) { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {

    //#region Init Values
    document.getElementById('Dashboard')?.classList.remove('OnClick-Style');
    document.getElementById('DashboardIcon')?.classList.remove('calender-visited');
    document.getElementById('Services')?.classList.remove('OnClick-Style');
    document.getElementById('ServiceIcon')?.classList.remove('calender-visited');
    document.getElementById('Appointments')?.classList.remove('OnClick-Style');
    document.getElementById('AppointmentIcon')?.classList.remove('calender-visited');
    document.getElementById('Profile')?.classList.remove('calender-visited');
    document.getElementById('Clinics')?.classList.add('OnClick-Style');
    document.getElementById('ClinicsIcon')?.classList.add('OnClick-Style');
    this.tempvar = false;
    this.ClinicList =[];
    this.IamgeURL = environment.ImagesURL;
    // document.getElementsByClassName('OnClick-Style').item;
    //#endregion

    //#region Invoke Methods 
    this.GetDoctorClinics();
    //#endregion
 }
  //#endregion

  //#region Counter 
  couter(index:number){
    return new Array(index);
  }
  //#endregion

  //#region Consume API's

      //#region GetDoctorClinics
      GetDoctorClinics()
      {
        this.ClinicMangeService.GetDoctorClinics().subscribe((response)=>{
          this.ClinicList = response.Data; 
        },
        (err)=>{
          console.log(err);
        })
      }
      //#endregion

  //#endregion

//#region Edit Doctor Profile
EditDoctorProfile(ID:number){
  this.router.navigateByUrl("main/clinic/clinicinfo");
  console.log("navigateByUrl");
}
//#endregion

}
