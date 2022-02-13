import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/Models/Login';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router,private toastr:ToastrService) {}

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // const authReq = request.clone({ headers: request.headers.set("Authorization", localStorage.getItem("Authorization") as string) });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = '';        
        if (err.status === 401) {
          // handle client-side error
          localStorage.removeItem('Authorization')
          this.router.navigate(['/Login'])
          console.log(message);
          
          message = `Error: ${err.error.message}`;
        } 
        
        else {
          // handle server-side error
          message = `Error Status: ${err.status}\nMessage: ${err.message}`;
        }
        // console.log(message);
        
        // return the error back to the caller
        return throwError(err);
      })
    );
  }
}
