import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
} from '@angular/material';
import { PipeModule } from '../../../pipe/pipe.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { bdd } from 'bdd';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatchListComponent } from './match-list.component';
import { AddMatchComponent } from '../add-match/add-match.component';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        PipeModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(bdd.firebase),
        RouterModule.forRoot([]),
        BrowserAnimationsModule
      ],
      declarations: [ AddMatchComponent, MatchListComponent ],
      providers: [ { provide: APP_BASE_HREF, useValue: '/'} ]
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
