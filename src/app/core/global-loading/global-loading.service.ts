import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoadingService {
  showSpinner$ = new BehaviorSubject<boolean>(false);
  private debounceTime = 500;
  private requestsCount = 0;
  private isPending = new Subject<boolean>();

  constructor() {
    this.isPending.pipe(
      filter(pending => pending),
      debounceTime(this.debounceTime)
    ).subscribe(() => {
      if (this.requestsCount > 0) {
        this.showSpinner();
      }
    });
  }

  private showSpinner() {
    this.showSpinner$.next(true);
    this.isPending
      .pipe(filter(pending => !pending))
      .subscribe(() => {
        this.showSpinner$.next(false);
      });
  }

  requestStart() {
    if (this.requestsCount === 0) {
      this.isPending.next(true);
    }
    this.requestsCount++;
  }

  requestEnd() {
    this.requestsCount--;
    if (this.requestsCount === 0) {
      this.isPending.next(false);
    }
  }
}
