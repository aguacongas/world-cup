import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMatchComponent } from './add-match.component';

describe('AddMatchComponent', () => {
  let component: AddMatchComponent;
  let fixture: ComponentFixture<AddMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
