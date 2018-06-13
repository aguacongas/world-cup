import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppComponent } from '../app.component';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'wc-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AppComponent>,
    private authService: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  deleteMe(): void {
    this.bottomSheetRef.dismiss();
    const user = this.authService.auth.currentUser;
    const uid = user.uid;
    this.authService.auth.signOut();
    user.delete()
      .then(_ => {
        this.db.list('bets').remove(uid).catch(e => console.error(e));
      })
      .catch(e => console.log(e));
  }
}
