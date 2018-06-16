import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,
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
  MatBottomSheetModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { bdd } from '../environments/bdd';
import { HomeComponent } from './home/home.component';
import { MatchListComponent } from './home/match-list/match-list.component';
import { PipeModule } from './pipe/pipe.module';
import { ScoreService } from './score.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { Match } from './model/match';
import { RootObject } from './model/fifa';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MatchListComponent,
    DeleteUserComponent
  ],
  entryComponents: [
    DeleteUserComponent
  ],
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
    PipeModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: boot,
      deps: [AngularFireAuth, AngularFireDatabase, HttpClient],
      multi: true
    },
    ScoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function boot(authService: AngularFireAuth, db: AngularFireDatabase, http: HttpClient): Function {
  const matches: Match[] = [];
  return () => {
    return new Promise((resolve, reject) => {
      authService.user.subscribe(user => {
        resolve();
        db.list('match')
          .snapshotChanges()
          .subscribe(changes => {
            changes.forEach(action => {
              const match = action.payload.val() as Match;
              if (!matches.find(m => m.id === action.key)) {
                match.date = new Date(match.date);
                match.id = action.key;
                matches.push(match);
              }
            });
          });

        if (window && window['Notification']) {
          if (Notification['permission'] === 'granted') {
            listen();
          } else if (Notification['permission'] !== 'denied') {
            Notification
              .requestPermission()
              .then(permission => {
                if (permission === 'granted') {
                  listen();
                }
            });
          }
        }

        if (user && user.email === bdd.admin) {
          setInterval(() => {
            autoupdate();
          }, 10000);
        }
      });
    });
  };

  function listen() {
    db.list('match')
      .snapshotChanges()
      .subscribe(changes => {
        changes.forEach(action => {
          if (action.type !==  'child_changed') {
            return;
          }
          const match = action.payload.val() as Match;
          const found = matches.find(m => m.id === action.key);
          if (found && match.finished !== undefined) {
            let message = `${match.result1.teamId} - ${match.result2.teamId}`;
            if (found.finished !== match.finished) {
              found.finished = match.finished;
              if (match.finished === false) {
                notify('C\'est partit', message);
              } else {
                notify('C\'est fini', message);
              }
            } else if (match.result1.score || match.result2.score) {
              message = message + `\n${match.result1.score} - ${match.result2.score}`;
              notify('Gooooal', message);
            }
          }
        });
      });
  }

  function notify(title: string, message: string) {
    const option = {
      body: message
    };
    const n = new Notification(title, option);
    n.onclick = () => {
      n.close.bind(n);
    };
    setTimeout(n.close.bind(n), 5000);
  }

  function autoupdate() {
    const now = new Date();
    const currents = matches.filter(m => m.date <= now && !m.finished);
    if (currents.length > 0) {
      http.get('https://api.fifa.com/api/v1/live/football/now?language=fr-FR')
        .subscribe((data: RootObject) => {
          if (data && data.Results) {
            const results = data.Results;
            results.forEach(result => {
              const match = currents.find(m => m.result1.teamId === result.HomeTeam.TeamName[0].Description);
              if (match) {
                match.finished = false;
                if (result.HomeTeam.Score !== match.result1.score) {
                  match.result1.score = result.HomeTeam.Score;
                  update(match);
                }
                if (result.AwayTeam.Score !== match.result2.score) {
                  match.result2.score = result.AwayTeam.Score;
                  update(match);
                }
              }
            });
            const finished = currents.find(m => m.finished === false
              && results.findIndex(r => r.HomeTeam.TeamName[0].Description === m.result1.teamId) === -1);
            if (finished) {
              finished.finished = true;
              update(finished);
            }
          }
        }, e => {
          console.error(e);
        });
    }
  }

  async function update(match: Match) {
    try {
      await db.list('match').update(match.id, match);
    } catch (e) {
      console.error(e);
    }
  }
}
