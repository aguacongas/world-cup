import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';

import { Match } from './model/match';
import { RootObject } from './model/fifa';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private matches: Match[] = [];

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }

  autoupdate(): void {
    this.db.list('match')
      .snapshotChanges()
      .subscribe(changes => {
        changes.forEach(action => {
          if (action.type !== 'value') {
            return;
          }
          const match = action.payload.val() as Match;
          if (!this.matches.find(m => m.id === action.key)) {
            match.date = new Date(match.date);
            match.id = action.key;
            this.matches.push(match);
          }
        });
    });

    setInterval(() => {
      this.onInterval();
    }, 10000);
  }

  private onInterval() {
    const now = new Date();
    const currents = this.matches.filter(m => m.date <= now && !m.finished);
    if (currents.length > 0) {
      this.http.get('https://api.fifa.com/api/v1/live/football/now?language=fr-FR')
        .subscribe((data: RootObject) => {
          if (data && data.Results) {
            const results = data.Results;
            results.forEach(result => {
              const match = currents.find(m => m.result1.teamId === result.HomeTeam.TeamName[0].Description);
              if (match) {
                if (match.finished === undefined) {
                  this.update(match.id, 'finished', false);
                  match.finished = false;
                }
                if (result.HomeTeam.Score !== match.result1.score) {
                  this.update(`${match.id}/result1`, 'score', result.HomeTeam.Score);
                  match.result1.score = result.HomeTeam.Score;
                }
                if (result.AwayTeam.Score !== match.result2.score) {
                  this.update(`${match.id}/result2`, 'score', result.AwayTeam.Score);
                  match.result2.score = result.AwayTeam.Score;
                }
              }
            });
            const finished = currents.find(m => !m.finished
              && results.findIndex(r => r.HomeTeam.TeamName[0].Description === m.result1.teamId) === -1);
            if (finished) {
              this.update(finished.id, 'finished', true);
              finished.finished = true;
            }
          }
        }, e => {
          console.error(e);
        });
    }
  }

  private async update(path: string, field: string, value: any) {
    try {
      await this.db.list(`match/${path}`).set(field, value);
    } catch (e) {
      console.error(e);
    }
  }
}
