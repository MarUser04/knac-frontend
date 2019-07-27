import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as ProfessionalList from '../../actions/professional-list.actions';
import { Professional } from '../../models/professional';
import * as fromProfessionalList from '../../reducers';

@Component({
  selector: 'xyza',
  template: `
    <prf-professionals-list
      [professionals]="professionals$ | async"
      [module]="module"
    >
    </prf-professionals-list>
  `
})
export class ProfessionalListContainerComponent implements OnInit {
  professionals$: Observable<any>;
  module: String;

  constructor(
    private store: Store<fromProfessionalList.State>,
    private route: Router
  ) {
    store.dispatch(new ProfessionalList.GetList());
    this.module = route.url.split('/')[1];
    this.professionals$ = store.pipe(
      select(fromProfessionalList.getProfessionals)
    );
  }

  ngOnInit(): void {}
}
