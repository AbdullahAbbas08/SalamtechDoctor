import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EmrComponent implements OnInit {
id;
  constructor(private router:Router,private route:ActivatedRoute,private AppointmentService:AppointmentService) { 
    this.AppointmentService.EMRID = Number(this.route.snapshot.paramMap.get('emrID'))
  }

  ngOnInit(): void {

  }

  //#region GoToPatientProfile =>  Method
  GoToPatientProfile(){
    // this.router.navigateByUrl("/main/emr/"+this.route.snapshot.paramMap.get('emrID')+"/patient-profile");
    this.router.navigate(['/main/emr/patient-profile',this.route.snapshot.paramMap.get('emrID')])
  }
  //#endregion 

  //#region GoToEmrProfile =>  Method
  GoToEmrProfile(){
    this.router.navigate(['/main/emr/emr-profile',this.route.snapshot.paramMap.get('emrID')])
  }
  //#endregion GoToEmrProfile


}
