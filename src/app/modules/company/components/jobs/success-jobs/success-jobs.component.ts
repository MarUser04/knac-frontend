import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-jobs',
  templateUrl: './success-jobs.component.html',
  styleUrls: ['./success-jobs.component.css']
})
export class SuccessJobsComponent implements OnInit {
  action: string;

  constructor(private router: Router) {
    const url = this.router.url;
    this.action = url.indexOf('create') > 0 ? 'posted' : 'updated';
  }

  ngOnInit() {}
}
