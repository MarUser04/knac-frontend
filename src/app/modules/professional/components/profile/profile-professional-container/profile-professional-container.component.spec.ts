import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProfessionalContainerComponent } from './profile-professional-container.component';

describe('ProfileProfessionalContainerComponent', () => {
  let component: ProfileProfessionalContainerComponent;
  let fixture: ComponentFixture<ProfileProfessionalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileProfessionalContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProfessionalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
