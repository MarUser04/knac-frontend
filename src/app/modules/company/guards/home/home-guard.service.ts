import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  map,
  filter,
  take,
  catchError,
  tap,
  switchMap,
  delay
} from 'rxjs/operators';

import * as fromCompany from '@app/modules/company/reducers';
import * as CompanyActions from '@app/modules/company/actions/company.actions';
import { AuthService } from '@app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ShowFullPreloading } from '@app/state/app-actions';

@Injectable()
export class HomeGuardService implements CanActivate {
  constructor(
    private store: Store<fromCompany.CompanyState>,
    private router: Router,
    private user: AuthService
  ) {
    const getProfileAction = new CompanyActions.GetProfile();
    store.dispatch(getProfileAction);
    store.dispatch(new ShowFullPreloading(true));
  }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForProfileToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromCompany.getHasLoadedProfile),
      filter(hasLoadedProfile => hasLoadedProfile), // true
      take(1)
    );
  }

  /**
   * This method checks if user has already setup password
   * in the Store
   */
  hasSetupPasswordInStore(): Observable<boolean> {
    return this.store.pipe(
      select(fromCompany.getHasSetupPassword),
      map(hasSetupPassword => hasSetupPassword), // false
      take(1)
    );
  }

  /**
   * This method loads Profile from the API and caches
   * it in the store, returning `true` or `false` if it was loaded with success.
   */
  hasSetupPasswordInApi(): Observable<boolean> {
    return this.user.getCurrentProfile('/companies/profile').pipe(
      map(({ profile }) => new CompanyActions.SetProfile(profile)),
      tap((action: CompanyActions.SetProfile) => this.store.dispatch(action)),
      map(profile => {
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.router.navigate(['/company/password-setup']);
          return of(false);
        } else if (err.status === 401) {
          this.router.navigate(['/home/login']);
          return of(false);
        } else {
          this.router.navigate(['/home/login']);
          return of(false);
        }
      })
    );
  }

  /**
   * `hasSetupPasswordInApi` composes `hasSetupPassword` and `hasSetupPasswordInApi`. It first checks
   * if the Profile is in store, and if not it then checks if it is in the
   * API.
   */
  hasSetupPassword(): Observable<boolean> {
    return this.hasSetupPasswordInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasSetupPasswordInApi();
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   */
  canActivate(): Observable<boolean> {
    return this.waitForProfileToLoad().pipe(
      tap(() => this.store.dispatch(new ShowFullPreloading(false))),
      switchMap(() => this.hasSetupPassword()),
      catchError(() => of(true))
    );
  }
}
