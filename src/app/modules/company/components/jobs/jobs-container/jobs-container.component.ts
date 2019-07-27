import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as JobsActions from '@app/modules/company/actions/jobs.actions';
import * as fromAssessment from '@app/shared/reducers';
import * as fromJobs from '@app/modules/company/reducers';
import * as trackActions from '@app/shared/actions/track.actions';
import { Job } from '@app/modules/company/models/job';

@Component({
  selector: 'cmp-jobs-container',
  template: `<cmp-jobs
               [action]="'create'"
               [isLoading]="loading$ | async"
               [tracks]="tracks$ | async"
               (submitted)="submitted($event)"
               [modalJob]="modalJob$ | async"
              ></cmp-jobs>`
})
export class JobsContainerComponent implements OnInit {
  loading$: Observable<boolean>;
  modalJob$: Observable<boolean>;
  tracks$: Observable<any>;

  constructor(private store: Store<fromJobs.CompanyState>) {
    store.dispatch(new trackActions.GetTrackList());
    this.loading$ = store.pipe(select(fromJobs.getJobsTogglePending));
    this.modalJob$ = store.pipe(select(fromJobs.getJobModalToggle));
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
  }

  ngOnInit() {}

  submitted(data: Job) {
    this.store.dispatch(new JobsActions.PostJob(data));
  }
}
