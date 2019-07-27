import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';

import { CustomValidators } from '@app/validators/validators';

@Component({
  selector: 'st-register-company',
  styleUrls: ['./register-company.component.css'],
  templateUrl: './register-company.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class RegisterCompanyComponent {

  @Input()
  set disabled(isPending: boolean) {
    if (isPending) {
      this.loading = true;
      this.disableForms();
    } else {
      this.loading = false;
      this.enableForms();
    }
  }

  @Output() submitted = new EventEmitter<any>();

  f: FormGroup;
  // textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
  textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\'\s\-]+$/;
  loading: boolean;

  constructor(private builder: FormBuilder) {
    this.f = this.builder.group({
      name: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      lastName: [
        '',
        [Validators.required, Validators.pattern(this.textPattern)]
      ],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.isEmail]],
      phone: [
        '',
        [
          Validators.required,
          CustomValidators.isNumber,
          Validators.maxLength(20),
          Validators.minLength(10)
        ]
      ]
    });
  }

  public register() {
    const company = this.f.value;
    this.submitted.emit(company);
  }

  private enableForms() {
    this.f.enable();
  }

  private disableForms() {
    this.f.disable();
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }
  get lastName(): AbstractControl {
    return this.f.get('lastName');
  }
  get companyName(): AbstractControl {
    return this.f.get('companyName');
  }
  get email(): AbstractControl {
    return this.f.get('email');
  }
  get phone(): AbstractControl {
    return this.f.get('phone');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
