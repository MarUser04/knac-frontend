import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Assessment } from '@app/shared/models/assessment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'cmp-assessment-create',
  templateUrl: './assessment-create.component.html',
  styleUrls: ['./assessment-create.component.css']
})
export class AssessmentCreateComponent implements OnInit {
  f: FormGroup;
  @Input()
  tracks: any;
  @Input()
  action: string;
  @Input()
  skills: any;
  @Input()
  set setPreView(preView) {
    this.f.patchValue(preView);
    if (this.action === 'update') {
      this.f.controls['track'].setValue(this.f.controls['track'].value._id);
    }
  }

  preView: Assessment;
  @Output()
  view = new EventEmitter<any>();
  @Output()
  data = new EventEmitter<any>();
  textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
  numberPattern = /^[0-9]+$/;
  isMobile: boolean = false;

  constructor(private builder: FormBuilder,private breakpointObserver: BreakpointObserver) {
    this.f = this.builder.group({
      name: [null, [Validators.required, Validators.pattern(this.textPattern)]],
      track: [null, Validators.required],
      skills: [null, Validators.required],
      durationInMinutes: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(this.numberPattern)
        ]
      ],
      isFile: [null, Validators.required],
      update: [null],
      write: [null]
    });
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
          this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {
    // this.f.patchValue(this.preView);
    // if (this.action === 'update') {
    //   this.f.controls['track'].setValue(this.preView.track._id);
    // }
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  onClickOptions(flag: boolean): void {
    this.f.get('isFile').setValue(flag);
  }

  onFileChange(e, name) {
    const files = e.target.files;
    this.f.get(name).setValue(files[0]);
  }

  clickView() {
    if (this.f.valid) {
      this.view.emit(2);
      this.data.emit(this.f.value);
    }
  }

  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }

  get track(): AbstractControl {
    return this.f.get('track');
  }

  get skill(): AbstractControl {
    return this.f.get('skills');
  }

  get durationInMinutes(): AbstractControl {
    return this.f.get('durationInMinutes');
  }

  get isFile(): AbstractControl {
    return this.f.get('isFile');
  }

  get update(): AbstractControl {
    return this.f.get('update');
  }

  get write(): AbstractControl {
    return this.f.get('write');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

  onChangeTemplate(e) {}
}
