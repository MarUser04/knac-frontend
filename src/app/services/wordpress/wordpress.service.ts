import { Component, OnInit, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';

@Injectable()
export class WordpressService implements OnInit {
  private wpUrl = env.wordpressURL;

  constructor(private http: Http) {}

  ngOnInit() {}

  getPostsList(): Observable<any> {
    return this.http.get(`${this.wpUrl}/posts?_embed&per_page=100`);
  }

  getPostById(id): Observable<any> {
    return this.http.get(`${this.wpUrl}/posts/${id}?_embed`);
  }
}
