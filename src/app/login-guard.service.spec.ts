import { RouterModule } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { APP_BASE_HREF } from '@angular/common';

import { bdd } from 'bdd';

import { LoginGuardService } from './login-guard.service';

describe('LoginGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(bdd.firebase),
        AngularFireAuthModule,
        RouterModule.forRoot([])
      ],
      providers: [
        LoginGuardService,
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  it('should be created', inject([LoginGuardService], (service: LoginGuardService) => {
    expect(service).toBeTruthy();
  }));
});
