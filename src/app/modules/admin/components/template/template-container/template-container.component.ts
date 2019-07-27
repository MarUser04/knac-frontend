import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromTemplate from '../../../reducers';
import * as fromPage from '../../../reducers';
import * as templateActions from '../../../actions/template.actions';
import * as PageActions from '../../../actions/page.actions';
import { Template } from '@app/modules/admin/models/template';

@Component({
  selector: 'adm-template-container',
  template: `
    <adm-template
      [templates]="template$ | async"
      [loading]="loading$ | async"
      [modalCreate]="modalCreate$ | async"
      [modalUpdate]="modalUpdate$ | async"
      (create)="createTemplate($event)"
      (update)="onUpdateTemplate($event)"
      (delete)="deleteTemplateById($event)"
    ></adm-template>
  `
})
export class TemplateContainerComponent implements OnInit {
  template$: Observable<any>;
  loading$: Observable<boolean>;
  modalCreate$: Observable<boolean>;
  modalUpdate$: Observable<boolean>;

  constructor(private store: Store<fromTemplate.State>) {
    this.template$ = store.pipe(select(fromTemplate.getTemplates));
    this.loading$ = store.pipe(select(fromPage.getLoading));
    this.modalCreate$ = store.pipe(select(fromPage.getModalCreateToggle));
    this.modalUpdate$ = store.pipe(select(fromPage.getModalUpdateToggle));
  }

  ngOnInit(): void {
    this.store.dispatch(new templateActions.GetTemplates());
  }

  createTemplate({ _id, ...data }: Template) {
    this.store.dispatch(new templateActions.CreateTemplate(data));
  }

  onUpdateTemplate(template: Template) {
    this.store.dispatch(new templateActions.UpdateTemplate(template));
  }

  deleteTemplateById({ _id: id }) {
    this.store.dispatch(new templateActions.DeleteTemplate(id));
  }
}
