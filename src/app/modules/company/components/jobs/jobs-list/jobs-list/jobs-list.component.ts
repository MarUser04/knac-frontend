import { Component, OnInit, Input } from '@angular/core';

import { Job } from '@app/modules/company/models/job';

@Component({
  selector: 'cmp-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  public isMobile;
  @Input()
  jobs: any[];
  @Input()
  tracks: any[];

  pageOfItems: any[];

  constructor() {}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 800 ? true : false;
  }

  onChangePage(pageOfItems: any[]) {
    this.pageOfItems = pageOfItems;
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.isMobile = true;
    }
  }

  track(i) {
    return this.tracks.find(track => track._id === this.jobs[i].track).name;
  }
}
