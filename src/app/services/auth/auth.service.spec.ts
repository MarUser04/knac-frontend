import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { SiteStorageService } from '../siteStorage/site-storage.service';

import { AuthService } from './auth.service';
import {User} from '../../models/user';

describe('AuthService', () => {

  const userCredentials: User = {
    email: 'test@test.com',
    password: 'Test123*'
  };

  const userRegister = {
    email: 'test@test.com',
    password: 'Test123*',
    passwordConfirm: 'Test123*'
  };

  const mockLogin = {
    token: 'huge token',
    user: {
      _id: '123',
      email: 'test@test.com',
      hash: 'huge hash',
      name: 'Test'
    }
  };

  const mockRegister = {
    token: 'huge token',
    user: {
      email: 'test@test.com',
      hash: 'huge hash',
      name: 'Test',
      _id: '123',
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [ SiteStorageService, JwtHelperService, AuthService]
    });
  });

  it('should get loggin in', inject(
    [HttpTestingController, AuthService],
    (
      httpMock: HttpTestingController,
      authService: AuthService
    ) => {
      authService.getLoggingIn(userCredentials).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            expect(event.body).toEqual(mockLogin);
        }
      });

      const mockReq = httpMock.expectOne(`${authService.apiUrl}/auth/login`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(mockLogin);
      httpMock.verify();
    }
  ));

  it('should get registered', inject(
    [HttpTestingController, AuthService],
    (
      httpMock: HttpTestingController,
      authService: AuthService
    ) => {
      authService.getRegistered(userRegister).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            expect(event.body).toEqual(mockRegister);
        }
      });

      const mockReq = httpMock.expectOne(`${authService.apiUrl}/auth/register`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(mockRegister);
      httpMock.verify();
    }
  ));

});
