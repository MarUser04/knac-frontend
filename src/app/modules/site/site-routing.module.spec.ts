import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {NgModuleFactoryLoader} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { routes } from './routes';
import {SiteRoutingModule} from './site-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {SiteModule} from './site.module';

describe('Site tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        SiteModule,
        RouterTestingModule.withRoutes(routes),
        SiteRoutingModule,
      ],
      providers: [
        AuthService
      ]
    });
  });

  it('can navigate to Login', async(() => {
    TestBed.get(Router)
      .navigate([''])
        .then(() => {
          expect(location.pathname.endsWith('')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to signup', async(() => {
    TestBed.get(Router)
      .navigate(['#/signup'])
        .then(() => {
          expect(location.hash.endsWith('#/signup')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to signup/professional', async(() => {
    TestBed.get(Router)
      .navigate(['#/signup/professional'])
        .then(() => {
          expect(location.hash.endsWith('#/signup/professional')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to terms', async(() => {
    TestBed.get(Router)
      .navigate(['#/terms'])
        .then(() => {
          expect(location.hash.endsWith('#/terms')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to about', async(() => {
    TestBed.get(Router)
      .navigate(['#/about'])
        .then(() => {
          expect(location.hash.endsWith('#/about')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to faq', async(() => {
    TestBed.get(Router)
      .navigate(['#/faq'])
        .then(() => {
          expect(location.hash.endsWith('#/faq')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to recover-password', async(() => {
    TestBed.get(Router)
      .navigate(['#/recover-password'])
        .then(() => {
          expect(location.hash.endsWith('#/recover-password')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to reset-password/:token', async(() => {
    TestBed.get(Router)
      .navigate(['#/reset-password/1234'])
        .then(() => {
          expect(location.hash.endsWith('#/reset-password/1234')).toBe(true);
        }).catch(e => console.log(e));
  }));

});
