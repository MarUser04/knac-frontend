import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { warnToast } from '@app/helpers/helper';
import * as fromAssessment from '@app/shared/reducers';
import { Store, select } from '@ngrx/store';
import { Assessment } from '@app/shared/models/assessment';
import * as AssessmentActions from '@app/modules/professional/actions/assessments.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'prf-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent implements OnInit, OnDestroy, OnChanges {
  f: FormGroup;
  timeHasOver = false;

  @Input()
  preView: any;
  @Input()
  pendingProcessingAssessment: boolean;
  @Input()
  taking: boolean;
  @Input()
  assessmentExpiration: string;
  @Input()
  skills: any;
  @Input() set showWarningModal(sh) {}

  skill: any;

  filePattern = /.(pdf|doc|docx)$/i;
  @Output()
  submited: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  submittedAssessment: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onTimeFinished: EventEmitter<any> = new EventEmitter<any>();

  isMobile: boolean = false;
  show: boolean = false;
  showWarning: boolean = false;
  take: boolean;

  constructor(
    private builder: FormBuilder,
    private toast: ToasterService,
    private store: Store<fromAssessment.State>,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.f = this.builder.group({
      answer: ['', Validators.required],
      file: ['', [Validators.required, Validators.pattern(this.filePattern)]]
    });

    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
          this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.preView.skills && this.skills) {
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

  onClickTake(): void {
    this.show = false;
    this.submited.emit();
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  openFileBrowser(e) {
    e.preventDefault();

    const element: HTMLElement = document.getElementById('file') as HTMLElement;
    element.click();
  }

  onFileChange(e) {
    const files = e.target.files;
    if (this.fileExtension(files[0].type)) {
      this.f.get('file').setValue(files[0]);
    } else {
      this.toast.pop(
        warnToast('Wrong file extension. Please, select a correct file!')
      );
    }
  }

  public fileExtension(file) {
    const extensions = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/pdf'
    ];
    const validation = extensions.indexOf(file);
    return validation > -1;
  }

  redirect() {
    this.showWarning = false;
    this.take = true;
    this.router.navigate(['/professional/assessments']);
  }

  public get fileName() {
    const file = this.f.get('file').value;
    return file
      ? file.name
      : 'No file selected (.doc/.docx/.xls/.xlsx/.ppt/.pptx/.pdf)';
  }

  public get answer() {
    return this.f.get('answer');
  }

  public get file() {
    return this.f.get('file');
  }

  public submit() {
    const isFile = this.preView.isFile;
    const answerIsValid = this.f.get('answer').valid;
    const fileIsValid = this.f.get('file').value !== '';

    if (isFile && fileIsValid) {
      this.submittedAssessment.emit({ file: this.f.get('file').value });
      this.timeHasOver = true;
    } else if (!isFile && answerIsValid) {
      this.submittedAssessment.emit({ answer: this.f.get('answer').value });
      this.timeHasOver = true;
    }
  }

  public timeIsOver() {
    if (!this.timeHasOver) {
      this.timeHasOver = true;
      this.onTimeFinished.emit();
    }
  }

  ngOnDestroy() {
    if (this.taking && !this.timeHasOver) {
      this.store.dispatch(
        new AssessmentActions.TakingPendingProcessingAssessment()
      );
    }
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
