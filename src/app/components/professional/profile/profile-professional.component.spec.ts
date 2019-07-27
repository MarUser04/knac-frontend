import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';

import {ProfileProfessionalComponent} from './profile-professional.component';
import {SharedModule} from '../../../shared/shared.module';

describe('ProfileProfessionalComponent testing', () => {
  let profile: ProfileProfessionalComponent;
  let fixture: ComponentFixture<ProfileProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileProfessionalComponent],
      imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProfessionalComponent);
    profile = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(profile).toBeTruthy();
  });

  // it('should create', () => {
  //   profile
  //   expect(profile.setValue(e,)).toBeTruthy();
  // });
});
