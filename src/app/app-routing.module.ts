//#region imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorHomeVisitScheduleResolver } from 'src/Resolver/doctor-home-visit-schedule.resolver';
import { DoctorVideoCallScheduleResolver } from 'src/Resolver/doctor-video-call-schedule.resolver';
import { GalaryResolver } from 'src/Resolver/galary.resolver';
import { ScheduleResolver } from 'src/Resolver/schedule.resolver';
import { LoginGuardService } from 'src/Service/guard/Loginguard.service';
import { LogoutGuardService } from 'src/Service/guard/logoutguard.service';
import { ClinicGalaryComponent } from './Components/clinic/clinic-galary/clinic-galary.component';
import { ClinicInfoMainComponent } from './Components/clinic/clinic-info-main.component';
import { ClinicInfoComponent } from './Components/clinic/clinic-info/clinic-info.component';
import { ClinicSchedualComponent } from './Components/clinic/clinic-schedual/clinic-schedual.component';
import { AppointmentComponent } from './Components/main/Appointments/appointment.component';
import { CurrentAppointmentComponent } from './Components/main/Appointments/current-appointment/current-appointment.component';
import { EmrProfileComponent } from './Components/main/Appointments/emr/EMR-Profile/emr-profile.component';
import { EmrComponent } from './Components/main/Appointments/emr/emr.component';
import { PatientProfileComponent } from './Components/main/Appointments/emr/Patient-Profile/patient-profile.component';
import { FilterAppointmentComponent } from './Components/main/Appointments/filter-appointment/filter-appointment.component';
import { HistoryAppointmentComponent } from './Components/main/Appointments/history-appointment/history-appointment.component';
import { UpcomingAppointmentComponent } from './Components/main/Appointments/upcoming-appointment/upcoming-appointment.component';
import { ClinicManagerComponent } from './Components/main/clinic-manager/clinic-manager.component';
import { MainClinicComponent } from './Components/main/clinic-manager/main/main-clinic.component';
import { UpdateClinicGalaryComponent } from './Components/main/clinic-manager/Update-Clinic-Galary/update-clinic-galary.component';
import { UpdateClinicInfoComponent } from './Components/main/clinic-manager/Update-Clinic-Info/update-clinic-info.component';
import { UpdateClinicScheduleComponent } from './Components/main/clinic-manager/Update-Clinic-Schedule/update-clinic-schedule.component';
import { DashboardComponent } from './Components/main/Dashboard/dashboard/dashboard.component';
import { MainComponent } from './Components/main/main.component';
import { CallComponent } from './Components/main/Service/call/call.component';
import { ChatComponent } from './Components/main/Service/chat/chat.component';
import { HomeVisitComponent } from './Components/main/Service/home-visit/home-visit.component';
import { MainServiceComponent } from './Components/main/Service/main-service.component';
import { VideoCallComponent } from './Components/main/Service/video-call/video-call.component';
import { UpdataDoctorDataComponent } from './Components/main/UpdateDoctorInfo/updata-doctor-data.component';
import { UpdateDoctorCertificatesComponent } from './Components/main/UpdateDoctorInfo/update-doctor-certificates/update-doctor-certificates.component';
import { UpdateDoctorDocsComponent } from './Components/main/UpdateDoctorInfo/update-doctor-docs/update-doctor-docs.component';
import { UpdateDoctorInfoComponent } from './Components/main/UpdateDoctorInfo/update-doctor-info/update-doctor-info.component';
import { LoginMainComponent } from './Components/SignIn/login-main.component';
import { LoginPageComponent } from './Components/SignIn/login-page/login-page.component';
import { RegisterPageComponent } from './Components/SignIn/register-page/register-page.component';
import { TermsComponent } from './Components/SignIn/terms/terms.component';
import { CertificatesComponent } from './Components/Signup/certificates/certificates.component';
import { CongratulationsComponent } from './Components/Signup/congratulations/congratulations.component';
import { DoctorInfoComponent } from './Components/Signup/doctor-info/doctor-info.component';
import { DocumentsComponent } from './Components/Signup/documents/documents.component';
import { OtpComponent } from './Components/Signup/otp/otp.component';
import { SignUpMainComponent } from './Components/Signup/sign-up-main.component';
import { SignupComponent } from './Components/Signup/signup/signup.component';
import { AboutUsComponent } from './Components/without-signin/about-us/about-us.component';
import { ContactUsComponent } from './Components/without-signin/contact-us/contact-us.component';
import { HelpComponent } from './Components/without-signin/help/help.component';
import { HomeComponent } from './Components/without-signin/home/home.component';

