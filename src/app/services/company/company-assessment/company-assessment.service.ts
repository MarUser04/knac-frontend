import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../../environments/environment';
@Injectable()
export class CompanyAssessmentService {
  apiUrl = env.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getCompanyAssessments(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/companies/assessments`);
  }

  getAssessmentSubmission({ id, ids }): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/companies/assessments/${id}/submissions/${ids}`
    );
  }

  getAssessmentsByIDCompany(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/companies/assessments/${id}`);
  }
  getAssessmentsByID(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/assessments/${id}`);
  }

  deleteAssessmentsByID(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/companies/assessments/${id}`);
  }

  createAssessment(body: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/companies/assessments`, body);
  }

  listAssessments(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/companies/assessments`);
  }

  getTemplate(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/templates`);
  }

  updateAssessment(id: string, body: any): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/companies/assessments/${id}`,
      body
    );
  }
}
