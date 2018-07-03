import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Match } from '../../../model/match';
import { Days } from '../../../days';

@Component({
  selector: 'wc-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit, AfterViewChecked {
  days = Days;
  matches: Match[] = [];

  private scrolledToDate = false;
  constructor(private db: AngularFireDatabase,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.db
      .list('match')
      .snapshotChanges()
      .subscribe(changes => {
        changes.forEach(action => {
          const match = action.payload.val() as Match;
          match.date = new Date(match.date);
          match.id = action.key;
          const oldValue = this.matches.find(m => m.id === action.key);
          if (!oldValue) {
            this.matches.push(match);
          } else {
            for (const key in match) {
              if (match.hasOwnProperty(key)) {
                oldValue[key] = match[key];
              }
            }
          }
        });
      });
  }

  ngAfterViewChecked() {
    if (this.scrolledToDate) {
      return;
    }
    const now = new Date();
    const match = this.matches.find(m => m.date.getDate() >= now.getDate());
    if (match) {
      const index = this.days.findIndex(d => d === match.day);
      try {
        const dayElement = document.querySelector('#day' + (index));
        if (dayElement) {
          dayElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        this.scrolledToDate = true;
      } catch (e) {
        console.error(e);
       }
    }
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
      const result1 = match.result1;
      const result2 = match.result2;
      await this.db.list('match').update(match.id, {
        date: match.date.toISOString(),
        sv: match.date.getTime(),
        day: match.day,
        result1: result1,
        result2: result2
      });
      this.snackBar.open(`Match mis à jour ${match.result1.teamId} - ${match.result2.teamId}`, undefined, { duration: 2000 });
    } catch (e) {
      console.error(e);
      this.snackBar.open(`${e.message}`, 'erreur', { duration: 3000, panelClass: 'text-danger' });
    }
  }

  setHours(match: Match, hours: string): void {
    const data = hours.split(':');
    match.date.setHours(+data[0], +data[1]);
  }
}
