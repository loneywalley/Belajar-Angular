import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router){}

  canActivate(): boolean { 
      if(this.authService.isLoggedIn()) {
        return true;
      }else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
