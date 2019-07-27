import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Company } from '../../models/company';
import * as CompanyProfileActionsShared from '../../actions/company-profile.actions';
import * as fromCompanyShared from '../../reducers';
import * as JobsActions from '@app/modules/company/actions/jobs.actions';
import * as fromJobs from '@app/modules/company/reducers';
import * as fromAssessment from '@app/shared/reducers';
import * as trackActions from '@app/shared/actions/track.actions';
import { Job } from '@app/modules/company/models/job';
import * as CompanyProfileActions from '@app/modules/company/actions/company.actions';
import * as fromCompany from '@app/modules/company/reducers';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-profile-container',
  template: `
    <cmp-profile
      [company]="company$ | async"
      [assessments]="assessments$ | async"
      [jobs]="jobs$ | async"
      [tracks]="tracks$ | async"
      [disabled]="pending$ | async"
      [modalUpdate]="modalUpdate$ | async"
      [isEdit]="isEdit | async"
      (submitted)="onUpdateProfile($event)"
    ></cmp-profile>
  `
})
export class CompanyProfileContainerComponent implements OnInit {
  company$: any;
  assessments$: any;
  tracks$: any;
  jobs$: Observable<Job[]>;
  pending$: Observable<any>;
  modalUpdate$: Observable<boolean>;
  showSnackBar: boolean;
  isEdit: Observable<any>;

  constructor(
    private storeSheared: Store<fromCompanyShared.State>,
    private store: Store<fromCompany.CompanyState>,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    const id = this.route.snapshot.params.id;
    let getCompany: any;
    if (id) {
      getCompany = new CompanyProfileActionsShared.GetCompanyProfile();
    } else {
      getCompany = new CompanyProfileActionsShared.GetCompanyProfile();
    }
    storeSheared.dispatch(
      new CompanyProfileActionsShared.GetCompanyAssessments()
    );
    storeSheared.dispatch(new trackActions.GetTrackList());

    this.tracks$ = storeSheared.pipe(select(fromAssessment.getTrackList));
    this.assessments$ = storeSheared.pipe(
      select(fromCompanyShared.getCompanyAssessment)
    );
    this.company$ = storeSheared.pipe(select(fromCompanyShared.getCompanyById));
    storeSheared.dispatch(getCompany);
    storeSheared.dispatch(new JobsActions.GetJobs());
    this.jobs$ = storeSheared.pipe(select(fromJobs.getJobs));
    storeSheared.dispatch(new CompanyProfileActions.GetProfile());
    this.pending$ = storeSheared.select(fromCompany.getProfilePending);
    this.modalUpdate$ = storeSheared.pipe(
      select(fromCompany.getModalUpdateToggle)
    );

    storeSheared
      .pipe(select(fromAssessment.showSnackbarCompany))
      .subscribe(show => {
        this.showSnackBar = show;
      });

    if (!this.showSnackBar) {
      const message =
        'Knac is now in beta and we will be making lots of updates as we go!' +
        ' Over the next few weeks, great companies such as Google, Nike, Mastercard, eBay, Oscar Health, Vimeo, and a few others will be posting their jobs and assessments on Knac.';
      this.snackBar.open(message, 'close!', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        direction: 'ltr',
        duration: 10000
      });
      storeSheared.dispatch(new CompanyProfileActionsShared.ShowSnackBar());
    }

    this.isEdit = this.activatedRoute.params;
  }

  ngOnInit() {}

  onUpdateProfile(company: any) {
    this.store.dispatch(new CompanyProfileActions.UpdateProfile(company));
  }
}
