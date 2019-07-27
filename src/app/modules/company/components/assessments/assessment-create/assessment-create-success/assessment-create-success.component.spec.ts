import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCreateSuccessComponent } from './assessment-create-success.component';

describe('AssessmentCreateSuccessComponent', () => {
  let component: AssessmentCreateSuccessComponent;
  let fixture: ComponentFixture<AssessmentCreateSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentCreateSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCreateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
