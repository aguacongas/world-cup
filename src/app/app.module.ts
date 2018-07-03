import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatBottomSheetModule,
  MatSnackBarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { bdd } from '../environments/bdd';
import { HomeComponent } from './home/home.component';
import { MatchListComponent } from './home/match-list/match-list.component';
import { PipeModule } from './pipe/pipe.module';
import { ScoreService } from './score.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateService } from './update.service';
import { NotifyService } from './notify.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchListComponent,
    DeleteUserComponent
  ],
  entryComponents: [DeleteUserComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(bdd.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    PipeModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: boot,
      deps: [AngularFireAuth, NotifyService, UpdateService],
      multi: true
    },
    NotifyService,
    UpdateService,
    ScoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function boot(
  authService: AngularFireAuth,
  notifyService: NotifyService,
  updateService: UpdateService
): Function {
  return () => {
    return new Promise(resolve => {
      authService.user.subscribe(user => {
        resolve();
        if (window && window['Notification']) {
          if (Notification['permission'] === 'granted') {
            notifyService.listen();
          } else if (Notification['permission'] !== 'denied') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                notifyService.listen();
              }
            });
          }
        }

        if (user && user.email === bdd.admin) {
          updateService.autoupdate();
        }
      });
    });
  };
}
