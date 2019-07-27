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
  mergeMap,
  tap,
  finalize
} from 'rxjs/operators';

import {
  GetJobs,
  SetJobs,
  JobActionTypes,
  SearchJob,
  GetJobByID,
  SetJobByID,
  GetJobsApplied,
  SetJobsIDs,
  FilterJob,
  ApplyPendingProcessingJob
} from '../actions/jobs.actions';
import { ProfessionalServices } from '@app/services/professional/professional.service';
import { ToasterService } from 'angular2-toaster';
import { warnToast, successToast } from '@app/helpers/helper';
import { Store } from '@ngrx/store';
import * as fromJob from '../reducers';

@Injectable()
export class JobEffects {
  @Effect()
  GetJobs$: Observable<Action> = this.actions$
    .ofType<GetJobs>(JobActionTypes.GetJobs)
    .pipe(
      exhaustMap(() =>
        this.professionalService.getPublicJobs().pipe(
          map(jobs => {
            return new SetJobs(jobs);
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
  SearchJob$: Observable<Action> = this.actions$
    .ofType<SearchJob>(JobActionTypes.SearchJob)
    .pipe(
      map(action => action.payload),
      exhaustMap(term =>
        this.professionalService.searchJobs(term).pipe(
          map(jobs => {
            return new SetJobs(jobs);
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
  FilterJob$: Observable<Action> = this.actions$
    .ofType<FilterJob>(JobActionTypes.FilterJob)
    .pipe(
      map(action => action.payload),
      exhaustMap(id =>
        this.professionalService.filterJobs(id).pipe(
          map(jobs => {
            return new SetJobs(jobs);
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error jobs filter by track, please reload')
              )
            )
          )
        )
      )
    );

  @Effect()
  ApplyJobByID$: Observable<Action> = this.actions$
    .ofType<SearchJob>(JobActionTypes.ApplyJobByID)
    .pipe(
      map((action): string => action.payload),
      tap(() => this.store.dispatch(new ApplyPendingProcessingJob())),
      exhaustMap(id =>
        this.professionalService.applyJobById(id).pipe(
          map(() => {
            this.store.dispatch(new GetJobs());
            this.store.dispatch(new GetJobsApplied());
            this.router.navigate(['/professional/jobs/success']);
            return this.toast.pop(
              successToast('You applied to job with success!')
            );
          }),
          catchError(({ error }) =>
            of(this.toast.pop(warnToast(error.message)))
          ),
          finalize(() => {
            this.store.dispatch(new ApplyPendingProcessingJob());
          })
        )
      )
    );

  @Effect()
  GetJobsApplied$: Observable<Action> = this.actions$
    .ofType<GetJobsApplied>(JobActionTypes.GetJobsApplied)
    .pipe(
      exhaustMap(() =>
        this.professionalService.getAppliedJobs().pipe(
          map(jobs => {
            return new SetJobsIDs(jobs);
          }),
          catchError(err =>
            of(
              this.toast.pop(
                warnToast('Error obtaining the jobs ids, please reload')
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
        this.professionalService.getJobByID(id).pipe(
          map(job => {
            return new SetJobByID(job);
          }),
          catchError(({ message }) => of(this.toast.pop(warnToast(message))))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private professionalService: ProfessionalServices,
    private toast: ToasterService,
    private router: Router,
    private store: Store<fromJob.ProfessionalState>
  ) {}
}
