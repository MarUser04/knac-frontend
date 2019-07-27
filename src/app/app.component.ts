import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as fromApp from './state';

@Component({
  selector: 'app-root',
  template: `
    <toaster-container [toasterconfig]="toasterconfig"></toaster-container>
    <router-outlet></router-outlet>
    <ngx-loading [show]="show$ | async"></ngx-loading>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public show$: Observable<any>;

  public toasterconfig: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    newestOnTop: true,
    positionClass: 'toast-bottom-center',
    preventDuplicates: false,
    timeout: 4000,
    animation: 'fade', // 'flyLeft', 'flyRight', 'slideDown', and 'slideUp'
    mouseoverTimerStop: true,
  });

  constructor(private store: Store<any>) {
    // Shows Full Preloading Spinner
    this.show$ = store.pipe(select(fromApp.getShow));
  }
}
