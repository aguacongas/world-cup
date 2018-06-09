import { Injectable } from '@angular/core';
import { UserBet } from './home/model/user-bet';
import { Match } from './model/match';
import { Bet } from './model/bet';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  merge(matches: Match[], bets: Bet[]): UserBet[] {
    if (!matches || !bets) {
      return;
    }

    return matches
      .map<UserBet>(m => {
        const bet = bets.find(b => b.matchId === m.id);
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

  calcResults(userBets: UserBet[]): void {
    userBets.forEach(bet => {
      bet.point = this.calcResult(bet);
    });
  }

  calcResult(userBet: UserBet): number {
    const bet = userBet.bet;
    const match = userBet.match;
    const now = new Date();

    match.date = new Date(match.date);
    if (match.date > now) {
      return;
    }

    if (bet.score1 || bet.score1 === 0 && bet.score2 || bet.score2 === 0) {
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
