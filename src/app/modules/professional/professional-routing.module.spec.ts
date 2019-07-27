import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {NgModuleFactoryLoader} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

import { routes } from './routes';
import {ProfessionalRoutingModule} from './professional-routing.module';
import { ProfessionalModule } from './professional.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SharedModule } from '../../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';

describe('Professional tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ProfessionalModule,
        RouterTestingModule.withRoutes(routes),
        ProfessionalRoutingModule,
        LoadingBarHttpClientModule,
        ToasterModule.forRoot()
      ],
      providers: [
        AuthService
      ]
    });
  });

  it('can navigate to professional', async(() => {
    TestBed.get(Router)
      .navigate(['/professional'])
        .then(() => {
          expect(location.pathname.endsWith('/professional/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to professional/assessments', async(() => {
    TestBed.get(Router)
      .navigate(['/professional/assessments/'])
        .then(() => {
          expect(location.pathname.endsWith('/professional/assessments/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to professional/posts', async(() => {
    TestBed.get(Router)
      .navigate(['/professional/posts/'])
        .then(() => {
          expect(location.pathname.endsWith('/professional/posts/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to professional/profile', async(() => {
    TestBed.get(Router)
      .navigate(['/professional/profile/'])
        .then(() => {
          expect(location.pathname.endsWith('/professional/profile/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to professional/account', async(() => {
    TestBed.get(Router)
      .navigate(['/professional/account/'])
        .then(() => {
          expect(location.pathname.endsWith('/professional/account/')).toBe(true);
        }).catch(e => console.log(e));
  }));

  it('can navigate to professional/post/id', async(() => {
    TestBed.get(Router)
      .navigate(['/professional/post/40'])
        .then(() => {
          expect(location.pathname.endsWith('/professional/post/40')).toBe(true);
        }).catch(e => console.log(e));
  }));
});
