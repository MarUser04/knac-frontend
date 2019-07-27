import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as PublicProfileActions from '../../actions/public-profile.actions';
import { Professional } from '../../models/professional';
import * as fromProfessional from '../../reducers';

@Component({
  selector: 'xyzb',
  template: `
    <prf-public-profile
      [profile]="profile$ | async"
      (add)="addPhoto($event)"
    ></prf-public-profile>
  `
})
export class PublicProfileContainerComponent implements OnInit {
  profile$: Observable<Professional>;

  constructor(
    private store: Store<fromProfessional.State>,
    private route: ActivatedRoute
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
  }

  ngOnInit() {}

  addPhoto(data) {
    this.store.dispatch(new PublicProfileActions.PostPhoto(data));
  }
}
