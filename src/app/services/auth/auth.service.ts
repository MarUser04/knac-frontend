import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

import { User } from '../../models/user';
import { environment as env } from '@app/../environments/environment';
import { SiteStorageService } from '../siteStorage/site-storage.service';
import { headersFactory } from '@app/helpers/helper';

@Injectable()
export class AuthService {
  public apiUrl: string;

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private storage: SiteStorageService,
    public jwtHelper: JwtHelperService
  ) {
    this.apiUrl = env.apiUrl;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getLoggingIn({ email, password }: User): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, {
        email,
        password
      })
      .retry(3);
  }

  recoverPassword(email): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/password/lost`, {
      email
    });
  }

  resetPassword({ token, password, passwordConfirm }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/password/reset`, {
      token: token,
      password: password,
      'password-confirm': passwordConfirm
    });
  }

  getRegistered({ email, password, passwordConfirm }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      email: email,
      password: password,
      'password-confirm': passwordConfirm
    });
  }

  buildProfile(data): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/professionals/profile`, data, {
      headers: headersFactory('enctype', 'multipart/form-data')
    });
  }

  updateProfile(data): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/professionals/profile`, data, {
      headers: headersFactory('enctype', 'multipart/form-data')
    });
  }

  getCurrentProfile(url: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl + url}`);
  }

  logout(): void {
    this.storage.destroyOnStorage('token');
  }

  getAuthorizationCode(): void {
    const parameters = `response_type=code&client_id=${
      env.LINKED_IN_API_KEY
    }&redirect_uri=${
      env.redirect_uri
    }&state=987654321&scope=r_basicprofile%20r_emailaddress%20r_liteprofile`;
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${parameters}`;
  }

  getLinkedInAccessToken(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login/linkedin`, {
      code
    });
  }
}
