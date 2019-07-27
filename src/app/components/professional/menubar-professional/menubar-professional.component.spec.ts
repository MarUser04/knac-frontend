import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {  RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

import { MenubarProfessionalComponent } from './menubar-professional.component';
import {CoreModule} from '../../../core/core.module';
import {routes} from '../../../modules/professional/routes';
import {ProfessionalModule} from '../../../modules/professional/professional.module';

describe('MenubarProfessionalComponent testing', () => {
  let component: MenubarProfessionalComponent;
  let fixture: ComponentFixture<MenubarProfessionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, ProfessionalModule, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('menubar navigate to professional', () => {
    const href = fixture.debugElement.query(By.css('.professionalLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/professional');
  });

  it('menubar navigate to professional/jobslist', () => {
    const href = fixture.debugElement.query(By.css('.professionalJobslistLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/professional/jobslist');
  });

  it('menubar navigate to professional/assessment', () => {
    const href = fixture.debugElement.query(By.css('.professionalAssessmentLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/professional/assessments');
  });

  it('menubar navigate to professional/posts', () => {
    const href = fixture.debugElement.query(By.css('.professionalContentLink')).nativeElement.getAttribute('href');
    expect(href).toEqual('/professional/posts');
  });
});
