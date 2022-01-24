import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upcoming-appointment',
  templateUrl: './upcoming-appointment.component.html',
  styleUrls: ['./upcoming-appointment.component.css']
})
export class UpcomingAppointmentComponent implements OnInit {


  //#region Decalre Variables
  IamgeURL:string;
  //#endregion

  //#region constructor
  constructor() { }
  //#endregion

  //#region On Init Method
  ngOnInit(): void {

    //#region  Init Values
    this.IamgeURL = environment.ImagesURL;
    document.getElementById('Current')?.classList.remove('visited-appointemt-component');
    document.getElementById('History')?.classList.remove('visited-appointemt-component');
    document.getElementById('Upcoming')?.classList.add('visited-appointemt-component');
    //#endregion
  }
  //#endregion


}
