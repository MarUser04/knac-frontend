import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as PublicProfileActions from '@app/shared/actions/public-profile.actions';
import { Professional } from '@app/shared/models/professional';
import * as fromProfessional from '@app/shared/reducers';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'prf-profile-professional-container',
  template: `
    <prf-profile-professional-view
      [profile]="profile$ | async"
      [pending]="pending$ | async"
      [mobal]="mobalToggle$ | async"
      (add)="addPhoto($event)"
      (delete)="deletePhoto($event)"
      (edit)="editPhoto($event)"
      (download)="download($event)"
    ></prf-profile-professional-view>
  `
})
export class ProfileProfessionalContainerComponent
  implements OnInit, OnChanges {
  profile$: Observable<Professional>;
  pending$: Observable<boolean>;
  mobalToggle$: Observable<boolean>;
  showShackBar: boolean;

  constructor(
    private store: Store<fromProfessional.State>,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    const id = this.route.snapshot.params.id;

    let getProfessional: any;
    if (id) {
      getProfessional = new PublicProfileActions.GetProfessionalByID(id);
    } else {
      getProfessional = new PublicProfileActions.GetProfessional();
    }
    store.dispatch(getProfessional);
    this.profile$ = store.pipe(select(fromProfessional.getProfessionalById));
    this.pending$ = store.pipe(select(fromProfessional.getPendingProfilePhote));
    this.mobalToggle$ = store.pipe(select(fromProfessional.modalGaleryToggle));
    store.pipe(select(fromProfessional.showSnackbar)).subscribe(show => {
      this.showShackBar = show;
    });
    if (!this.showShackBar) {
      const message =
        'Knac is now in beta and we will be making lots of updates as we go!' +
        ' Over the next few weeks, great companies such as Google, Nike, Mastercard, eBay, Oscar Health, Vimeo, and a few others will be posting their jobs and assessments on Knac.';
      const x = this.snackBar.open(message, 'close!', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        direction: 'ltr',
        duration: 10000
      });
      this.store.dispatch(new PublicProfileActions.ShowSnackBar());
    }
  }

  ngOnInit() {}

  ngOnChanges(): void {}

  addPhoto(data) {
    this.store.dispatch(new PublicProfileActions.PostPhoto(data));
  }

  deletePhoto(id) {
    this.store.dispatch(new PublicProfileActions.DeletePhoto(id));
  }

  editPhoto(data) {
    this.store.dispatch(new PublicProfileActions.EditPhoto(data));
  }

  download(url) {
    this.store.dispatch(new PublicProfileActions.DownloadCV(url));
  }
}
