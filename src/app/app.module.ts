import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Shared/nav/nav.component';
import { FooterComponent } from './Shared/footer/footer.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './Components/Signup/side-bar/side-bar.component';
import { SignupComponent } from './Components/Signup/signup/signup.component';
import { DoctorInfoComponent } from './Components/Signup/doctor-info/doctor-info.component';
import { CertificatesComponent } from './Components/Signup/certificates/certificates.component';
import { DocumentsComponent } from './Components/Signup/documents/documents.component';
import { CongratulationsComponent } from './Components/Signup/congratulations/congratulations.component';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { OtpComponent } from './Components/Signup/otp/otp.component';
import { SignUpMainComponent } from './Components/Signup/sign-up-main.component';
import { MainComponent } from './Components/main/main.component';
import { MainNavComponent } from './Shared/main-nav/main-nav.component';
import { UploadFileComponent } from './Shared/upload-file/upload-file.component';
import { ClinicInfoMainComponent } from './Components/clinic/clinic-info-main.component';
import { ClinicInfoComponent } from './Components/clinic/clinic-info/clinic-info.component';
import { ClinicGalaryComponent } from './Components/clinic/clinic-galary/clinic-galary.component';
import { ClinicSchedualComponent } from './Components/clinic/clinic-schedual/clinic-schedual.component';
import { ClinicSidebarComponent } from './Components/clinic/clinic-sidebar/clinic-sidebar.component';
import { GoogleMapsComponent } from './Shared/google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorsProvider } from 'src/Interceptor/interceptors';
import { CallComponent } from './Components/main/Service/call/call.component';
import { ChatComponent } from './Components/main/Service/chat/chat.component';
import { ClinicManagerComponent } from './Components/main/clinic-manager/clinic-manager.component';
import { HomeVisitComponent } from './Components/main/Service/home-visit/home-visit.component';
import { MainClinicComponent } from './Components/main/clinic-manager/main/main-clinic.component';
import { MainServiceComponent } from './Components/main/Service/main-service.component';
import { UpdateClinicGalaryComponent } from './Components/main/clinic-manager/Update-Clinic-Galary/update-clinic-galary.component';
import { UpdateClinicInfoComponent } from './Components/main/clinic-manager/Update-Clinic-Info/update-clinic-info.component';
import { UpdateClinicScheduleComponent } from './Components/main/clinic-manager/Update-Clinic-Schedule/update-clinic-schedule.component';
import { VideoCallComponent } from './Components/main/Service/video-call/video-call.component';
import { AppointmentComponent } from './Components/main/Appointments/appointment.component';
import { HistoryAppointmentComponent } from './Components/main/Appointments/history-appointment/history-appointment.component';
import { CurrentAppointmentComponent } from './Components/main/Appointments/current-appointment/current-appointment.component';
import { UpcomingAppointmentComponent } from './Components/main/Appointments/upcoming-appointment/upcoming-appointment.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './Components/SignIn/loginModal/login.component';
import { LoginPageComponent } from './Components/SignIn/login-page/login-page.component';
import { RegisterPageComponent } from './Components/SignIn/register-page/register-page.component';
import { LoginMainComponent } from './Components/SignIn/login-main.component';
import { DashboardComponent } from './Components/main/Dashboard/dashboard/dashboard.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UpdateDoctorInfoComponent } from './Components/main/UpdateDoctorInfo/update-doctor-info/update-doctor-info.component';
import { SidebarComponent } from './Components/main/UpdateDoctorInfo/sidebar/sidebar.component';
import { UpdataDoctorDataComponent } from './Components/main/UpdateDoctorInfo/updata-doctor-data.component';
import { UpdateDoctorCertificatesComponent } from './Components/main/UpdateDoctorInfo/update-doctor-certificates/update-doctor-certificates.component';


// AoT requires an exported function for factories
export function CreateTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'../assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    SideBarComponent,
    SignupComponent,
    DoctorInfoComponent,
    CertificatesComponent,
    DocumentsComponent,
    CongratulationsComponent,
    OtpComponent,
    SignUpMainComponent,
    MainComponent,
    MainNavComponent,
    UploadFileComponent,
    ClinicInfoMainComponent,
    ClinicInfoComponent,
    ClinicGalaryComponent,
    ClinicSchedualComponent,
    ClinicSidebarComponent,
    GoogleMapsComponent,
    HomeVisitComponent,
    VideoCallComponent,
    CallComponent,
    ChatComponent,
    MainServiceComponent,
    ClinicManagerComponent,
    MainClinicComponent,
    UpdateClinicInfoComponent,
    UpdateClinicGalaryComponent,
    UpdateClinicScheduleComponent,
    AppointmentComponent,
    HistoryAppointmentComponent,
    CurrentAppointmentComponent,
    UpcomingAppointmentComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LoginMainComponent,
    DashboardComponent,
    UpdateDoctorInfoComponent,
    SidebarComponent,
    UpdataDoctorDataComponent,
    UpdateDoctorCertificatesComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: ' AIzaSyAy8wLUdHfHVmzlWLNPVF96SO0GY1gP4Po',
      libraries: ['places']
    }),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule ,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: CreateTranslateLoader,
          deps: [HttpClient]
      },
      defaultLanguage:'en'}),
      BrowserAnimationsModule,
      ToastrModule.forRoot(), // ToastrModule added
       NgxPaginationModule,
       SweetAlert2Module.forRoot()
    ],
    //
  providers: [InterceptorsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
