import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as JobsActions from '@app/modules/professional/actions/jobs.actions';
import * as fromJobs from '@app/modules/professional/reducers';
import * as PublicProfileActions from '@app/shared/actions/public-profile.actions';
import * as fromProfessional from '@app/shared/reducers';
import { Job } from '@app/modules/professional/models/job';
import { ToasterService } from 'angular2-toaster';
import { warnToast } from '@app/helpers/helper';

@Component({
  selector: 'prf-job-view-container',
  template: `
    <prf-job-view
      [job]="job$ | async"
      [id]="id"
      [applied]="applied | async"
      [pendingApplyJob]="loading$ | async"
      (submited)="applyJob()"
      ><prf-job-view></prf-job-view
    ></prf-job-view>
  `
})
export class JobViewContainerComponent implements OnInit {
  id: string;
  job$: Observable<Job>;
  loading$: Observable<boolean>;
  isProfile: boolean = true;
  applied: Observable<any>;

  constructor(
    private store: Store<fromJobs.ProfessionalState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToasterService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;

    if (this.id) {
      store.dispatch(new JobsActions.GetJobByID(this.id));
      this.job$ = this.store.pipe(select(fromJobs.getJob));
    }

    store.dispatch(new PublicProfileActions.IsProfile());
    store
      .pipe(select(fromProfessional.getProfessional))
      .subscribe((profile: any) => {
        if (profile && !profile.profile) {
          this.isProfile = false;
        } else {
          this.isProfile = true;
        }
      });
    this.loading$ = store.pipe(select(fromJobs.getApplyPendingProcessingJob));
    this.applied = this.activatedRoute.params;
  }

  ngOnInit() {}

  applyJob() {
    if (!this.isProfile) {
      this.toast.pop(warnToast('build your profile first, please!'));
    } else {
      this.store.dispatch(new JobsActions.ApplyJobByID(this.id));
    }
  }
}