//#endregion

const routes: Routes = [


  {  
    path:'doctor-profile',
    component:SignUpMainComponent ,
    children:[
      {path:'OTP',component:OtpComponent },
      {path:'',component:DoctorInfoComponent },
      {path:'certificates',component:CertificatesComponent },
      {path:'documents',component:DocumentsComponent },
      {path:'Congratulations',component:CongratulationsComponent },
    ] 
  },


  {
    path:'terms',
    component:TermsComponent
  },

  { canActivate: [LogoutGuardService] , path:'clinic',component:ClinicInfoMainComponent ,
    children:[
        {path:'',component:ClinicInfoComponent },
        {path:'gallary/:ClinicId',component:ClinicGalaryComponent , resolve:{Galary:GalaryResolver}},
        {path:'schedule/:ClinicId',component:ClinicSchedualComponent , resolve:{ClinicSchedule:ScheduleResolver}},
      ]
  },

  { canActivate: [LogoutGuardService],path:'main',component:MainComponent ,

    children:[

        {path:'',component:DashboardComponent},

        {path:'dashboard',component:DashboardComponent},

        {path:'service',component:MainServiceComponent,children:[
          {path:'',component:HomeVisitComponent , resolve:{DoctorHomeVisitSchedual:DoctorHomeVisitScheduleResolver}} ,
          {path:'homevisit',component:HomeVisitComponent , resolve:{DoctorHomeVisitSchedual:DoctorHomeVisitScheduleResolver}} ,
          {path:'videocall',component:VideoCallComponent , resolve:{DoctorVideoCallSchedual:DoctorVideoCallScheduleResolver}} ,
          {path:'call',component:CallComponent , resolve:{DoctorCallSchedual:DoctorVideoCallScheduleResolver}},
          {path:'chat',component:ChatComponent, resolve:{DoctorChatSchedual:DoctorVideoCallScheduleResolver} },
        ] },

        {path:'updateclinic',component:ClinicManagerComponent,children:[
          {path:'',component:MainClinicComponent} ,
          {path:'updateclinic/:ID',component:UpdateClinicInfoComponent },
          {path:'UpdateClinicGalary/:ClinicId',component:UpdateClinicGalaryComponent, resolve:{Galary:GalaryResolver} },
          {path:'UpdateClinicSchedule/:ClinicId',component:UpdateClinicScheduleComponent , resolve:{ClinicSchedule:ScheduleResolver}},
        ] },

        {path:'appointment',component:AppointmentComponent,children:[
          {path:'',component:CurrentAppointmentComponent} ,
          {path:'current',component:CurrentAppointmentComponent} ,
          {path:'history',component:HistoryAppointmentComponent} ,
          {path:'upcoming',component:UpcomingAppointmentComponent} ,
          {path:'filter-appointment',component:FilterAppointmentComponent} ,
        ] },

        { path:'emr',component:EmrComponent,children:[
          {path:':ID',component:EmrProfileComponent } ,
          {path:'emr-profile/:ID',component:EmrProfileComponent } ,
          {path:'patient-profile/:ID',component:PatientProfileComponent} ,
        ] },
        {path:'update-doctor-profile',component:UpdateDoctorInfoComponent },
        {path:'update-doctor-certificates',component:UpdateDoctorCertificatesComponent },
        {path:'update-doctor-documents',component:UpdateDoctorDocsComponent },
    ]
  },


  { canActivate: [LoginGuardService],
    path:'Login',
    component:LoginPageComponent
  },
  { canActivate: [LoginGuardService],
    path:'',component:LoginMainComponent,
    children:[
      { path:'',
        component:LoginPageComponent
      },
    {path:'register',component:RegisterPageComponent}
    ]
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'about-us',
    component: AboutUsComponent
  },
  {
    path:'contact-us',
    component: ContactUsComponent
  },
  {
    path:'help',
    component: HelpComponent
  },
  {
    path:'otp',
    component: OtpComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {
    // useHash:true,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
