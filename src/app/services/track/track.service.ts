import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment as env } from '@app/../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '@app/modules/company/models/company';
import { Track } from '@app/shared/models/track';

@Injectable()
export class TrackService {
  apiUrl = env.apiUrl;

  constructor(private http: Http, private httpClient: HttpClient) {}

  requestAccount(company: Company): Observable<any> {
    return this.http.post(`${this.apiUrl}/companies/information`, company);
  }

  getTracks(): Observable<Track[]> {
    return this.httpClient.get<Track[]>(`${this.apiUrl}/tracks`);
  }
}
