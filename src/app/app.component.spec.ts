import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { MatMenuModule, MatToolbarModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { bdd } from 'bdd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatToolbarModule,
        AngularFireAuthModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(bdd.firebase),
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ { provide: APP_BASE_HREF, useValue: '/'} ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
