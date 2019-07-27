import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterStateSnapshot,
  Router,
  RouterState
} from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms-company.component.html',
  styleUrls: ['./terms-company.component.css']
})
export class TermsCompanyComponent implements OnInit {
  panelOpenState = false;
  router: string;

  constructor(private route: Router) {
    const state: RouterState = route.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    this.router = snapshot.url;
  }

  ngOnInit() {}
}
