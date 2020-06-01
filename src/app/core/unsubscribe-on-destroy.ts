import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class UnsubscribeOnDestroy implements OnDestroy {
  protected unsubscribeOnDestroy = new Subject();

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }
}
