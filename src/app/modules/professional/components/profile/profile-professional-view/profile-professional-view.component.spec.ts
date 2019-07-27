import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProfessionalViewComponent } from './profile-professional-view.component';

describe('ProfileProfessionalViewComponent', () => {
  let component: ProfileProfessionalViewComponent;
  let fixture: ComponentFixture<ProfileProfessionalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileProfessionalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProfessionalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
