import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import * as CompanyProfileActions from '../../../../actions/company.actions';
import { Company } from '../../../../models/company';
import * as fromCompany from '../../../../reducers';
import { UpdateProfile } from '@app/modules/company/actions/company.actions';
import { bodyParser } from '@app/helpers/helper';

@Component({
  selector: 'app-update-profile-container',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--
      <update-profile
        [company]='company$ | async'
        [disabled]="pending$ | async"
        [modalUpdate]="modalUpdate$ | async"
        (submitted)="onUpdateProfile($event)"
      ></update-profile>
    -->
  `,
  styleUrls: ['./update-profile-container.component.css']
})
export class UpdateProfileContainerComponent implements OnInit {
  company$: Observable<any>;
  pending$: Observable<any>;
  modalUpdate$: Observable<boolean>;

  constructor(private store: Store<fromCompany.CompanyState>) {
    store.dispatch(new CompanyProfileActions.GetProfile());
    this.pending$ = store.select(fromCompany.getProfilePending);
    this.company$ = store.select(fromCompany.getProfile);
    this.modalUpdate$ = store.pipe(select(fromCompany.getModalUpdateToggle));
  }

  ngOnInit() {}

  onUpdateProfile(company: Company) {
    this.store.dispatch(new UpdateProfile(company));
  }
}
