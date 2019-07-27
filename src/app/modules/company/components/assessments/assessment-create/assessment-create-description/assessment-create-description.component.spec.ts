import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCreateDescriptionComponent } from './assessment-create-description.component';

describe('AssessmentCreateDescriptionComponent', () => {
  let component: AssessmentCreateDescriptionComponent;
  let fixture: ComponentFixture<AssessmentCreateDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentCreateDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCreateDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
