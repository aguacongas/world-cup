import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Match } from './model/match';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private matches: Match[] = [];

  constructor(private db: AngularFireDatabase) {}

  listen() {
    this.db.list('match')
      .snapshotChanges()
      .subscribe(changes => {
        changes.forEach(action => {
          if (action.type !== 'value') {
            return;
          }
          const match = action.payload.val() as Match;
          if (!this.matches.find(m => m.id === action.key)) {
            match.date = new Date(match.date);
            match.id = action.key;
            this.matches.push(match);
          }
        });
    });

    this.db
      .list('match')
      .snapshotChanges()
      .subscribe(changes => {
        changes.forEach(action => {
          if (action.type !== 'child_changed') {
            return;
          }
          const match = action.payload.val() as Match;
          const found = this.matches.find(m => m.id === action.key);
          if (found && match.finished !== undefined) {
            let message = `${match.result1.teamId} - ${match.result2.teamId}`;
            if (found.finished !== match.finished) {
              found.finished = match.finished;
              if (match.finished === false) {
                this.notify('C\'est partit', message);
              } else {
                this.notify('C\'est fini', message);
              }
            } else if (
              (match.result1.score || match.result2.score) &&
              (match.result1.score !== found.result1.score ||
                match.result2.score !== found.result2.score)) {
                message =
                  message + `\n${match.result1.score} - ${match.result2.score}`;
                found.result1.score = match.result1.score;
                found.result2.score = match.result2.score;
                this.notify('Gooooal', message);
            }
          }
        });
      });
  }

  private notify(title: string, message: string) {
    const option = {
      body: message
    };
    const n = new Notification(title, option);
    n.onclick = () => {
      n.close.bind(n);
    };
  }
}
