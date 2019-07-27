import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFeedbackComponent } from './assessment-feedback.component';

describe('AssessmentFeedbackComponent', () => {
  let component: AssessmentFeedbackComponent;
  let fixture: ComponentFixture<AssessmentFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
