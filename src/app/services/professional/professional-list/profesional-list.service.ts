import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../../environments/environment';

@Injectable()
export class ProfessionalListServices implements OnInit {
  private apiUrl = env.apiUrl;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  getProfessionalList(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/professionals`);
  }

  searchProfessionals(pay): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/companies/professionals?${pay.field}=${pay.term}`
    );
  }
}
