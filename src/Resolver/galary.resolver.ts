import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Galary } from 'src/Models/galary';
import { GeneralResponse } from 'src/Models/general-response';
import { GalaryService } from 'src/Service/ClinicGalary/galary.service';

@Injectable({
  providedIn: 'root'
})
export class GalaryResolver implements Resolve<any> {

  constructor(private Service:GalaryService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GeneralResponse<Galary>> {
    return this.Service.GetClinicGalleryByClinicId('en',Number(route.paramMap.get('ClinicId'))).pipe(map(Galary=>Galary));
  }

}
