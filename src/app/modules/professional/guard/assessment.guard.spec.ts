import { TestBed, async, inject } from '@angular/core/testing';

import { AssessmentGuard } from './assessment.guard';

describe('AssessmentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentGuard]
    });
  });

  it('should ...', inject([AssessmentGuard], (guard: AssessmentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
