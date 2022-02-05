import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/Service/Appointment/appointment.service';
import { EmrService } from 'src/Service/emr/emr.service';

@Component({
  selector: 'app-emr',
  templateUrl: './emr.component.html',
  styleUrls: ['./emr.component.css']
})
export class EmrComponent implements OnInit {
id;
appointmentID
  constructor(private router:Router,private route:ActivatedRoute,private AppointmentService:AppointmentService , private emrService :EmrService) { 
    // this.id=window.location.pathname.slice(10,13)
    // console.log(this.id);

    this.emrService.patientId.subscribe(res=>{
      this.id=res;
      // console.log(res);
    })
    this.emrService.appointmentId.subscribe(res=>{
      this.appointmentID=res;
      // console.log(res);
    })
    
  }

  ngOnInit(): void {

  }




}
