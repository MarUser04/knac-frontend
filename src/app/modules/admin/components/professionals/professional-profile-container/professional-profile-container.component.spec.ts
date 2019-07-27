import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalProfileContainerComponent } from './professional-profile-container.component';

describe('ProfessionalProfileContainerComponent', () => {
  let component: ProfessionalProfileContainerComponent;
  let fixture: ComponentFixture<ProfessionalProfileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalProfileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalProfileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
