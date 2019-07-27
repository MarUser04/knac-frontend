import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges
} from '@angular/core';
import { Assessment } from '../../../../models/assessment';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-submissions-view',
  templateUrl: './submissions-view.component.html',
  styleUrls: ['./submissions-view.component.css']
})
export class SubmissionsViewComponent implements OnInit, OnChanges {
  public isMobile;
  @Input() assessment: any;
  @Input() questions: any;
  @Input() action: string;
  @Input() skills: any;

  @Input()
  set isLoading(pending) {
    if (pending) {
      this.f.disable();
    } else {
      this.f.enable();
    }
    this.pending = pending;
  }

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  submissionSelected: any;
  f: FormGroup;
  showFeedback: boolean;
  pending: boolean;
  rate = 3;

  constructor(private builder: FormBuilder) {
    this.f = this.builder.group({
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
      answer5: ['', [Validators.required]],
      feedback: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 800 ? true : false;
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.isMobile = true;
    }
  }

  ngOnChanges() {
    if (this.action === 'professional') {
      if (this.assessment.assessment) {
        this.skills = this.assessment.assessment.skills.map(sk => {
          const skillIf = this.skills.filter(ski => {
            if (sk === ski._id) {
              return ski.name;
            }
          });
          return skillIf[0];
        });
      }
    }
  }

  @Input()
  set modalFeedback(isModal: boolean) {
    if (!isModal) {
      this.showFeedback = false;
    }
  }

  selectSubmission(submissions: any): void {
    this.submissionSelected = submissions;
  }

  // get professional() {
  //   return this.assessment.professional[0];
  // }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

  submit() {
    this.submitted.emit({
      idS: this.submissionSelected._id,
      data: this.f.value
    });
  }
}
