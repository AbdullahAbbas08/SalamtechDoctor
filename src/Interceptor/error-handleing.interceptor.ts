import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GeneralResponseSingleObject } from 'src/Models/general-response-single-object';

@Injectable()
export class ErrorHandleingInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      
    //   catchError((error)=>{
    //   // this.toastr.error(error, 'Errors...!');
    //   // console.log("dsd : ",request)
    // //   map((event: HttpEvent<any>) => {
    // //     if (event instanceof HttpResponse) {
    // //         console.log('event--->>>', event);
    // //     }
    // //     return event;
    // // })
    

    //   return of(error)
    // }));
  //}
  )
}
}
