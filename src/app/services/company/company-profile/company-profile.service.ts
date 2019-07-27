import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../../environments/environment';

@Injectable()
export class CompanyProfileServices implements OnInit {
  private apiUrl = env.apiUrl;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  getCompanyById(id: String): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/companies/profile/${id}`);
  }

  getCompany(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/companies/profile`);
  }
}
