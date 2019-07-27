import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as JobsActions from '@app/modules/company/actions/jobs.actions';
import * as fromJobs from '@app/modules/company/reducers';
import * as fromAssessment from '@app/shared/reducers';
import * as trackActions from '@app/shared/actions/track.actions';
import { Job } from '@app/modules/company/models/job';

@Component({
  selector: 'cmp-job-view-container',
  template: `<cmp-job-view
              [job]="job$ | async"
              [id]="id"
              [tracks]="tracks$ | async"
              (delete)="deleteJob()"
            ><cmp-job-view>`
})
export class JobViewContainerComponent implements OnInit {
  id: string;
  job$: Observable<Job>;
  tracks$: Observable<any>;

  constructor(
    private store: Store<fromJobs.CompanyState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    store.dispatch(new trackActions.GetTrackList());
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));

    if (this.id) {
      store.dispatch(new JobsActions.GetJobByID(this.id));
      this.job$ = this.store.pipe(select(fromJobs.getJob));
    }
  }

  ngOnInit() {}

  deleteJob() {
    this.store.dispatch(new JobsActions.DeleteJobByID(this.id));
  }
}
