import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as fromPage from '@app/modules/admin/reducers';
import { Store, select } from '@ngrx/store';
import { ANIMATION_TYPES } from 'ngx-loading';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  pending$: Observable<boolean>;

  public config = {
    fullScreenBackdrop: true,
    animationType: ANIMATION_TYPES.rectangleBounce,
    backdropBackgroundColour: 'rgb(0, 0, 0, 0.1)',
    backdropBorderRadius: '0px',
    primaryColour: '#01DFA5',
  };

  constructor(store: Store<fromPage.AdminState>) {
    this.pending$ = store.pipe(select(fromPage.getPending));
  }

  ngOnInit() {
  }

}
