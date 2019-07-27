import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentListContainerComponent } from './assessment-list-container.component';

describe('AssessmentListContainerComponent', () => {
  let component: AssessmentListContainerComponent;
  let fixture: ComponentFixture<AssessmentListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
