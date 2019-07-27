import { Component, OnInit } from '@angular/core';
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
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/defer';

import { CustomValidators } from '../../../../validators/validators';
import { AuthService } from '../../../../services/auth/auth.service';
import { errorToast, successToast } from '../../../../helpers/helper';

@Component({
  selector: 'st-register-professionals',
  styleUrls: ['register-professionals.component.css'],
  templateUrl: 'register-professionals.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class RegisterProfessionalsComponent implements OnInit {
  f: FormGroup;
  loading = false;
  errors: any[];

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private toast: ToasterService,
    private router: Router
  ) {
    this.f = this.builder.group(
      {
        email: ['', [Validators.required, CustomValidators.isEmail]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
            CustomValidators.passwordNumber,
            CustomValidators.passwordUpper,
            CustomValidators.passwordLower,
            CustomValidators.passwordCharacter,
            CustomValidators.passwordSpaces
          ]
        ],
        passwordConfirm: ['', Validators.required],
        cb: [false, Validators.required]
      },
      { validator: CustomValidators.passwordMatcher }
    );
  }

  ngOnInit() {}

  register() {
    return Observable.defer(() => {
      this._disableForm();
      this._toggleLoading();
      return this.auth.getRegistered(this.f.value);
    })
      .finally(() => {
        this._enableForm();
        this._toggleLoading();
      })
      .subscribe({
        next: response => {
          const { user, token } = response.json();

          localStorage.setItem('token', token);
          this.toast.pop(successToast('you registered with success!'));
          this.router.navigate(['/professional/profile']);
        },
        error: error => this.showAlertMssg(error.json())
      });
  }

  getAuthCode() {
    this.auth.getAuthorizationCode();
  }

  private showAlertMssg(error) {
    if (this.checkIsArray(error)) {
      error.forEach(({ msg }) => this.toast.pop(errorToast(msg)));
    } else {
      this.toast.pop(errorToast(error.message));
    }
  }

  private _toggleLoading() {
    this.loading = !this.loading;
  }

  private checkIsArray(value: any): boolean {
    return value instanceof Array;
  }

  private _enableForm() {
    this.f.enable();
  }

  private _disableForm() {
    this.f.disable();
  }

  get email(): AbstractControl {
    return this.f.get('email');
  }

  get password(): AbstractControl {
    return this.f.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.f.get('passwordConfirm');
  }

  get cb(): AbstractControl {
    return this.f.get('cb');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

  inputHasErrorPassword(input: AbstractControl, submitted: boolean) {
    return ((input.errors.required !== null) && (input.dirty || input.touched || submitted));
  }
}
