import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Questions } from '@app/modules/company/models/questions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'cmp-assessment-feedback',
  templateUrl: './assessment-feedback.component.html',
  styleUrls: ['./assessment-feedback.component.css']
})
export class AssessmentFeedbackComponent implements OnInit, OnChanges {
  @Input() questions: Questions;
  @Input() id: string;
  @Input() ids: string;
  @Input() loading: boolean;
  @Input() company: any;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  f: FormGroup;
  isMobile: boolean = false;
  constructor(
    builder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.f = builder.group({
      answer1: ['', Validators.required],
      answer2: [''],
      answer3: [''],
      answer4: [''],
      answer5: [''],
      feedback: ['']
    });
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {}

  ngOnChanges() {}

  submit() {
    const {
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      feedback
    } = this.f.value;
    const payload = {
      answer1,
      answer2: answer2 || '0',
      answer3: answer3 || '0',
      answer4: answer4 || '0',
      answer5: answer5 || '0',
      feedback
    };
    this.submitted.emit(payload);
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  get answer1(): AbstractControl {
    return this.f.get('answer1');
  }

  get answer2(): AbstractControl {
    return this.f.get('answer2');
  }
  get answer3(): AbstractControl {
    return this.f.get('answer3');
  }
  get answer4(): AbstractControl {
    return this.f.get('answer4');
  }
  get answer5(): AbstractControl {
    return this.f.get('answer5');
  }
  get feedback(): AbstractControl {
    return this.f.get('feedback');
  }
  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
