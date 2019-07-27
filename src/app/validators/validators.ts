import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static passwordMatcher(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    return c.get('password').value === c.get('passwordConfirm').value
      ? null
      : { notmatch: true };
  }

  static passwordNumber(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasNumber = /(?:.*\d)/.test(c.value);
    return hasNumber ? null : { hasNumber: true };
  }

  static passwordUpper(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasUpper = /(?:.*[A-Z])/.test(c.value);
    return hasUpper ? null : { hasUpper: true };
  }

  static passwordLower(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasLower = /(?:.*[a-z])/.test(c.value);
    return hasLower ? null : { hasLower: true };
  }

  static passwordCharacter(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasCharacter = /(?:.*[^\w\d\s:])/.test(c.value);
    return hasCharacter ? null : { hasCharacter: true };
  }

  static passwordSpaces(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const notSpaces = !/[^\S]/.test(c.value);
    return notSpaces ? null : { notSpaces: true };
  }

  static photoFile(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasTypeFile = /\.(jpg|jpeg|png)$/i.test(c.value.name);
    return hasTypeFile ? null : { hasTypeFile: true };
  }

  static nameText(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasName = /^[A-z]+$/.test(c.value);
    return hasName ? null : { hasName: true };
  }

  static resumeFile(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasResume = /\.(pdf)$/i.test(c.value.name);
    return hasResume ? null : { hasResume: true };
  }

  static descriptionText(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const hasDescription = /^[A-z\s]+$/.test(c.value);
    return hasDescription ? null : { hasDescription: true };
  }

  static isUrl(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const isUrl = /^(?:[a-z][0-9a-z-.+]*:\/\/)?((?:(?:[a-z\u00a1-\uffff0-9_]+-?)*[a-z\u00a1-\uffff0-9_]+)(?:\.(?:[a-z\u00a1-\uffff0-9_]+-?)*[a-z\u00a1-\uffff0-9_]+)*(?:\.(?:[a-z0-9\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/.*)?(?:\?.*)?(?:\#.*)?$/gim.test(c.value);
    return isUrl ? null : { isUrl: true };
  }

  static isNumber(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const isNumber = /^\d+$/.test(c.value);
    return isNumber ? null : { isNumber: true };
  }

  static isEmail(c: AbstractControl) {
    if (!c.value) {
      return null;
    }
    const isEmail = /^[a-zA-Z0-9_\-\.~]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,4}$/.test(
      c.value
    );
    return isEmail ? null : { isEmail: true };
  }
}
