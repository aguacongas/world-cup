import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuth } from 'angularfire2';
@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin = false;
  userName: string;

  private auth: FirebaseAuth;

  constructor(private authService: AngularFireAuth, private router: Router) {
    this.auth = authService.auth;
    const user = this.auth.currentUser;
    if (user) {
      this.userName = user.displayName;
      this.isAdmin = user.email === 'aguacongas@gmail.com';
    }
  }

  logout(): void {
    this.authService.auth.signOut();
    delete this.userName;
  }

  navigate(to: string): void {
    this.router.navigate([to]);
  }
}
