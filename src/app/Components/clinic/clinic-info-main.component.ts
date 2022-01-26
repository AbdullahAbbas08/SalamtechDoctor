import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Service/login.service';

@Component({
  selector: 'app-clinic-info-main',
  templateUrl: './clinic-info-main.component.html',
  styleUrls: ['./clinic-info-main.component.css']
})
export class ClinicInfoMainComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
   
  }



}
