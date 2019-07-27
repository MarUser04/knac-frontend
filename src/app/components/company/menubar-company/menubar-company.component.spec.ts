import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

import { MenubarCompanyComponent } from './menubar-company.component';
import {CoreModule} from '../../../core/core.module';
import {routes} from '../../../modules/company/routes';
import {CompanyModule} from '../../../modules/company/company.module';

describe('MenubarCompanyComponent testing', () => {
  let component: MenubarCompanyComponent;
  let fixture: ComponentFixture<MenubarCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, CompanyModule, RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('menubar navigate to company', () => {
    const href = fixture.debugElement.query(By.css('.companyLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/company');
  });

  it('menubar navigate to company/jobslist', () => {
    const href = fixture.debugElement.query(By.css('.companyJobslistLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/company/jobslist');
  });

  it('menubar navigate to company/professionals', () => {
    const href = fixture.debugElement.query(By.css('.companyProfessionalsLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/company/professionals');
  });

  it('menubar navigate to company/assessment', () => {
    const href = fixture.debugElement.query(By.css('.companyAssessmentsLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/company/assessments');
  });

  it('menubar navigate to company/posts', () => {
    const href = fixture.debugElement.query(By.css('.companyContentLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/company/posts');
  });
});
