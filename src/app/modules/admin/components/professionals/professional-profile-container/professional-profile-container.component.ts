import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromProfessional from '../../../reducers';
import * as ProfessionalAction from '../../../actions/professionals.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'adm-professional-profile-container',
  template: `<adm-professional-profile [profile]="profile$ | async">
  </adm-professional-profile>`,
})
export class ProfessionalProfileContainerComponent implements OnInit {

  id: string;
  profile$: Observable<any>;

  constructor(
    private store: Store<fromProfessional.State>,
    private router: ActivatedRoute
  ) {
    this.id = router.snapshot.params.id;
    store.dispatch(new ProfessionalAction.GetProfessional(this.id));
    this.profile$ = store.pipe(select(fromProfessional.getProfessional));
  }

  ngOnInit() {
  }

}
