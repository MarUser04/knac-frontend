import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-linkedin',
  templateUrl: './auth-linkedin.component.html',
  styleUrls: ['./auth-linkedin.component.css']
})
export class AuthLinkedinComponent implements OnInit {
  appIsApproved: boolean;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.appIsApproved = this.route.snapshot.data.appIsAuthorized;
  }
}
