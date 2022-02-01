import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';
import { EmrService } from 'src/Service/emr/emr.service';

@Component({
  selector: 'app-emr-profile',
  templateUrl: './emr-profile.component.html',
  styleUrls: ['./emr-profile.component.css']
})
export class EmrProfileComponent implements OnInit {
  id;
  profiledetails;
  EmrForm:FormGroup;
  constructor(private route:ActivatedRoute , private emrService : EmrService) { 
     this.route.paramMap.subscribe(param=>{
      this.id=param.get('appointmentID');
      this.getEmrProfile(this.id)
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

  getEmrProfile(id){
    this.emrService.GetEmrProfile(id).subscribe(res=>{
      this.profiledetails= res.Data;
      console.log(this.profiledetails);
      
    })
  }



}
