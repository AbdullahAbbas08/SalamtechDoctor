import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClinicSchedule } from 'src/Models/clinic-schedule';
import { GeneralResponse } from 'src/Models/general-response';
import { translateSwals } from 'src/Models/translateSwals';
import { TranslateSwalsService } from 'src/Service/translateSwals/translate-swals.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateSwalsResolver implements Resolve<any> {

  constructor(private Service:TranslateSwalsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GeneralResponse<translateSwals>> {
    return this.Service.Translitation().pipe(map(translateSwals=>translateSwals));
  }
  
}
