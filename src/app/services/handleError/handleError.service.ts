import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { warnToast, errorToast } from '@app/helpers/helper';

@Injectable()
export class HandleErrorService {

  constructor(
    private toast: ToasterService
  ) { }

  showAlertMssg(error) {
    try {
      if (this._checkIsArray(error)) {
        return this._showArrayOfErrors(error);
      } else if (error.message) {
        return this.toast.pop(warnToast(error.message));
      } else {
        return this.toast.pop(errorToast('Please, try again later!'));
      }
    } catch (e) {
      throw new Error('Structure has been changed!' + e);
    }
  }

  private _showArrayOfErrors(error) {
    return error.forEach(({msg}) => (
      this.toast.pop(warnToast(msg))
    ));
  }

  private _checkIsArray(value: any): boolean {
    return value instanceof Array;
  }

}
