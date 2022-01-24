import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClinicSchedule } from 'src/Models/clinic-schedule';
import { ClinicScheduleDay } from 'src/Models/clinic-schedule-day';
import { GeneralResponse } from 'src/Models/general-response';
import { ClinicScheduleService } from 'src/Service/ClinicSchedule/clinic-schedule.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolver implements Resolve<any> {

  constructor(private Service:ClinicScheduleService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GeneralResponse<ClinicSchedule>> {
    return this.Service.GetClinicSchedualByClinicId('en',Number(route.paramMap.get('ClinicId'))).pipe(map(ClinicSchedule=>ClinicSchedule));
  }

}
