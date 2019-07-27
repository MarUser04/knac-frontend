import { delay } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../../auth/auth.service';
import { infoToast, warnToast, errorToast } from '../../../helpers/helper';

@Injectable()
export class AuthLinkedinResolverService implements Resolve<Observable<boolean>> {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToasterService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    if (route.queryParamMap.has('code')) {
      this.toast.pop(infoToast('We are processing...'));
      const code = route.queryParamMap.get('code');
      return this.auth
        .getLinkedInAccessToken(code)
        .take(1)
        .map(response => {
          const { token, created } = response.json();
          localStorage.setItem('token', token);

          if (created) {
            this.router.navigate(['/professional/profile/edit']);
            this.toast.pop(infoToast('Give an update to your profile...'));
          } else {
            this.router.navigate(['/professional']);
          }
          return true;
        })
        .catch((err: HttpErrorResponse) => {
          const { error } = err;
          return Observable.of(false);
        });
    } else if (route.queryParamMap.has('error')) {
      switch (route.queryParamMap.get('error')) {
        case 'user_cancelled_authorize':
          this.toast.pop(warnToast('You cancelled the authorization'));
          break;
        case 'user_cancelled_login':
          this.toast.pop(
            warnToast('You have not logged into LinkedIn account')
          );
          break;
        default:
          this.toast.pop(errorToast('Processing your authorization!'));
      }
      return Observable.of(false);
    }
    this.router.navigate(['/home/login']);
    return Observable.of(false);
  }
}
