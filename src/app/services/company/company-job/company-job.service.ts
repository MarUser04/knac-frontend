import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../../environments/environment';
import { Job } from '@app/modules/company/models/job';
import { bodyParser, headersFactory } from '@app/helpers/helper';

@Injectable()
export class CompanyJobService {
  apiUrl = env.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.apiUrl}/companies/jobs/`);
  }

  getJobByID(id: string): Observable<Job> {
    return this.httpClient.get<Job>(`${this.apiUrl}/companies/jobs/${id}`);
  }

  postJob(data: Job): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/jobs`, data);
  }

  updateJob(id: string, data: Job): Observable<Job> {
    return this.httpClient.put<Job>(
      `${this.apiUrl}/companies/jobs/${id}`,
      data
    );
  }

  deleteJobByID(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/companies/jobs/${id}`);
  }
}
