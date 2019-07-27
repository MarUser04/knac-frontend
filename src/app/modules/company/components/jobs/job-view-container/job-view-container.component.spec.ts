import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobViewContainerComponent } from './job-view-container.component';

describe('JobViewContainerComponent', () => {
  let component: JobViewContainerComponent;
  let fixture: ComponentFixture<JobViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
