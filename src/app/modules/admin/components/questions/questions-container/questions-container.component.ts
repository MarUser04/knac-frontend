import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';

import { Questions } from '../../../models/questions';
import * as QuestionsActions from '../../../actions/questions.actions';
import * as fromQuestions from '../../../reducers';
import * as fromPage from '../../../reducers';

@Component({
  selector: 'adm-questions-container',
  template: `<adm-questions
              [questions]="questions$ | async"
              [isloading]="loading$ | async"
              (submitted)="updateQuestions($event)"
              ></adm-questions>`
})
export class QuestionsContainerComponent implements OnInit {
  questions$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromQuestions.State>) {
    this.questions$ = store.pipe(select(fromQuestions.getQuestions));
    this.loading$ = store.pipe(select(fromPage.getLoading));
  }

  ngOnInit() {
    this.store.dispatch(new QuestionsActions.GetQuestions());
  }

  updateQuestions(data: Questions) {
    this.store.dispatch(new QuestionsActions.UpdateQuestions(data));
  }
}
