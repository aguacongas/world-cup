import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Bet } from '../model/bet';
import { Match } from '../model/match';
import { UserBet } from './model/user-bet';
import { Observable } from '@firebase/util';

@Component({
  selector: 'wc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  days = [
    'Jour 1',
    'Jour 2',
    'Jour 3',
    '1/8',
    '1/4',
    '1/2',
    '3e place',
    'Finale'
  ];

  user: User;
  userBets: UserBet[];

  private bets: Bet[];
  private matches: Match[];

  constructor(authService: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = authService.auth.currentUser;
  }

  ngOnInit() {
    this.db.list(`bets/${this.user.uid}`)
      .snapshotChanges()
      .subscribe(changes => {
        this.bets = [];
        changes.forEach(action => {
          const bet = <Bet>action.payload.val();
          if (bet.score1 || bet.score1 === 0 || bet.score2 || bet.score2 === 0) {
            bet.matchId = action.key;
            this.bets.push(bet);
          }
        });
        this.merge();
      });

    this.db
      .list('match')
      .snapshotChanges()
      .subscribe(changes => {
        this.matches = [];
        changes.forEach(action => {
          const match = action.payload.val() as Match;
          match.id = action.key;
          this.matches.push(match);
        });
        this.merge();
      });
  }

  async submit() {
    try {
      await this.db.list(`bets/${this.user.uid}`).set('displayName', this.user.displayName);
      this.userBets.forEach(async b => {
        const bet = b.bet;
        if (!bet.score1 && bet.score1 !== 0 && !bet.score2 && bet.score2 !== 0) {
          await this.db.list(`bets/${this.user.uid}`).remove(bet.matchId);
          return;
        }
        const data = {};
        if (bet.score1 || bet.score1 === 0) {
          data['score1'] = bet.score1;
        }
        if (bet.score2 || bet.score2 === 0) {
          data['score2'] = bet.score2;
        }

        await this.db.list(`bets/${this.user.uid}`).set(bet.matchId, data);
      });
    } catch (e) {
      console.error(e);
    }
  }

  private merge(): void {
    if (!this.matches || !this.bets) {
      return;
    }

    this.userBets = this.matches
      .map<UserBet>(m => {
        const bet = this.bets.find(b => b.matchId === m.id);
        return {
          bet: {
            score1: bet ? bet.score1 : undefined,
            score2: bet ? bet.score2 : undefined,
            matchId: m.id
          },
          match: m,
          info: undefined,
          point: undefined
        };
      });
  }
}
