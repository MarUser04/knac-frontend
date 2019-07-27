import { Observable } from 'rxjs/Observable';

import { testData } from '../models/testData';

export class AuthServiceStub {
  public getLoggingIn({ email, password }): Observable<any> {
    return Observable.of(testData);
  }
}
