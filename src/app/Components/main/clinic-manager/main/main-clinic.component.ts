import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsComponent } from 'src/app/Shared/google-maps/google-maps.component';
import { environment } from 'src/environments/environment';
import { Clinic } from 'src/Models/clinic';
import { ClinicMangeService } from 'src/Service/ClinicMange/clinic-mange.service';

@Component({
  selector: 'app-main-clinic',
  templateUrl: './main-clinic.component.html',
  styleUrls: ['./main-clinic.component.css']
})
export class MainClinicComponent implements OnInit {

  //#region Declare Variables
  tempvar:boolean;
  ClinicList:Clinic[];
  IamgeURL:string;
  address:string;
  //#endregion

  //#region constructor
  constructor(  private ClinicMangeService:ClinicMangeService , 
                private router:Router,
                private modalService: NgbModal,
                ) { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {

    //#region Init Values
    document.getElementById('scrolltop')?.scrollIntoView(); 
    document.getElementById('Clinics')?.classList.add('OnClick-Style');
    document.getElementById('ClinicsIcon')?.classList.add('OnClick-Style');

    document.getElementById('Dashboard')?.classList.remove('OnClick-Style');
    document.getElementById('DashboardIcon')?.classList.remove('calender-visited');
    document.getElementById('Appointments')?.classList.remove('OnClick-Style');
    document.getElementById('AppointmentIcon')?.classList.remove('calender-visited');
    document.getElementById('Services')?.classList.remove('OnClick-Style');
    document.getElementById('ServiceIcon')?.classList.remove('calender-visited');
    document.getElementById('Profile')?.classList.remove('OnClick-Style');
    document.getElementById('ProfileIcon')?.classList.remove('calender-visited');
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
      // console.log(err);
    })
  }
  //#endregion

  //#endregion

  //#region Edit Doctor Profile
  EditDoctorProfile(ID:number){
    this.router.navigate(['main/updateclinic/updateclinic',ID]);
  }
  //#endregion

openGoogelMapsModal() {
  const modalRef = this.modalService.open(GoogleMapsComponent, {
    scrollable: true,modalDialogClass:"modal-xl modal-dialog-centered modal-dialog-scrollable"
    // windowClass: 'myCustomModalClass',
    // keyboard: false,
    // backdrop: 'static'
  });
  let data = {
    prop1: 'Some Data',
    prop2: 'From Parent Component',
    prop3: 'This Can be anything',
  };

  modalRef.componentInstance.fromParent = data;
  modalRef.result.then(
    (result) => {
      this.address = result.address;
    },
    (reason) => {}
  );
}
}
