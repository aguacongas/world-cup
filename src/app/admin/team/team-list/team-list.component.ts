import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Team } from '../../../model/team';

@Component({
  selector: 'wc-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  teams: Team[];
  constructor(private db: AngularFireDatabase, private router: Router) {}

  ngOnInit() {
    this.db
      .list('team')
      .valueChanges()
      .subscribe((teams: Team[]) => {
        this.teams = teams;
      });
  }

  navigate(to: string): void {
    this.router.navigate([`admin/team/${to}`]);
  }

  getGroup(name: string): string[] {
    if (this.teams) {
      const result = [];
      this.teams
        .filter(value => value.group === name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(t => result.push(t.name));

      return result;
    }
  }
}
