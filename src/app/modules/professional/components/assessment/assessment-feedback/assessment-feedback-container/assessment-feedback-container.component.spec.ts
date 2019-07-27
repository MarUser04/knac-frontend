import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFeedbackContainerComponent } from './assessment-feedback-container.component';

describe('AssessmentFeedbackContainerComponent', () => {
  let component: AssessmentFeedbackContainerComponent;
  let fixture: ComponentFixture<AssessmentFeedbackContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentFeedbackContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentFeedbackContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
