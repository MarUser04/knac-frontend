import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../../reducers';
import * as CompanyAction from '../../../actions/companies.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'adm-company-profile-container',
  template: `
    <adm-company-profile
      [company]="profile$ | async"
      [disabled]="loading$ | async"
      [modalUpdate]="updateModal$ | async"
      (submitted)="updateProfile($event)"
    ></adm-company-profile>
  `
})
export class CompanyProfileContainerComponent implements OnInit {
  id: string;
  profile$: Observable<any>;
  loading$: Observable<boolean>;
  updateModal$: Observable<boolean>;

  constructor(
    private store: Store<fromCompany.State>,
    private router: ActivatedRoute
  ) {
    const name = router.snapshot.params.id;
    store.dispatch(new CompanyAction.GetCompanyList());
    store.dispatch(new CompanyAction.SetCompanyName(name));
    store.pipe(select(fromCompany.getCompanyByName)).subscribe(cmp => {
      if (cmp && cmp.user_id) {
        this.id = cmp.user._id;
        this.store.dispatch(new CompanyAction.GetCompany(cmp.user._id));
      }
    });
    this.profile$ = this.store.pipe(select(fromCompany.getCompany));
    this.loading$ = store.pipe(select(fromCompany.getLoading));
    this.updateModal$ = store.pipe(select(fromCompany.getModalUpdateToggle));
  }

  ngOnInit() {
    this.store.pipe(select(fromCompany.getCompanyByName)).subscribe(cmp => {
      if (cmp && cmp.user && cmp.user._id) {
        this.id = cmp.user._id;
        this.store.dispatch(new CompanyAction.GetCompany(cmp.user._id));
      }
    });
  }

  updateProfile(data) {
    this.store.dispatch(new CompanyAction.UpdateCompany({id: this.id, data}));
  }
}
