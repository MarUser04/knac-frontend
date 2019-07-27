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
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { CustomValidators } from '@app/validators/validators';
import { Questions } from '@app/modules/admin/models/questions';

@Component({
  selector: 'adm-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnChanges {
  @Input() questions;
  @Input()
  set isloading(isloading) {
    if (isloading) {
      this.f.disable();
    } else {
      this.f.enable();
    }
    this.loading = isloading;
  }
  loading: boolean;
  @Output() submitted = new EventEmitter<Questions>();

  f: FormGroup;

  constructor(private builder: FormBuilder) {
    this.f = this.builder.group({
      question1: ['', [Validators.required]],
      question2: [''],
      question3: [''],
      question4: [''],
      question5: ['']
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    const { _id, __v, ...data } = this.questions;
    if (data) {
      this.f.patchValue(data);
    }
  }

  public submit() {
    this.submitted.emit(this.f.value);
  }

  get question1(): AbstractControl {
    return this.f.get('question1');
  }

  get question2(): AbstractControl {
    return this.f.get('question2');
  }

  get question3(): AbstractControl {
    return this.f.get('question3');
  }

  get question4(): AbstractControl {
    return this.f.get('question4');
  }

  get question5(): AbstractControl {
    return this.f.get('question5');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
