import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic-sidebar',
  templateUrl: './clinic-sidebar.component.html',
  styleUrls: ['./clinic-sidebar.component.css']
})
export class ClinicSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('sidebarinfo')?.classList.add('OnClick-Style');
  }

}
