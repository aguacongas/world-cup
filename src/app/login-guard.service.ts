import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  canActivate(): boolean {
    const user = this.authService.auth.currentUser;
    const result = !user || user.isAnonymous;
    if (!result) {
      this.router.navigate(['world-cup']);
    }
    return result;
  }
  constructor(private authService: AngularFireAuth, private router: Router) { }
}
