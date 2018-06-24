import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Match } from '../../../model/match';
import { Days } from '../../../days';

@Component({
  selector: 'wc-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  days = Days;
  matches: Match[];

  constructor(private db: AngularFireDatabase, private router: Router) {}

  ngOnInit() {
    this.db
      .list('match')
      .snapshotChanges()
      .subscribe(changes => {
        this.matches = [];
        changes.forEach(action => {
          const match = action.payload.val() as Match;
          match.date = new Date(match.date);
          match.id = action.key;
          this.matches.push(match);
        });
      });
  }

  navigate(to: string): void {
    this.router.navigate([`admin/match/${to}`]);
  }

  getMatches(day: string): Match[] {
    if (this.matches) {
      return this.matches
        .filter(value => value.day === day)
        .sort((a, b) => {
          if (a.date === b.date) {
            return 0;
          }
          if (a.date > b.date) {
            return 1;
          }

          return -1;
        });
    }
  }

  async submit(match: Match) {
    try {
      await this.db.list('match').update(match.id, match);
    } catch (e) {
      console.error(e);
    }
  }

  setHours(match: Match, hours: string): void {
    const data = hours.split(':');
    match.date.setHours(+data[0], 0);
  }
}
