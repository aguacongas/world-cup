import { AppModule } from './app.module';
import { TestBed, inject } from '@angular/core/testing';

import { AdminGuardService } from './admin-guard.service';
import { APP_BASE_HREF } from '@angular/common';

describe('AdminGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [AdminGuardService, { provide: APP_BASE_HREF, useValue: '/'}]
    });
  });

  it('should be created', inject([AdminGuardService], (service: AdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
