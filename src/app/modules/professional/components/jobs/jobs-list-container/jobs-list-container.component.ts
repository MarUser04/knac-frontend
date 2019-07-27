import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as JobsActions from '@app/modules/professional/actions/jobs.actions';
import * as TrackActions from '@app/shared/actions/track.actions';
import * as fromJobs from '@app/modules/professional/reducers';
import * as fromTrack from '@app/shared/reducers';
import * as PublicProfileActions from '@app/shared/actions/public-profile.actions';
import { Professional } from '@app/shared/models/professional';
import * as fromProfessional from '@app/shared/reducers';
import { Job } from '@app/modules/professional/models/job';
import { Track } from '@app/shared/models/track';

@Component({
  selector: 'prf-jobs-list-container',
  styleUrls: ['./jobs-list-container.component.css'],
  template: `
    <prf-jobs-list
      [jobsApplied]="jobsApplied$ | async"
      [jobsNotApplied]="jobsNotApplied$ | async"
      [tracks]="track$ | async"
      (filter)="filterJobs($event)"
    ></prf-jobs-list>
  `
})
export class JobsListContainerComponent implements OnInit {
  jobs$: Observable<Job[]>;
  jobsApplied$: Observable<Job[]>;
  jobsNotApplied$: Observable<Job[]>;
  track$: Observable<any>;
  profile$: Observable<Professional>;

  constructor(private store: Store<fromJobs.ProfessionalState>) {
    store.dispatch(new JobsActions.GetJobs());
    store.dispatch(new JobsActions.GetJobsApplied());
    store.dispatch(new TrackActions.GetTrackList());
    // store.dispatch(new PublicProfileActions.GetProfessional());
    this.jobs$ = store.pipe(select(fromJobs.getJobs));
    this.jobsApplied$ = store.pipe(select(fromJobs.getCompletedJobs));
    this.jobsNotApplied$ = store.pipe(select(fromJobs.getNotCompletedJobs));
    this.track$ = store.pipe(select(fromTrack.getTrackList));
  }

  ngOnInit() {}

  filterJobs(id) {
    if (id) {
      this.store.dispatch(new JobsActions.FilterJob(id));
    } else {
      this.store.dispatch(new JobsActions.GetJobs());
      this.store.dispatch(new JobsActions.GetJobsApplied());
    }
  }
}
