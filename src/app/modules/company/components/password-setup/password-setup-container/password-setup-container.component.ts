import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as CompanyActions from '../../../actions/company.actions';
import * as fromPage from '../../../reducers';

@Component({
  selector: 'app-password-setup-container',
  template: `<cmp-password-setup
    [disabled]="pending$ | async"
    (submitted)="setupPassword($event)"
  ></cmp-password-setup>`,
  styleUrls: ['./password-setup-container.component.css']
})
export class PasswordSetupContainerComponent implements OnInit {

  pending$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.pending$ = store.pipe(select(fromPage.getPending));
  }

  ngOnInit() {}

  setupPassword($event) {
    this.store.dispatch(new CompanyActions.SetupPassword($event));
  }

}
