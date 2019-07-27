import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';

import { Job } from '@app/modules/professional/models/job';
import * as JobActions from '../../../actions/jobs.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'prf-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit, OnChanges, OnDestroy {
  jobs: any;
  @Input() jobsApplied: any;
  @Input() jobsNotApplied: any;
  checked = false;
  @Input() tracks: any;
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();
  track: FormControl;
  pageOfItems: any;

  constructor(private store: Store<any>) {
    this.track = new FormControl();
  }

  ngOnInit() {}

  ngOnChanges() {
    this.jobs = this.jobsNotApplied;
  }

  ngOnDestroy() {
    this.track.setValue(null);
  }

  onChangePage(pageOfItems: any) {
    this.pageOfItems = pageOfItems;
  }

  changeSwitch() {
    this.checked = !this.checked;
    if (this.checked) {
      this.jobs = this.jobsApplied;
    } else {
      this.jobs = this.jobsNotApplied;
    }
  }

  applyJob(id: string) {
    this.store.dispatch<JobActions.ApplyJobByID>(
      new JobActions.ApplyJobByID(id)
    );
  }

  filterJobs() {
    if (this.checked) {
      this.changeSwitch();
    }
    this.filter.emit(this.track.value);
  }
}
