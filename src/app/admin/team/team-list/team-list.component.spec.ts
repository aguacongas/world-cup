import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatGridListModule,
  MatListModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { bdd } from 'bdd';

import { TeamListComponent } from './team-list.component';
import { AddTeamComponent } from '../add-team/add-team.component';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot([]),
        MatButtonModule,
        MatGridListModule,
        MatListModule,
        MatSelectModule,
        MatInputModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(bdd.firebase),
        BrowserAnimationsModule
      ],
     declarations: [ AddTeamComponent, TeamListComponent ],
     providers: [ { provide: APP_BASE_HREF, useValue: '/'} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
