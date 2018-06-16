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
  return () => {
    return new Promise((resolve, reject) => {
      authService.user.subscribe(user => {
        resolve();
        if (user && user.email === bdd.admin) {
          const matches: Match[] = [];
          db.list('match')
            .snapshotChanges()
            .subscribe(changes => {
              changes.forEach(action => {
                const match = action.payload.val() as Match;
                match.date = new Date(match.date);
                match.id = action.key;
                matches.push(match);
              });
            });

          setInterval(() => {
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
          }, 10000);
        }
      });
    });
  };

  async function update(match: Match) {
    try {
      await db.list('match').update(match.id, match);
    } catch (e) {
      console.error(e);
    }
  }
}
