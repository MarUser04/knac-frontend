import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  map,
  exhaustMap,
  switchMap,
  tap,
  mergeMap,
  finalize,
  delay
} from 'rxjs/operators';

import {
  GetJobs,
  SetJob,
  GetJobByID,
  PostJob,
  SetJobByID,
  JobsTogglePending,
  JobModalToggle,
  DeleteJobByID,
  JobActionTypes,
  UpdateJob
} from '../actions/jobs.actions';

import { CompanyJobService } from '@app/services/company/company-job/company-job.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { Store } from '@ngrx/store';
import { CompanyPending } from 'app/modules/company/actions/company.actions';
import * as fromCompany from '../reducers';

@Injectable()
export class JobEffects {
  @Effect()
  GetJobs$: Observable<Action> = this.actions$
    .ofType<GetJobs>(JobActionTypes.GetJobs)
    .pipe(
      exhaustMap(() =>
        this.companyJobService.getJobs().pipe(
          map(job => {
            return new SetJob(job);
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error obtaining the jobs, please reload')
              )
            )
          )
        )
      )
    );

  @Effect()
  GetJobByID$: Observable<Action> = this.actions$
    .ofType<GetJobByID>(JobActionTypes.GetJobByID)
    .pipe(
      map(action => action.payload),
      mergeMap(id =>
        this.companyJobService.getJobByID(id).pipe(
          map(job => {
            return new SetJobByID(job);
          }),
          catchError(({ message }) => of(this.toast.pop(warnToast(message))))
        )
      )
    );

  @Effect()
  PostJob$: Observable<Action> = this.actions$
    .ofType<PostJob>(JobActionTypes.PostJob)
    .pipe(
      tap(() => this.store.dispatch(new JobsTogglePending())),
      map(action => action.payload),
      exhaustMap(data =>
        this.companyJobService.postJob(data).pipe(
          map(job => {
            this.toast.pop(successToast('job posted with success'));
            this.router.navigate(['/company/jobs/create/success']);
            return new JobsTogglePending();
          }),
          catchError(err => {
            this.store.dispatch(new JobsTogglePending());
            return of(
              this.toast.pop(warnToast('Error posting the job'))
            );
          })
        )
      )
    );

  @Effect()
  UpdateJob$: Observable<Action> = this.actions$
    .ofType<UpdateJob>(JobActionTypes.UpdateJob)
    .pipe(
      tap(() => this.store.dispatch(new JobsTogglePending())),
      map(action => action.payload),
      exhaustMap(({ id, data }) =>
        this.companyJobService.updateJob(id, data).pipe(
          map(job => {
            this.toast.pop(successToast('Job updated successfully'));
            this.router.navigate(['/company/jobs/updated/success']);
            return new JobsTogglePending();
          }),
          catchError(err => {
            this.store.dispatch(new JobsTogglePending());
            return of(
              this.toast.pop(warnToast('Error updated the job, please reload'))
            );
          })
        )
      )
    );

    @Effect()
    $DeletejobByID: Observable<Action> = this.actions$
      .ofType<DeleteJobByID>(JobActionTypes.DeleteJobByID)
      .pipe(
        map(action => action.payload),
        exhaustMap(id =>
          this.companyJobService
            .deleteJobByID(id)
            .pipe(
              delay(400),
              tap(() => this.router.navigate(['/company/jobs'])),
              map(() =>
                this.toast.pop(successToast('Assessment successfuly deleted!'))
              ),
              catchError(err =>
                of(this.toast.pop(warnToast('Error Deleting Assessments!')))
              )
            )
        )
      );

  constructor(
    private actions$: Actions,
    private companyJobService: CompanyJobService,
    private toast: ToasterService,
    private store: Store<fromCompany.CompanyState>,
    private router: Router
  ) {}
}
