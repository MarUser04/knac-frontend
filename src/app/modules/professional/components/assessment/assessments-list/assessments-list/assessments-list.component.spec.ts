import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';

import { AssessmentsListComponent } from './assessments-list.component';
import {SharedModule} from '../../../shared/shared.module';

describe('AssessmentsListComponent', () => {
  let component: AssessmentsListComponent;
  let fixture: ComponentFixture<AssessmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
