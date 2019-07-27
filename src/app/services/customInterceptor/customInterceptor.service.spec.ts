/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomInterceptorService } from './customInterceptor.service';

describe('Service: CustomInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomInterceptorService]
    });
  });

  it('should ...', inject([CustomInterceptorService], (service: CustomInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
