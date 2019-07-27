/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomeGuardService } from './home-guard.service';

describe('Service: HomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeGuardService]
    });
  });

  it('should ...', inject([HomeGuardService], (service: HomeGuardService) => {
    expect(service).toBeTruthy();
  }));
});
