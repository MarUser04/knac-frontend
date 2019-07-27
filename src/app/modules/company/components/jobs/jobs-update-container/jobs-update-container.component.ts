import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import * as JobsActions from '@app/modules/company/actions/jobs.actions';
import * as fromAssessment from '@app/shared/reducers';
import * as fromJobs from '@app/modules/company/reducers';
import * as trackActions from '@app/shared/actions/track.actions';
import { Job } from '@app/modules/company/models/job';

@Component({
  selector: 'cmp-jobs-update-container',
  template: `<cmp-jobs
                [action]="'edit'"
                [job]="job$ | async"
                [isLoading]="loading$ | async"
                [tracks]="tracks$ | async"
                (submitted)="submitted($event)"
                [modalJob]="modalJob$ | async"
              ></cmp-jobs>`
})
export class JobsUpdateContainerComponent implements OnInit {
  loading$: Observable<boolean>;
  modalJob$: Observable<boolean>;
  job$: Observable<Job>;
  tracks$: Observable<any>;
  id: string;

  constructor(
    private store: Store<fromJobs.CompanyState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    store.dispatch(new trackActions.GetTrackList());
    this.loading$ = store.pipe(select(fromJobs.getJobsTogglePending));
    this.modalJob$ = store.pipe(select(fromJobs.getJobModalToggle));
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      store.dispatch(new JobsActions.GetJobByID(this.id));
      this.job$ = store.pipe(select(fromJobs.getJob));
    }
  }

  ngOnInit() {}

  submitted(data: Job) {
    this.store.dispatch(
      new JobsActions.UpdateJob({
        id: this.id,
        data
      })
    );
  }
}
