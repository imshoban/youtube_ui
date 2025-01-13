import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean>| Promise<boolean>|boolean{
    if(this.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }
  
  isLoggedIn():boolean{
    return localStorage.getItem('username')? true : false;
  }
}
