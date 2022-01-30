import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EmrComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private AppointmentService:AppointmentService) { 
    this.AppointmentService.EMRID =Number(this.route.snapshot.paramMap.get('emrID'))
  }

  ngOnInit(): void {

  }

  //#region GoToPatientProfile =>  Method
  GoToPatientProfile(){
    this.router.navigateByUrl("/main/emr/"+this.route.snapshot.paramMap.get('emrID')+"/patient-profile");
  }
  //#endregion 

  //#region GoToEmrProfile =>  Method
  GoToEmrProfile(){
     this.router.navigateByUrl("/main/emr/"+this.route.snapshot.paramMap.get('emrID')+"/emr-profile");
  }
  //#endregion GoToEmrProfile

}
