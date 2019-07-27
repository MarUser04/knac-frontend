import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment as env } from '@app/../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '@app/modules/company/models/company';
import { Skills } from '@app/shared/models/skills';

@Injectable()
export class SkillsService {
  apiUrl = env.apiUrl;

  constructor(private http: Http, private httpClient: HttpClient) {}

  getSkills(): Observable<Skills[]> {
    return this.httpClient.get<Skills[]>(`${this.apiUrl}/skills`);
  }

}
