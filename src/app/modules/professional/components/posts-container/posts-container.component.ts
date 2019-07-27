import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Injectable,
  OnDestroy
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '@app/../environments/environment';
import * as BlogActions from '@app/shared/actions/blogs-page.actions';
import { Blog } from '../../models/blog';
import * as fromBlogs from '@app/shared/reducers';

@Component({
  selector: 'posts-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pc-posts [posts]="posts$ | async" [router]="router"></pc-posts>
  `,
  styleUrls: ['./posts-container.component.css']
})
export class PostsContainerComponent implements OnInit {
  posts$: Observable<Blog[]>;
  router = '/professional/post/';

  constructor(private store: Store<fromBlogs.State>) {
    this.posts$ = store.pipe(select(fromBlogs.getAllBlogs));
  }

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.Load());
  }
}
