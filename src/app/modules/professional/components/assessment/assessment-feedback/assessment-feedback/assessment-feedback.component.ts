import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'prf-assessment-feedback',
  templateUrl: './assessment-feedback.component.html',
  styleUrls: ['./assessment-feedback.component.css']
})
export class AssessmentFeedbackComponent implements OnInit, OnChanges {
  @Input() feedback: any;
  @Input() questions: any;

  f: FormGroup;
  constructor(builder: FormBuilder) {
    this.f = builder.group({
      answer1: [{ value: '', disabled: true }],
      answer2: [{ value: '', disabled: true }],
      answer3: [{ value: '', disabled: true }],
      answer4: [{ value: '', disabled: true }],
      answer5: [{ value: '', disabled: true }],
      feedback: ['']
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    if(this.feedback.feedback) {

      this.f.patchValue(this.feedback.feedback);
    }
  }

  get answer1(): AbstractControl {
    return this.f.get('answer1');
  }
}
