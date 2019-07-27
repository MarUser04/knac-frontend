import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CompanyLayoutComponent } from './company-layout.component';
import { MenubarCompanyComponent } from '../../components/company/menubar-company/menubar-company.component';
import {SharedModule} from '../../shared/shared.module';
import {AuthService} from '../../services/auth/auth.service';
import {SiteStorageService} from '../../services/siteStorage/site-storage.service';

describe('CompanyLayoutComponent testing', () => {
  let component: CompanyLayoutComponent;
  let fixture: ComponentFixture<CompanyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLayoutComponent, MenubarCompanyComponent ],
      imports: [ BrowserAnimationsModule, SharedModule, RouterTestingModule ],
      providers: [AuthService, SiteStorageService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
