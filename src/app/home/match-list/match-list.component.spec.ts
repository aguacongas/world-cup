import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
   MatTabsModule,
   MatFormFieldModule,
   MatListModule,
   MatGridListModule,
   MatCardModule
} from '@angular/material';
import { PipeModule } from '../../pipe/pipe.module';
import { AngularFireModule } from 'angularfire2';
import { bdd } from 'bdd';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MatchListComponent } from './match-list.component';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatTabsModule,
        PipeModule,
        MatFormFieldModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        AngularFireModule.initializeApp(bdd.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        BrowserAnimationsModule
      ],
      declarations: [ MatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
