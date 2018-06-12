import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MatFormFieldModule, MatListModule, MatCardModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponent } from './ranking.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { bdd } from 'bdd';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatListModule,
        MatCardModule,
        AngularFireModule.initializeApp(bdd.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule
      ],
      declarations: [ RankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
