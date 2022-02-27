import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  latt:number=0;
  lon:number=0;

  public lat = new BehaviorSubject<any>(this.latt);
  public long = new BehaviorSubject<any>(this.lon);


  constructor() { }
}
