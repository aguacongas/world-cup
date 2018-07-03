import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'wc-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  name: string;
  group: string;
  groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  constructor(private db: AngularFireDatabase,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async submit() {
    try {
      await this.db.list('team').push({ name: this.name, group: this.group });
      this.snackBar.open(`Equipe ${this.name} ajouté`, undefined, { duration: 3000 });
    } catch (e) {
      console.log(e);
      this.snackBar.open(`${e.message}`, 'erreur', { duration: 3000, panelClass: 'text-danger' });
    }
  }
}
