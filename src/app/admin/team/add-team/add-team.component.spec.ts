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

import { AddTeamComponent } from './add-team.component';

describe('AddTeamComponent', () => {
  let component: AddTeamComponent;
  let fixture: ComponentFixture<AddTeamComponent>;

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
      declarations: [ AddTeamComponent ],
      providers: [ { provide: APP_BASE_HREF, useValue: '/'} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
