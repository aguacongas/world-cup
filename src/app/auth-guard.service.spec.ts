import { TestBed, inject } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { bdd } from 'bdd';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(bdd.firebase),
        AngularFireAuthModule,
        RouterModule.forRoot([])
      ],
      providers: [
        AuthGuardService,
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
