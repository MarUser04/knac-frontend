import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCreatePreviewComponent } from './assessment-create-preview.component';

describe('AssessmentCreatePreviewComponent', () => {
  let component: AssessmentCreatePreviewComponent;
  let fixture: ComponentFixture<AssessmentCreatePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentCreatePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCreatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
