import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { environment as env } from '@app/../environments/environment';
import { WordpressService } from '@app/services/wordpress/wordpress.service';

import * as BlogActions from '@app/shared/actions/blogs-page.actions';
import { Blog } from '../../models/blog';
import * as fromBlog from '@app/shared/reducers';

@Component({
  selector: 'post-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pc-post
      [post]="post$ | async"
      [router]="router"
      [routerId]="routerId"
      [posts]="posts$ | async"
      (change)="change($event)"
    ></pc-post>
  `,
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {
  post$: Observable<any>;
  posts$: Observable<Blog[]>;
  router = '/professional/posts/';
  routerId = '/professional/post/';

  constructor(
    private store: Store<fromBlog.State>,
    private route: ActivatedRoute
  ) {
    const id = route.snapshot.paramMap.get('id');
    store.dispatch(new BlogActions.GetBlog(id));
    this.store.dispatch(new BlogActions.Load());
    this.post$ = store.pipe(select(fromBlog.getBlog));
    this.posts$ = store.pipe(select(fromBlog.getAllBlogs));
  }

  ngOnInit() {}

  change(id) {
    this.store.dispatch(new BlogActions.GetBlog(id));
    this.store.dispatch(new BlogActions.Load());
    this.post$ = this.store.pipe(select(fromBlog.getBlog));
    this.posts$ = this.store.pipe(select(fromBlog.getAllBlogs));
  }
}
