import { Component, OnInit, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCompany from '../../../reducers';
import * as CompanyAction from '../../../actions/company.actions';
import * as AsssessmentAction from '@app/modules/professional/actions/assessments.actions';
import * as JobsActions from '@app/modules/professional/actions/jobs.actions';
import * as trackActions from '@app/shared/actions/track.actions';
import * as fromAssessment from '@app/shared/reducers';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'prf-company-container',
  template: `
    <prf-company
      [company]="company$ | async"
      [tracks]="tracks$ | async"
      [assessmentByCompany]="assessmentFeedbackByCompany$ | async"
      [jobByCompany]="jobByCompany$ | async"
    ></prf-company>
  `
})
export class CompanyContainerComponent implements OnInit, OnChanges {
  company$: Observable<any[]>;
  assessmentByCompany$: Observable<any>;
  assessmentFeedbackByCompany$: Observable<any>;
  jobByCompany$: Observable<any>;
  id: Observable<string>;
  tracks$: any;

  constructor(
    private store: Store<fromCompany.State>,
    private activatedRoute: ActivatedRoute
  ) {
    const name = this.activatedRoute.snapshot.params.id;
    store.dispatch(new CompanyAction.GetCompanies());
    store.dispatch(new CompanyAction.SetCompanyName(name));
    store.dispatch(new JobsActions.GetJobsApplied());
    store.dispatch(new AsssessmentAction.GetAssessments());
    store.dispatch(new AsssessmentAction.GetCompletedAssessments());
    store.dispatch(new trackActions.GetTrackList());

    this.company$ = store.pipe(select(fromCompany.getCompanyByName));
  }

  ngOnInit() {
    this.company$ = this.store.pipe(select(fromCompany.getCompanyByName));
    this.company$.subscribe(cmp => {
      if (cmp !== undefined) {
        this.store.dispatch(new CompanyAction.SetCompany(cmp));
      }
    });
    this.tracks$ = this.store.pipe(select(fromAssessment.getTrackList));
    this.assessmentByCompany$ = this.store.pipe(
      select(fromCompany.getAssessmentsByCompany)
    );
    this.jobByCompany$ = this.store.pipe(select(fromCompany.getJobsByCompany));
    this.assessmentFeedbackByCompany$ = this.store.pipe(
      select(fromCompany.getAssessmentsFeedbackByCompany)
    );
  }

  ngOnChanges() {
    // this.assessmentByCompany$ = this.store.pipe(
    //   select(fromCompany.getAssessments)
    // );
  }
}
