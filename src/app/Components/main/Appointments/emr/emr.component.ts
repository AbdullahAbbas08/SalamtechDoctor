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
    this.id=window.location.pathname.slice(10,13)
    console.log(this.id);
    
  }

  ngOnInit(): void {

  }




}
