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
import { CustomValidators } from '../../../../validators/validators';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/defer';

import { warnToast, infoToast, successToast } from '../../../../helpers/helper';

@Component({
  selector: 'st-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class RecoverPasswordComponent implements OnInit {
  email: FormControl;
  f: FormGroup;
  loading: boolean;

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private toast: ToasterService
  ) {}

  ngOnInit() {
    this.email = new FormControl('', [
      Validators.required,
      CustomValidators.isEmail
    ]);

    this.f = this.builder.group(
      {
        email: this.email
      },
      { updateOn: 'submit' }
    );
  }

  recover() {
    const { email } = this.f.value;
    return Observable.defer(() => {
      this._disableForm();
      this._toggleLoading();
      return this.auth.recoverPassword(email);
    })
      .finally(() => {
        this._enableForm();
        this._toggleLoading();
      })
      .subscribe({
        next: resp => {
          this.toast.pop(successToast(`Mail has been sent to: ${email}`));
          this.toast.pop(
            infoToast(
              'If you have an account in Knac, you should have a password reset email in your inbox.'
            )
          );
        },
        error: (err: HttpErrorResponse) => {
          const { error } = err;
          this.toast.pop(
            warnToast(`We couldn't send email to your account: ${email}`)
          );
        }
      });
  }

  private _toggleLoading() {
    this.loading = !this.loading;
  }

  private _disableForm() {
    this.f.disable();
  }

  private _enableForm() {
    this.f.enable();
  }

  get emailRecover(): AbstractControl {
    return this.f.get('email');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
