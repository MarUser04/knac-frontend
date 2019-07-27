import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Assessment } from '@app/shared/models/assessment';
import { Router } from '@angular/router';

@Component({
  selector: 'prf-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit, OnChanges {
  @Input() assessmentsCompleted: any[];
  @Input() assessmentsNotCompleted: any[];
  pageOfItems: any[];
  assessmentsList: any[];

  checked = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnChanges() {
    this.assessmentsList = this.assessmentsNotCompleted;
  }

  onChangePage(pageOfItems: Assessment[]) {
    this.pageOfItems = pageOfItems;
  }

  changeSwitch() {
    this.checked = !this.checked;
    if (this.checked) {
      this.assessmentsList = this.assessmentsCompleted;
    } else {
      this.assessmentsList = this.assessmentsNotCompleted;
    }
  }

  selectAssessment(itemId) {
    this.router.navigate([
      `/professional/assessment/${itemId}`
    ]);
  }
}
