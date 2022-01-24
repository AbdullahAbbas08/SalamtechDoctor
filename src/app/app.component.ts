import { Component,HostListener,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Coordinates } from 'src/Models/Coordinates';
import { GoogleMapsComponent } from './Shared/google-maps/google-maps.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //online , Offline Events
  //#region HostListeners
  @HostListener('window:online',['$event'])
  IsOnline(event:any){ this.toastr.success('The internet has been successfully restored ' , 'Success'); }
  
  @HostListener('window:offline',['$event'])
  IsOffline(event:any){this.toastr.error('Please make sure you have internet ' , 'No Internet'); }
  //#endregion

  title = 'SalamtechDoctor';

//#region Constructor
constructor(private toastr:ToastrService){

}
//#endregion

//#region On Init Method
ngOnInit(){
}
//#endregion


}

