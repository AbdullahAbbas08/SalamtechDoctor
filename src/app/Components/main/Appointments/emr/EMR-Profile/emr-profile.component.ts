import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';

@Component({
  selector: 'app-emr-profile',
  templateUrl: './emr-profile.component.html',
  styleUrls: ['./emr-profile.component.css']
})
export class EmrProfileComponent implements OnInit {
  id;
  constructor(private route:ActivatedRoute , private AppointmentService:AppointmentService) { 
    console.log("EmrProfileComponent : ",this.AppointmentService.EMRID)
    this.route.paramMap.subscribe(param=>{
      console.log(param.get('emrID'));
      this.id=param.get('emrID');
    })
  }

  ngOnInit(): void {

    //#region Init Values
    document.getElementById('PatientProfile')?.classList.remove('visited-appointemt-component');
    document.getElementById('EMRProfile')?.classList.add('visited-appointemt-component');
    //#endregion

  }

}
