import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatCardModule,
  MatTabsModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot([]),
        MatButtonModule,
        MatCardModule,
        MatTabsModule
      ],
      declarations: [ AdminComponent ],
      providers: [ { provide: APP_BASE_HREF, useValue: '/'} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
