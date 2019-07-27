import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSuccessComponent } from './job-success.component';

describe('JobSuccessComponent', () => {
  let component: JobSuccessComponent;
  let fixture: ComponentFixture<JobSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
