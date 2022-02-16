import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuardService implements CanActivate {

  auth=localStorage.getItem('Authorization') 

  constructor(private router:Router) {


   }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin();
  }

  checkLogin(): boolean {
	  if (this.auth) {      
		return true;
	  }
  
	  // Navigate to the login page with extras
    else{
      this.router.navigate(["/Login"]);  
      return false;
    }
	}
}
