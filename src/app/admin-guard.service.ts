import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.auth.currentUser;
    const result = user && user.email === 'aguacongas@gmail.com';
    if (!result) {
      this.router.navigate(['login']);
    }
    return result;
  }

}
