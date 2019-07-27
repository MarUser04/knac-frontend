import { Component, OnInit, Input } from '@angular/core';
import { Assessment } from '@app/shared/models/assessment';

@Component({
  selector: 'cmp-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {
  public isMobile: boolean;
  @Input() assessments: Assessment[];
  pageOfItems: Assessment[];

  ngOnInit() {
    this.isMobile = window.innerWidth <= 800 ? true : false;
  }
  onChangePage(pageOfItems: Assessment[]) {
    this.pageOfItems = pageOfItems;
  }
  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.isMobile = true;
    }
  }
}
