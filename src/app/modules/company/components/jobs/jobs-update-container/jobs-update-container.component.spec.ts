import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsUpdateContainerComponent } from './jobs-update-container.component';

describe('JobsUpdateContainerComponent', () => {
  let component: JobsUpdateContainerComponent;
  let fixture: ComponentFixture<JobsUpdateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsUpdateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsUpdateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
