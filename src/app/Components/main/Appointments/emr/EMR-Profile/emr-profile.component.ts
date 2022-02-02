import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';
import { EmrService } from 'src/Service/emr/emr.service';
import { LookupsService } from 'src/Service/Lockups/lookups.service';

@Component({
  selector: 'app-emr-profile',
  templateUrl: './emr-profile.component.html',
  styleUrls: ['./emr-profile.component.css']
})
export class EmrProfileComponent implements OnInit {
  id;
  data=[];
  MedicalType ;
  medicalImg;
  profileHistory;
  profiledetails;
  EmrForm:FormGroup;
  constructor(private route:ActivatedRoute ,
     private emrService : EmrService ,
     private lookupService:LookupsService
     ) { 
     this.route.paramMap.subscribe(param=>{
      this.id=param.get('ID');
      this.GetEmrHistory(this.id)
      // console.log(param.get('appointmentID'));
      this.emrService.id.next(this.id)  
    })
  }

  ngOnInit(): void {

    //#region Init Values
    document.getElementById('PatientProfile')?.classList.remove('visited-appointemt-component');
    document.getElementById('EMRProfile')?.classList.add('visited-appointemt-component');
    //#endregion
    this.initForm()

  }

  initForm(){
    
  }

  getMedicalTYpe(id){    
    if(id==1){
      this.MedicalType="Clinic Appointment"
      this.medicalImg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==2){
      this.MedicalType= "Home visit"
      this.medicalImg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==3){
      this.MedicalType=  "Video appointment"
      this.medicalImg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==4){
      this.MedicalType= "Call appointment"
      this.medicalImg="../../../../../../assets/img/medical-type/location.png"
    }
    else if(id==5){
      this.MedicalType= "Chat appointment"
      this.medicalImg="`../../../../../..`/assets/img/medical-type/location.png"
    }
  }

  GetEmrHistory(id){
    this.emrService.GetEmrHistory(id).subscribe(res=>{
      this.profileHistory= res.Data;
      console.log(this.profileHistory);
      this.profileHistory.map(res=>{
        this.GetEmrDetails(res.AppointmentId)
        this.getMedicalTYpe(res.MedicalExaminationTypeId)
      })
    })
  }

  GetEmrDetails(id){
    this.emrService.GetEmrDetails(id).subscribe(res=>{
      this.profiledetails= res.Data;
      console.log(this.profiledetails);
      console.log(this.profiledetails.PatientEmrdocuments.length);
      
    })
  }



}
