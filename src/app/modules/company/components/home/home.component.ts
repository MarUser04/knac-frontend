import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as CompanyActions from '../../actions/company.actions';
import * as fromCompany from '../../reducers';

@Component({
  selector: 'cmp-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile$: Observable<any>;

  constructor(
    store: Store<any>
  ) {
    this.profile$ = store.select(fromCompany.getProfile);
  }

  ngOnInit() {}
}
