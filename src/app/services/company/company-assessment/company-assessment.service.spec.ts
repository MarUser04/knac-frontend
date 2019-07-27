/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyAssessmentService } from './company-assessment.service';

describe('Service: Assessment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyAssessmentService]
    });
  });

  it('should ...', inject([CompanyAssessmentService], (service: CompanyAssessmentService) => {
    expect(service).toBeTruthy();
  }));
});
