import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cmp-assessment-create-success',
  templateUrl: './assessment-create-success.component.html',
  styleUrls: ['./assessment-create-success.component.css']
})
export class AssessmentCreateSuccessComponent implements OnInit {
  action: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.action = this.activatedRoute.snapshot.data['action'];
  }

  ngOnInit() {}
}
