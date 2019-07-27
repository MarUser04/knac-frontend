import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, exhaustMap, tap, mergeMap } from 'rxjs/operators';

import { BlogsPageActionTypes, GetBlog } from '../actions/blogs-page.actions';
import {
  BlogsApiActionTypes,
  LoadSuccess,
  LoadFail,
  LoadBlog
} from '../actions/blogs-api.actions';
import { WordpressService } from '@app/services/wordpress/wordpress.service';

@Injectable()
export class BlogsPageEffects {
  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    ofType(BlogsPageActionTypes.Load),
    exhaustMap(() =>
      this.wordpressService
        .getPostsList()
        .pipe(
          map(response => new LoadSuccess(response.json())),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );

  @Effect()
  getBlog$ = this.actions$
    .ofType<GetBlog>(BlogsPageActionTypes.GetBlog)
    .pipe(
      map(action => action.payload),
      mergeMap(id =>
        this.wordpressService
          .getPostById(id)
          .pipe(
            map(response => new LoadBlog(response.json())),
            catchError(error => of(new LoadFail(error)))
          )
      )
    );

  constructor(
    private actions$: Actions,
    private wordpressService: WordpressService
  ) {}
}
