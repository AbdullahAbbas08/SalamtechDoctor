import { LocationService } from './../../../Service/location/location.service';
import { UpdateClinicInfoComponent } from './../../Components/main/clinic-manager/Update-Clinic-Info/update-clinic-info.component';

import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder:any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @Input() fromParent:any; 


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public activeModal: NgbActiveModal,
    private locationService:LocationService
  ) { }




  ngOnInit() {

    
    this.getLocFromApis()
     //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.getAddress(this.latitude, this.longitude);
            this.zoom = 12;
          });
        });

    });

  }





  markerDragEnd($event: any) {
    // console.log("drag",$event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    console.log(this.latitude , this.longitude)
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude:any, longitude:any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
      // console.log(results);
      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  closeModal(sendData:any) {
    this.activeModal.close(sendData);
  }

  saveLocation(){
    const data = {
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude
    }
    this.activeModal.close(data);
  }

  getLocFromApis(){
  
    this.locationService.long.subscribe(res=>{
      this.longitude=parseFloat(res);
      console.log(res);
      
      this.locationService.lat.subscribe(res=>{
        
        if(this.longitude == 0 || this.longitude == null ){
          console.log(this.latitude);
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.zoom = 8;
              this.getAddress(this.latitude, this.longitude);
            });
          }
        }
        else{
          this.latitude=parseFloat(res);
        
          this.zoom = 8;
          console.log(this.latitude , this.longitude);
        }
      })
    })
  
}



}
