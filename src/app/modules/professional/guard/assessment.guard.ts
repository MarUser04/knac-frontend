import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

import * as fromAssessment from '@app/shared/reducers';
import * as fromAssessmentProfessional from '@app/modules/professional/reducers';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class AssessmentGuard implements CanDeactivate<CanComponentDeactivate> {
  take: boolean;

  constructor(private store: Store<fromAssessment.State>) {
    this.store
      .select(fromAssessmentProfessional.getTakingPendingProcessingAssessment)
      .subscribe(take => (this.take = take));
  }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
