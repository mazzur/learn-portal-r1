import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { of, ReplaySubject, Subject } from 'rxjs';

export class ActivatedRouteStub {
  private subject = new ReplaySubject<ParamMap>();
  data = of({});

  constructor(initialParams: Params = {}) {
    this.setParamMap(initialParams);
  }

  readonly params = this.subject.asObservable();

  setParamMap(params: Params) {
    this.subject.next(convertToParamMap(params));
  }
}
