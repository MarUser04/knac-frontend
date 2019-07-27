/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthLinkedinResolverService } from './auth-linkedin-resolver.service';

describe('Service: AuthLinkedinResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLinkedinResolverService]
    });
  });

  it('should ...', inject([AuthLinkedinResolverService], (service: AuthLinkedinResolverService) => {
    expect(service).toBeTruthy();
  }));
});
