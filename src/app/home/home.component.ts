import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase/app';
import { Subscription } from 'rxjs';

import { Bet } from '../model/bet';
import { Match } from '../model/match';
import { UserBet } from './model/user-bet';
import { Provider } from './model/provider';
import { AuthProvider } from '@firebase/auth-types';

@Component({
  selector: 'wc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  days = [
    'Jour 1',
    'Jour 2',
    'Jour 3',
    '1/8',
    '1/4',
    '1/2',
    '3e place',
    'Finale'
  ];
  selectDayIndex = 0;
  providers: Provider[] = [
    {
      id: 'google.com',
      name: 'Google',
      disabled: false,
      authProvider: new auth.GoogleAuthProvider()
    },
    {
      id: 'facebook.com',
      name: 'Facebook',
      disabled: false,
      authProvider: new auth.FacebookAuthProvider()
    },
    {
      id: 'twitter.com',
      name: 'Twitter',
      disabled: false,
      authProvider: new auth.TwitterAuthProvider()
    },
    {
      id: 'github.com',
      name: 'Github',
      disabled: false,
      authProvider: new auth.GithubAuthProvider()
    }
  ];
  loginError: string;

  user: User;
  userBets: UserBet[];
  isIe = false;

  private bets: Bet[];
  private matches: Match[];
  private setDisplayName = true;
  subscription: Subscription;

  constructor(
    private authService: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.isIe =
      window.navigator.userAgent.indexOf('MSIE ') > 0 ||
      !!navigator.userAgent.match(/Trident.*rv\:11\./);
  }

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      this.user = user;
      if (!user) {
        const authentication = this.authService.auth;
        authentication
          .getRedirectResult()
          .then(result => {
            this.user = result.user as User;
            this.getData();
          })
          .catch(error => {
            if (
              error.code === 'auth/account-exists-with-different-credential'
            ) {
              const email = error.email;
              authentication.fetchSignInMethodsForEmail(email).then(methods => {
                const recommendedMethod = methods[0];
                const provider = this.providers.find(
                  p => p.id === recommendedMethod
                );
                this.providers.forEach(p => {
                  p.disabled = true;
                });
                provider.disabled = false;
                this.loginError = `Tu t'es deja connecté avec ${
                  provider.name
                } ! Click sur ${provider.name}`;
              });
            } else {
              console.error(error);
            }
          });
      } else {
        this.getData();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(provider: AuthProvider) {
    const authService = this.authService.auth;
    authService.signInWithRedirect(provider);
  }

  async submit() {
    try {
      this.userBets.forEach(async b => {
        const bet = b.bet;
        if (
          !bet.score1 &&
          bet.score1 !== 0 &&
          !bet.score2 &&
          bet.score2 !== 0
        ) {
          await this.db.list(`bets/${this.user.uid}`).remove(bet.matchId);
          return;
        }
        const data = {};
        if (bet.score1 || bet.score1 === 0) {
          data['score1'] = bet.score1;
        }
        if (bet.score2 || bet.score2 === 0) {
          data['score2'] = bet.score2;
        }

        await this.db.list(`bets/${this.user.uid}`).set(bet.matchId, data);
      });
    } catch (e) {
      console.error(e);
    }

    if (this.setDisplayName) {
      try {
        await this.db
          .list(`bets/${this.user.uid}`)
          .set('displayName', this.user.displayName);
      } catch (e) {
        console.error(e);
      }
    }
  }

  private getData() {
    if (this.user) {
      this.db
        .list(`bets/${this.user.uid}`)
        .snapshotChanges()
        .subscribe(changes => {
          this.bets = [];
          changes.forEach(action => {
            const bet = <Bet>action.payload.val();
            if (bet.score1 ||
              bet.score1 === 0 ||
              bet.score2 ||
              bet.score2 === 0) {
              bet.matchId = action.key;
              this.bets.push(bet);
              this.setDisplayName = false;
            }
          });
          this.merge();
        });
    } else {
      this.bets = [];
    }
    this.matches = [];
    this.db
      .list('match')
      .snapshotChanges()
      .subscribe(changes => {
        changes.forEach(action => {
          if (action.type === 'value') {
            if (!this.matches.find(m => m.id === action.key)) {
              const match = action.payload.val() as Match;
              match.date = new Date(match.date);
              match.id = action.key;
              this.matches.push(match);
            }
          } else if (action.type === 'child_changed') {
            const oldValue = this.matches.find(m => m.id === action.key);
            if (oldValue) {
              const match = action.payload.val() as Match;
              match.date = new Date(match.date);
              match.id = action.key;
              for(const key  in match) {
                if (match.hasOwnProperty(key)) {
                  oldValue[key] = match[key];
                }
              }
            }
          }
        });
        this.merge();
      });
  }

  private merge(): void {
    if (!this.matches || !this.bets) {
      return;
    }

    this.userBets = this.matches.map<UserBet>(m => {
      const bet = this.bets.find(b => b.matchId === m.id);
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

    const now = new Date();
    const matchToDay = this.matches.find(m => m.date >= now);
    if (matchToDay) {
      this.selectDayIndex = this.days.findIndex(d => d === matchToDay.day);
    }
  }
}
