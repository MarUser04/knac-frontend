import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from '@angular/core';
import { delay } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'cmp-assessment-preview',
  templateUrl: './assessment-preview.component.html',
  styleUrls: ['./assessment-preview.component.css']
})
export class AssessmentPreviewComponent implements OnInit, OnChanges {
  public isMobile: boolean;

  @Output()
  delete = new EventEmitter<any>();
  @Input()
  preView;
  @Input()
  action;

  @Input()
  skills: any;

  skill: any;

  public loading: boolean;

  @Input()
  set disabled(isPending: boolean) {
    if (isPending) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }

  constructor() {}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 800 ? true : false;
  }

  ngOnChanges() {
    if (this.preView.skills) {
      this.skill = this.preView.skills.map(sk => {
        const skillIf = this.skills.filter(ski => {
          if (sk === ski._id) {
            return ski.name;
          }
        });
        return skillIf[0];
      });
    }
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.isMobile = true;
    }
  }

  deleteAssessmentById() {
    this.delete.emit();
  }
}
