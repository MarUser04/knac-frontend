import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromProfile from '../../../reducers';
import * as SiteActions from '../../../actions/site.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <st-register-company
      [disabled]='pending$ | async'
      (submitted)='onCreateProfile($event)'
    ></st-register-company>
  `,
  styleUrls: ['./register-company-container.component.css']
})
export class RegisterCompanyContainerComponent implements OnInit {

  pending$: Observable<any>;

  constructor(
    private store: Store<any>,
  ) {
    this.pending$ = store.select(fromProfile.getProfilePending);
  }

  onCreateProfile(company) {
    this.store.dispatch(new SiteActions.CreateProfile(company));
  }

  ngOnInit() {}

}
