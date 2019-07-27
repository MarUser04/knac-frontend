import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';

import {ProfileCompanyComponent} from './profile-company.component';
import {SharedModule} from '../../../shared/shared.module';

describe('ProfileCompanyComponent testing', () => {
  let component: ProfileCompanyComponent;
  let fixture: ComponentFixture<ProfileCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCompanyComponent],
      imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
