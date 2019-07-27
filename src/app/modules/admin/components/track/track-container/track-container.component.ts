import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Store, select } from '@ngrx/store';
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
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/defer';

import { Track } from '@app/modules/admin/models/track';
import * as fromTrack from '../../../reducers';
import * as fromPage from '../../../reducers';
import * as TrackActions from '../../../actions/track.actions';
import * as PageActions from '../../../actions/page.actions';
import { AdminService } from '@app/services/admin/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { errorToast } from '@app/helpers/helper';

@Component({
  selector: 'app-track-container',
  template: `
    <app-track
      [tracks]="tracks$ | async"
      [loading]="loading$ | async"
      [modalCreate]="modalCreate$ | async"
      [modalUpdate]="modalUpdate$ | async"
      (create)="createTrack($event)"
      (update)="onUpdateTrack($event)"
      (delete)="deleteTrackById($event)"
    ></app-track>
  `,
  styleUrls: ['./track-container.component.css']
})
export class TrackContainerComponent implements OnInit, OnDestroy {
  tracks$: Observable<Track[]>;
  loading$: Observable<boolean>;
  modalCreate$: Observable<boolean>;
  modalUpdate$: Observable<boolean>;
  unsubscribeDelete;

  constructor(
    private store: Store<fromTrack.State>,
    private admin: AdminService,
    private toast: ToasterService
  ) {
    this.tracks$ = store.pipe(select(fromTrack.selectAllTracks));
    this.loading$ = store.pipe(select(fromPage.getLoading));
    this.modalCreate$ = store.pipe(select(fromPage.getModalCreateToggle));
    this.modalUpdate$ = store.pipe(select(fromPage.getModalUpdateToggle));
  }

  ngOnInit(): void {
    this.store.dispatch(new TrackActions.GetTracks());
  }

  ngOnDestroy() {
  }

  createTrack({ name }: Track) {
    this.store.dispatch(new TrackActions.CreateTrack({ name }));
  }

  onUpdateTrack(track: Track) {
    this.store.dispatch(new TrackActions.UpdateTrack(track));
  }

  deleteTrackById({ _id: id }) {
    this.unsubscribeDelete = Observable.defer(() => {
      return this.admin.checkSkillsOrTrack({ name: 'trackId', id });
    }).subscribe({
      next: ({ tracks }) => {
        if (tracks) {
          this.store.dispatch(new TrackActions.DeleteTrack(id));
        } else {
          this.toast.pop(
            errorToast('The track you want to delete is being used')
          );
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toast.pop(errorToast(error.message));
      }
    });
  }
}
