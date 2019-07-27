import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Job } from '@app/modules/company/models/job';
import { readUploadedFileAsDataURL, warnToast } from '@app/helpers/helper';
import { ToasterService } from 'angular2-toaster';
import * as moment from 'moment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'cmp-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  @Input()
  action: string;
  @Input()
  tracks: any;
  @Input()
  set job(job: any) {
    if (job.job) {
      const { title, location, description, track, perks, type } = job.job;
      this.f.patchValue({
        title: title || '',
        location: location || '',
        description: description || '',
        track: track ? track._id : '',
        perks: perks || '',
        type: type || ''
      });
    }
  }

  @Input()
  set isLoading(loading: boolean) {
    if (loading) {
      this.f.disable();
    } else {
      this.f.enable();
    }
    this.loading = loading;
  }

  // Refactor
  @Input()
  set modalJob(jobModalActived: boolean) {
    if (!jobModalActived) {
      this.showDialog = false;
    }
  }

  @Output()
  submitted: EventEmitter<Job> = new EventEmitter<Job>();

  f: FormGroup;
  logoUrl: any;
  loading: boolean;
  showDialog = false;
  jobTypes: any;
  date: string;
  month: String;
  isMobile: boolean = false;

  constructor(private builder: FormBuilder, private toast: ToasterService,  private breakpointObserver: BreakpointObserver) {
    this.f = this.builder.group({
      title: [null, Validators.required],
      location: [null, Validators.required],
      description: [null, Validators.required],
      track: [null, Validators.required],
      perks: [null, Validators.required],
      type: [null, Validators.required]
    });
    this.jobTypes = ['Full time', 'Part time'];
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
          this.setIsMobile(result.matches);
      });
  }

  static validateFileUpload(e) {
    if (e && e.target && e.target.files) {
      const fileList = e.target.files;
      return fileList.item(fileList.length - 1);
    } else {
      return null;
    }
  }

  ngOnInit() {}

  submit() {
    this.submitted.emit(this.f.value);
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  getDate() {
    const d = new Date();
    const da = moment(d, 'YYYYMMDD').fromNow();
    this.date = da;
  }

  public get title(): AbstractControl {
    return this.f.get('title');
  }

  public get location(): AbstractControl {
    return this.f.get('location');
  }

  public get description(): AbstractControl {
    return this.f.get('description');
  }

  public get perks(): AbstractControl {
    return this.f.get('perks');
  }

  get track(): AbstractControl {
    return this.f.get('track');
  }

  get type(): AbstractControl {
    return this.f.get('type');
  }

  get trackInfo() {
    const trackI = this.tracks.filter(track => {
      if (track._id === this.f.get('track').value) {
        return track;
      }
    });
    return trackI[0] || '';
  }

  // public get image(): AbstractControl {
  //   return this.f.get('image');
  // }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

  onChangeTemplate(e) {}
}
