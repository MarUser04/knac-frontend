import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/defer';

import { successToast, errorToast } from '../../../../helpers/helper';
import { AuthService } from '../../../../services/auth/auth.service';
import { CustomValidators } from '../../../../validators/validators';

@Component({
 selector: 'st-reset-password',
 templateUrl: './reset-password.component.html',
 styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

 f: FormGroup;
 loading: boolean;

 constructor(
   private builder: FormBuilder,
   private auth: AuthService,
   private route: ActivatedRoute,
   private router: Router,
   private toast: ToasterService
 ) {}

 ngOnInit() {
   this.f = this.builder.group({
       password: ['', [
         Validators.required,
         Validators.minLength(8),
         Validators.maxLength(16),
         CustomValidators.passwordNumber,
         CustomValidators.passwordUpper,
         CustomValidators.passwordLower,
         CustomValidators.passwordCharacter,
         CustomValidators.passwordSpaces,
       ]],
       passwordConfirm: ['', Validators.required]
   },  { validator: CustomValidators.passwordMatcher});
 }

  reset() {
    return Observable.defer(() => {
      this._toggleLoading();
      this._disableForm();
      const { token } = this.route.snapshot.params;
      const { password, passwordConfirm } = this.f.value;
      return this.auth.resetPassword({token, password, passwordConfirm});
    })
      .finally(() => {
        this._enableForm();
        this._toggleLoading();
      })
      .subscribe({
        next: (resp) => {
          this.toast.pop(successToast('Password has been reset!'));
          this.router.navigate(['/home/login']);
        },
        error: (err: HttpErrorResponse) => {
          const { error } = err;
          this.toast.pop(errorToast(`We couldn't reset your password!`));
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

  get password(): AbstractControl {
    return this.f.get('password');
  }
  get passwordConfirm(): AbstractControl {
    return this.f.get('passwordConfirm');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

}
