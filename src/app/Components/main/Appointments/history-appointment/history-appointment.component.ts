import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-history-appointment',
  templateUrl: './history-appointment.component.html',
  styleUrls: ['./history-appointment.component.css']
})
export class HistoryAppointmentComponent implements OnInit {

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
    document.getElementById('History')?.classList.add('visited-appointemt-component');
    document.getElementById('Upcoming')?.classList.remove('visited-appointemt-component');
    //#endregion
  }
  //#endregion

}
