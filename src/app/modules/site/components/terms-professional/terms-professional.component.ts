import { Component, OnInit } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-terms-professional',
  templateUrl: './terms-professional.component.html',
  styleUrls: ['./terms-professional.component.css']
})
export class TermsProfessionalComponent implements OnInit {
  router: string;

  constructor(private route: Router) {
    const state: RouterState = route.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    this.router = snapshot.url;
  }

  ngOnInit() {}
}
