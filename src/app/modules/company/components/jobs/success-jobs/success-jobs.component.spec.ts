import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessJobsComponent } from './success-jobs.component';

describe('SuccessJobsComponent', () => {
  let component: SuccessJobsComponent;
  let fixture: ComponentFixture<SuccessJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
