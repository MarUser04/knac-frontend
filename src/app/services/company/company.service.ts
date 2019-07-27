import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment as env } from '@app/../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '@app/modules/company/models/company';
import { Assessment } from '@app/shared/models/assessment';
import {
  headersFactory,
  bodyParser,
  bodyParserToAllowSpaces,
  bodyParserToCompanyProfile
} from '@app/helpers/helper';
import { Job } from '@app/modules/company/models/job';

@Injectable()
export class CompanyService {
  apiUrl = env.apiUrl;

  constructor(private http: Http, private httpClient: HttpClient) {}

  requestAccount(company: Company): Observable<any> {
    return this.http.post(`${this.apiUrl}/companies/information`, company);
  }

  setupPassword({ password, passwordConfirm }): Observable<any> {
    const payload = { password, 'password-confirm': passwordConfirm };
    return this.httpClient.post(
      `${this.apiUrl}/companies/password-setup`,
      payload
    );
  }

  createAssessment(): Observable<Assessment[]> {
    return this.httpClient.get<Assessment[]>(`${this.apiUrl}/assessments`);
  }

  updateProfile(data): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/companies/profile`,
      bodyParserToCompanyProfile(data),
      { headers: headersFactory('enctype', 'multipart/form-data') }
    );
  }

  getQuestions() {
    return this.httpClient.get(`${this.apiUrl}/assessments/feedback/questions`);
  }

  postFeedback({ id, idS, data }) {
    return this.httpClient.post(
      `${this.apiUrl}/companies/assessments/${id}/submissions/${idS}`,
      data
    );
  }

  updatePassword(data): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/companies/profile/password/reset`,
      data
    );
  }
}
