import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatBottomSheet } from '@angular/material';

import { DeleteUserComponent } from './delete-user/delete-user.component';
@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAdmin = false;
  userName: string;

  constructor(
    private authService: AngularFireAuth,
    private router: Router,
    private bottomSheet: MatBottomSheet) {
  }

  private subscription: Subscription;
  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      if (user) {
        this.userName = user.displayName;
        this.isAdmin = user.email === 'aguacongas@gmail.com';
      } else {
        delete this.userName;
        this.isAdmin = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.auth.signOut();
    delete this.userName;
  }

  navigate(to: string): void {
    this.router.navigate([to]);
  }

  deleteMe(): void {
    this.bottomSheet.open(DeleteUserComponent);

  }
}
