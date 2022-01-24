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
import { ClinicScheduleService } from 'src/Service/ClinicSchedule/clinic-schedule.service';
import { DoctorService } from 'src/Service/DoctorService/doctor-service.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorHomeVisitScheduleResolver implements Resolve<any> {

  constructor(private Service:DoctorService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GeneralResponse<ClinicSchedule>> {
    return this.Service.GetDoctorHomeVisitSchedual().pipe(map(DoctorHomeVisitSchedual=>DoctorHomeVisitSchedual));
  }
}
