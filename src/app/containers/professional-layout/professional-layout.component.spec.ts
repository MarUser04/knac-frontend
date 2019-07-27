import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfessionalLayoutComponent } from './professional-layout.component';
import { MenubarProfessionalComponent } from '../../components/professional/menubar-professional/menubar-professional.component';
import {ProfessionalModule} from '../../modules/professional/professional.module';
import {SharedModule} from '../../shared/shared.module';
import {AuthService} from '../../services/auth/auth.service';
import {SiteStorageService} from '../../services/siteStorage/site-storage.service';

describe('ProfessionalLayoutComponent testing', () => {
  let component: ProfessionalLayoutComponent;
  let fixture: ComponentFixture<ProfessionalLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalLayoutComponent, MenubarProfessionalComponent],
      imports: [ BrowserAnimationsModule, RouterTestingModule, SharedModule, ProfessionalModule],
      providers: [AuthService, SiteStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
