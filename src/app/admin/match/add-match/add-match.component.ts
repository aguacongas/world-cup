import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';

import { Team } from '../../../model/team';
import { TimePipeService } from '../../../pipe/time-pipe.service';
import { Days } from './../../../days';

@Component({
  selector: 'wc-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  days = Days;
  time: string;
  times: string[] = [];
  teams: Team[];
  date: Date;
  day: string;
  team1Id: string;
  team2Id: string;

  constructor(private db: AngularFireDatabase,
    private timePipeService: TimePipeService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.db
      .list('team')
      .valueChanges()
      .subscribe((teams: Team[]) => {
        this.teams = teams;
        const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        groups.forEach((group: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H') => {
          this.teams.push({ id: undefined, name: `1er ${group}`, group: group});
          this.teams.push({ id: undefined, name: `2e ${group}`, group: group});
        });
        for (let i = 1; i < 9; i++) {
          this.teams.push({ id: undefined, name: `vainqueur 1/8 ${i}`, group: undefined});
        }
        for (let i = 1; i < 5; i++) {
          this.teams.push({ id: undefined, name: `vainqueur 1/4 ${i}`, group: undefined});
        }
        for (let i = 1; i < 3; i++) {
          this.teams.push({ id: undefined, name: `vainqueur 1/2 ${i}`, group: undefined});
          this.teams.push({ id: undefined, name: `perdant 1/2 ${i}`, group: undefined});
        }
      });
    for (let i = 0; i < 24; i++) {
      this.times.push(this.timePipeService.transform(i));
    }
  }

  async submit() {
    this.date.setHours(+this.time.split(':')[0]);

    try {
      await this.db.list('match').push({
        date: this.date.toISOString(),
        sv: { '.sv': 'timestamp' },
        day: this.day,
        result1: {
          teamId: this.team1Id
        }, result2: {
          teamId: this.team2Id
        }
      });
      this.snackBar.open(`Match ajouté ${this.team1Id} - ${this.team2Id}`, undefined, { duration: 2000 });
    } catch (e) {
      console.error(e);
      this.snackBar.open(`${e.message}`, 'erreur', { duration: 3000, panelClass: 'text-danger' });
    }
  }
}
