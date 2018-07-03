import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';

import { Ranking } from '../model/ranking';
import { Match } from '../../model/match';
import { Bet } from '../../model/bet';
import { ScoreService } from '../../score.service';

@Component({
  selector: 'wc-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {
  displayName: string;
  user: User;
  scores: Ranking[];

  private subscription: Subscription;

  constructor(
    private authService: AngularFireAuth,
    private db: AngularFireDatabase,
    private calcService: ScoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      this.user = user;

      this.db
        .list('bets')
        .snapshotChanges()
        .subscribe(changes => {
          this.db
            .list('match')
            .snapshotChanges()
            .subscribe(matchchanges => {
              const matches = [];
              matchchanges.forEach(action => {
                const match = action.payload.val() as Match;
                this.scores = [];
                match.id = action.key;
                matches.push(match);
              });

              changes.forEach((change) => {
                const bets = [];
                const data: any = change.payload.val();
                for (const key in data) {
                  if (data.hasOwnProperty(key) && key !== 'displayName') {
                    const bet = data[key] as Bet;
                    bet.matchId = key;
                    bets.push(bet);
                  }
                }

                const userBets = this.calcService.merge(matches, bets);
                this.calcService.calcResults(userBets);
                let score = 0;
                userBets.forEach(bet => {
                  if (bet.point) {
                    score = score + bet.point;
                  }
                });
                const isUser = this.user && change.key === this.user.uid;
                if (isUser) {
                  this.displayName = data.displayName;
                }
                this.scores.push({
                  rank: undefined,
                  userName: data.displayName,
                  score: score,
                  isUser: isUser
                });
              });

              this.scores.sort(
                (a, b) => (a.score === b.score ? 0 : a.score > b.score ? -1 : 1)
              );
              this.scores.forEach((s, i) => {
                s.rank = i + 1;
              });
              for (let i = 0; i < this.scores.length - 1; i++) {
                const current = this.scores[i];
                let some = false;
                this.scores.filter(r => r.score === current.score && r.rank !== current.rank)
                  .forEach((r, j, a) => {
                    some = true;
                    delete r.rank;
                    if (j < a.length - 1) {
                      delete r.score;
                    }
                    i++;
                  });
                if (some) {
                  delete current.score;
                }
              }
            });
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async submit() {
    try {
      await this.db
        .list(`bets/${this.user.uid}`)
        .set('displayName', this.displayName);
      this.snackBar.open('Pseudo enregistré', undefined, { duration: 2000 });
    } catch (e) {
      console.error(e);
      this.snackBar.open(`${e.message}`, 'erreur', { duration: 3000, panelClass: 'text-danger' });
    }
  }
}
