import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsListContainerComponent } from './jobs-list-container.component';

describe('JobsListContainerComponent', () => {
  let component: JobsListContainerComponent;
  let fixture: ComponentFixture<JobsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
