import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';
import { ClinicMangeService } from 'src/Service/ClinicMange/clinic-mange.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  @Output() sendData =new EventEmitter;
  //#region Declare Variables
  AppointmentVisited:boolean ;
  searchForm:FormGroup;
  clinics;
  medicalTypes;
  searchResult;
  public Result;
  //#endregion

  //#region constructor
  constructor(private builder :FormBuilder,
    private clinicService :ClinicMangeService,
    private LookupService:LookupsService,
    private appointmentService :AppointmentService) { }
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

    this.getDoctorClicinc();
    this.initForm();
    this.getMedicalTypes();
  }
  //#endregion

initForm(){
  this.searchForm=this.builder.group({
    PatientName:[''],
    ClinicId:[parseInt('')],
    MedicalExaminationTypeId:[parseInt('')],
    FromDate:['', Validators.required],
    ToDate:['' , Validators.required]
  })
}

  
isFieldValid(field): boolean {
  return (
    !this.searchForm.get(field)?.valid && this.searchForm.get(field)?.touched
  )
}

getDoctorClicinc(){
  this.clinicService.GetDoctorClinics().subscribe(res=>{
    this.clinics=res.Data
    console.log(this.clinics);
    
  })
}

getMedicalTypes(){
  this.LookupService.GetMedicalType().subscribe(res=>{
    this.medicalTypes=res.Data;
    console.log(this.medicalTypes);
    
  })
}

submit(){
  if(this.searchForm.valid){
    this.searchForm.get('ClinicId').setValue(parseInt(this.searchForm.get('ClinicId').value))
    this.searchForm.get('MedicalExaminationTypeId').setValue(parseInt(this.searchForm.get('MedicalExaminationTypeId').value))
    // console.log(this.searchForm.value);
    this.appointmentService.SearchDoctorAppointment(this.searchForm.value).subscribe(res=>{
      this.searchResult=res.Data
      console.log(this.searchResult);
      this.appointmentService.Result.next(this.searchResult) 
    },
    err=>{
      console.log(err);
    })
    
  }
  else{
    this.searchForm.markAllAsTouched();
  }
}



}
