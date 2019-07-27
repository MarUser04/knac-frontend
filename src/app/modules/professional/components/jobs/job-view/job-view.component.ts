import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Job } from '@app/modules/professional/models/job';
import * as moment from 'moment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'prf-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit, OnDestroy {
  @Input()
  job: any;

  @Input()
  id: string;

  @Input()
  pendingApplyJob: boolean;

  @Input()
  applied: any;

  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  submited: EventEmitter<any> = new EventEmitter<any>();

  data: Job = {
    company: [],
    created: '',
    _id: '',
    title: '',
    location: '',
    description: '',
    perks: '',
    image: '',
    user: ''
  };

  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.job = {
      company: [],
      created: '',
      _id: '',
      title: '',
      location: '',
      description: '',
      perks: '',
      image: '',
      user: ''
    };
  }

  submit() {
    this.submited.emit();
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
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
