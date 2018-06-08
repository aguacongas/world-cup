import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'wc-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  name: string;
  group: string;
  groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
  }

  async submit() {
    try {
      await this.db.list('team').push({ name: this.name, group: this.group });
    } catch (e) {
      console.log(e);
    }
  }
}
