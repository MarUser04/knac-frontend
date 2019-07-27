import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Assessment } from '@app/shared/models/assessment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'cmp-assessment-create-description',
  templateUrl: './assessment-create-description.component.html',
  styleUrls: ['./assessment-create-description.component.css']
})
export class AssessmentCreateDescriptionComponent implements OnInit {
  @Output() view = new EventEmitter<any>();
  @Output() data = new EventEmitter<any>();
  @Output() back = new EventEmitter<any>();
  @Input() action: string;
  @Input() preView: Assessment;
  @Input() templates: any;
  f: FormGroup;
  type: Array<any>;
  isMobile: boolean = false;

  constructor(
    private builder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.type = ['Behavioral', 'Personality'];
    this.f = this.builder.group({
      type: ['', Validators.required],
      template: [''],
      question: ['', Validators.required]
    });
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {
    this.f.patchValue(this.preView);
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  clickBack() {
    this.back.emit(1);
  }

  onChangeTemplate(e) {
    this.f.get('question').setValue(e.content);
  }

  clickView() {
    if (this.f.valid) {
      this.view.emit(3);
      this.data.emit(this.f.value);
    }
  }

  get assessmentType(): AbstractControl {
    return this.f.get('type');
  }

  get assessmentTemplate(): AbstractControl {
    return this.f.get('template');
  }

  get question(): AbstractControl {
    return this.f.get('question');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
