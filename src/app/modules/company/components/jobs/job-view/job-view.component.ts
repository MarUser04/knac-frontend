import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Job } from '@app/modules/company/models/job';
import * as moment from 'moment';

@Component({
  selector: 'cmp-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit, OnDestroy {
  public isMobile;
  @Input()
  set job(job: Job) {
    this.data = job;
  }

  @Input()
  id: string;
  @Input()
  tracks: any;
  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();
  data: any = {};

  constructor() {}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 800 ? true : false;
  }

  ngOnDestroy() {
    this.data = {};
  }

  deleteId() {
    this.delete.emit();
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.isMobile = true;
    }
  }

  get trackInfo() {
    if (this.tracks && this.data.job.track) {
      const trackI = this.tracks.filter(track => {
        if (track._id === this.data.job.track) {
          return track;
        }
      });
      return trackI[0] || '';
    } else {
      return '';
    }
  }

  date(dat) {
    if (this.data) {
      const da = moment(dat, 'YYYYMMDD').fromNow();
      return da;
    }
  }

  month(dat) {
    if (this.data) {
      const da = new Date(dat);
      const m = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      return m[da.getMonth()];
    }
  }
}
