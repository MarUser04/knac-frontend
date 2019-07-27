import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

import { environment as env } from '../../../environments/environment';
import { Track } from '@app/modules/admin/models/track';
import { Skill } from '@app/modules/admin/models/skill';
import { Template } from '@app/modules/admin/models/template';
import {
  bodyParserToCompanyProfile,
  headersFactory
} from '@app/helpers/helper';

@Injectable()
export class AdminService {
  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = env.apiUrl;
  }

  /**
   * Companies
   **/
  createCompanyById(id): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/admin/companies/information/${id}`,
      {}
    );
  }

  createCompanyManually(data) {
    return this.httpClient.post(`${this.apiUrl}/admin/companies/manual`, data);
  }

  getCompanies(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/admin/companies/information`);
  }

  getCompany(id): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/admin/companies/${id}`);
  }

  searchCompanyAdmin(term): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/admin/companies?name=${term}`);
  }

  getCompanyList(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/admin/companies/`);
  }

  getProfessionals(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/admin/professionals`);
  }

  getProfessional(id): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/admin/professionals/${id}`);
  }

  searchProfessionalAdmin({ name, lastName }): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/admin/professionals?name=${name}&lastName=${lastName}`
    );
  }

  updateCompany(data, id): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/admin/companies/information/${id}`,
      data
    );
  }

  deleteCompanyById(id): Observable<any> {
    return this.httpClient.delete(
      `${this.apiUrl}/admin/companies/information/${id}`
    );
  }

  createTrack(data): Observable<Track> {
    return this.httpClient.post<Track>(`${this.apiUrl}/admin/track`, data);
  }

  getTracks(): Observable<Track[]> {
    return this.httpClient.get<Track[]>(`${this.apiUrl}/admin/track`);
  }

  updateTrackById({ _id, ...data }): Observable<Track> {
    return this.httpClient.put(`${this.apiUrl}/admin/track/${_id}`, data);
  }

  deleteTrackById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/admin/track/${id}`);
  }

  getQuestions() {
    return this.httpClient.get(`${this.apiUrl}/admin/feedback/questions`);
  }

  updateQuestions(data) {
    return this.httpClient.put(`${this.apiUrl}/admin/feedback/questions`, data);
  }

  getSkills() {
    return this.httpClient.get(`${this.apiUrl}/admin/skill`);
  }

  createSkill(data: Skill): Observable<Skill> {
    return this.httpClient.post<Skill>(`${this.apiUrl}/admin/skill`, data);
  }

  updateSkillById({ _id, ...data }: Skill): Observable<Track> {
    return this.httpClient.put(`${this.apiUrl}/admin/skill/${_id}`, data);
  }

  deleteSkillById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/admin/skill/${id}`);
  }

  getTemplates() {
    return this.httpClient.get(`${this.apiUrl}/admin/template`);
  }

  createTemplate(data: Template): Observable<Template> {
    return this.httpClient.post<Template>(
      `${this.apiUrl}/admin/template`,
      data
    );
  }

  updateTemplateById({ _id, ...data }: Template): Observable<Track> {
    return this.httpClient.put(`${this.apiUrl}/admin/template/${_id}`, data);
  }

  deleteTemplateById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/admin/template/${id}`);
  }

  updatePassword(data): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/admin/profile/password/reset`,
      data
    );
  }

  updateEmail(data): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/admin/companies/email`,
      data
    );
  }

  updateCompanyProfile({ data, id }): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}/admin/companies/${id}`,
      bodyParserToCompanyProfile(data),
      { headers: headersFactory('enctype', 'multipart/form-data') }
    );
  }

  disableEnableUsers(id): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/admin/users/disable/${id}`, {});
  }

  deleteCompanyProfileById(id): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/admin/users/delete/${id}`);
  }

  checkSkillsOrTrack({ name, id }): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}/admin/check-skills-tracks?${name}=${id}`
    );
  }
}
