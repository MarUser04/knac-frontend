import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { delay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'cmp-assessment-create-preview',
  templateUrl: './assessment-create-preview.component.html',
  styleUrls: ['./assessment-create-preview.component.css']
})
export class AssessmentCreatePreviewComponent implements OnInit {
  @Output()
  back = new EventEmitter<any>();
  @Output()
  submited = new EventEmitter<any>();
  @Output()
  delete = new EventEmitter<any>();
  @Input()
  preView;
  @Input()
  action;
  @Input()
  tracks: any;
  @Input()
  set skills(skills) {
    this.skill = this.preView.skills.map(sk => {
      const skillIf = skills.filter(ski => {
        if (sk === ski._id) {
          return ski.name;
        }
      });
      return skillIf[0];
    });
  }
  skill: any;
  public loading: boolean;
  isMobile: boolean = false;

  @Input()
  set disabled(isPending: boolean) {
    if (isPending) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {}

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  clickBack() {
    this.back.emit(2);
  }

  deleteAssessmentById() {
    this.delete.emit();
  }

  clickSubmit() {
    this.submited.emit();
  }

  get trackInfo() {
    const trackI = this.tracks.filter(track => {
      if (track._id === this.preView.track) {
        return track;
      }
    });
    return trackI[0] || '';
  }
}
