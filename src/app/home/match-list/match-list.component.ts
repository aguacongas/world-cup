import { element } from 'protractor';
import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';

import { Match } from '../../model/match';
import { UserBet } from '../model/user-bet';
import { ScoreService } from './../../score.service';

@Component({
  selector: 'wc-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit, AfterViewChecked {
  @Input() day: string;
  @Input() set userBets(bets: UserBet[]) {
    if (!bets) {
      return;
    }

    this.bets = bets.filter(b => b.match.day === this.day);

    this.bets.forEach(bet => {
      const match = bet.match;
      bet.point = this.scoreService.calcResult(bet);

      if (!this.dates.find(d => d.getFullYear() === match.date.getFullYear()
        && d.getMonth() === match.date.getMonth()
        && d.getDate() === match.date.getDate())) {
          this.dates.push(match.date);
        }
    });
  }

  dates: Date[] = [];

  private bets: UserBet[];
  private scrolledToDate = false;

  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this.bets || this.scrolledToDate) {
      return;
    }
    const now = new Date();
    const index = this.dates.findIndex(d => d.getDate() === now.getDate());
    if (index > -1) {
      try {
        const dayElement = document.querySelector('#day' + (index));
        if (dayElement) {
          dayElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
        this.scrolledToDate = true;
      } catch (e) {
        console.error(e);
       }
    }
  }

  getMatches(date: Date): UserBet[] {
    return this.bets.filter(m => m.match.date.getFullYear() === date.getFullYear()
      && m.match.date.getMonth() === date.getMonth()
      && m.match.date.getDate() === date.getDate());
  }

  matchStarted(match: Match): boolean {
    return match.date < new Date();
  }
}
