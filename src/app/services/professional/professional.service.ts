import { Component, OnInit, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';
import { headersFactory, bodyParser } from '@app/helpers/helper';
import { Job } from '@app/modules/company/models/job';
import { Skill } from '@app/modules/professional/models/skill';

@Injectable()
export class ProfessionalServices implements OnInit {
  private apiUrl = env.apiUrl;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  getProfessional(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/professionals/profile/`);
  }

  getProfessionalById(id: String): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/professionals/profile/${id}`);
  }

  getProfessionalByIdByCompany(id: String): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/companies/professionals/${id}`);
  }

  getAssessment() {
    return this.httpClient.get(`${this.apiUrl}/assessments`);
  }

  takeAssessment(id: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/assessments/${id}`, {});
  }

  submitAssessment(id: string, body: any): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/assessments/${id}`,
      bodyParser(body),
      { headers: headersFactory('enctype', 'multipart/form-data') }
    );
  }

  getCompletedAssessments(): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/professionals/completed-assessments`
    );
  }

  getPublicJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  searchJobs(term: string): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.apiUrl}/jobs/search?q=${term}`);
  }

  filterJobs(id: string): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.apiUrl}/jobs/search?track=${id}`);
  }

  getJobByID(id: string): Observable<Job> {
    return this.httpClient.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }

  getSkills(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  applyJobById(id: string) {
    return this.httpClient.post(
      `${this.apiUrl}/professionals/jobs/${id}/apply`,
      {}
    );
  }

  getAppliedJobs() {
    return this.httpClient.get<string[]>(
      `${this.apiUrl}/professionals/applied-jobs-ids`
    );
  }

  getCompanies() {
    return this.httpClient.get<any>(`${this.apiUrl}/professionals/companies`);
  }

  getCompany(id) {
    return this.httpClient.get<any>(
      `${this.apiUrl}/professionals/companies/${id}`
    );
  }

  searchCompanies(term) {
    return this.httpClient.get<any>(
      `${this.apiUrl}/professionals/companies?q=${term}`
    );
  }

  postPhoto(data: any) {
    return this.httpClient.post(
      `${this.apiUrl}/professionals/profile/portfolio`,
      bodyParser(data),
      { headers: headersFactory('enctype', 'multipart/form-data') }
    );
  }

  editPhoto({ id, ...data }) {
    return this.httpClient.put(
      `${this.apiUrl}/professionals/profile/portfolio/${id}`,
      data
    );
  }

  deletePhoto(id: any) {
    return this.httpClient.delete(
      `${this.apiUrl}/professionals/profile/portfolio/${id}`
    );
  }

  downloadCV(url: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get<any>(`${url}`, {
      headers: headers,
      responseType: 'blod' as 'json'
    });
  }

  getFeedback(id) {
    return this.httpClient.get<any>(
      `${this.apiUrl}/professionals/assessments/${id}/feedback`
    );
  }

  getQuestions() {
    return this.httpClient.get(`${this.apiUrl}/assessments/feedback/questions`);
  }

  updatePassword(data) {
    return this.httpClient.post(
      `${this.apiUrl}/professionals/profile/password/reset/`,
      data
    );
  }
}
