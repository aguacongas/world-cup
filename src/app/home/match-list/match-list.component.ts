import { Component, OnInit, Input } from '@angular/core';

import { Match } from '../../model/match';
import { UserBet } from '../model/user-bet';

@Component({
  selector: 'wc-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  @Input() day: string;
  @Input() set userBets(bets: UserBet[]) {
    if (!bets) {
      return;
    }

    this.bets = bets.filter(b => b.match.day === this.day);

    this.bets.forEach(bet => {
      const match = bet.match;
      match.date = new Date(match.date);
      if (match.date < new Date()) {
        bet.point = this.calcResult(bet);
      }
      if (!this.dates.find(d => d.getFullYear() === match.date.getFullYear()
        && d.getMonth() === match.date.getMonth()
        && d.getDate() === match.date.getDate())) {
          this.dates.push(match.date);
        }
    });
  }

  dates: Date[] = [];

  private bets: UserBet[];

  constructor() {
  }

  ngOnInit() {
  }

  getMatches(date: Date): UserBet[] {
    return this.bets.filter(m => m.match.date.getFullYear() === date.getFullYear()
      && m.match.date.getMonth() === date.getMonth()
      && m.match.date.getDate() === date.getDate());
  }

  matchStarted(match: Match): boolean {
    return match.date < new Date();
  }

  private calcResult(userBet: UserBet): number {
    const bet = userBet.bet;
    if (bet.score1 || bet.score1 === 0 && bet.score2 || bet.score2 === 0) {
      const match = userBet.match;
      const score1 = match.result1.score;
      const score2 = match.result2.score;
      if (score1 === bet.score1 && score2 === bet.score2) {
        return 3;
      }
      if (score1 === score2 && bet.score1 === bet.score2) {
        return 1;
      }
      if (score1 === score2 && bet.score1 === bet.score2) {
        return 1;
      }
      if (score1 > score2 && bet.score1 > bet.score2) {
        return 1;
      }
      if (score1 < score2 && bet.score1 < bet.score2) {
        return 1;
      }
    }

    return 0;
  }
}
