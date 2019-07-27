import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {NgModuleFactoryLoader} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { routes } from './routes';
import {CompanyRoutingModule} from './company-routing.module';
import {CoreModule} from '../../core/core.module';
import { CompanyModule } from './company.module';

describe('Company tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CompanyModule,
        RouterTestingModule.withRoutes(routes),
        CompanyRoutingModule,
      ],
      providers: [
        AuthService
      ]
    });
  });

  it('can navigate to company', async(() => {
    TestBed.get(Router)
      .navigate(['/company'])
        .then(() => {
          expect(location.pathname.endsWith('/company/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to company/jobslist', async(() => {
    TestBed.get(Router)
      .navigate(['/company/jobslist/'])
        .then(() => {
          expect(location.pathname.endsWith('/company/jobslist/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to company/professionals', async(() => {
    TestBed.get(Router)
      .navigate(['/company/professionals/'])
        .then(() => {
          expect(location.pathname.endsWith('/company/professionals/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to company/assessments', async(() => {
    TestBed.get(Router)
      .navigate(['/company/assessments/'])
        .then(() => {
          expect(location.pathname.endsWith('/company/assessments/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to company/profile', async(() => {
    TestBed.get(Router)
      .navigate(['/company/profile/'])
        .then(() => {
          expect(location.pathname.endsWith('/company/profile/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to company/account', async(() => {
    TestBed.get(Router)
      .navigate(['/company/account/'])
        .then(() => {
          expect(location.pathname.endsWith('/company/account/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to company/posts', async(() => {
    TestBed.get(Router)
      .navigate(['/company/posts/'])
        .then(() => {
          expect(location.pathname.endsWith('/company/posts/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to company/post/id', async(() => {
    TestBed.get(Router)
      .navigate(['/company/post/40/'])
        .then(() => {
          expect(location.pathname.endsWith('/company/post/40/')).toBe(true);
        }).catch(e => console.log(e));
  }));


});
