import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFeedbackSuccessComponent } from './assessment-feedback-success.component';

describe('AssessmentFeedbackSuccessComponent', () => {
  let component: AssessmentFeedbackSuccessComponent;
  let fixture: ComponentFixture<AssessmentFeedbackSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentFeedbackSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentFeedbackSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
