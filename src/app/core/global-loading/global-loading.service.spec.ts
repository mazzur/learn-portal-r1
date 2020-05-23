import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GlobalLoadingService } from './global-loading.service';
import Spy = jasmine.Spy;

describe('GlobalLoadingService', () => {
  const debounceTime = 500;

  let service: GlobalLoadingService;
  let showSpinnerSpy: Spy;

  beforeEach(() => {
    showSpinnerSpy = jasmine.createSpy('showSpinnerSpy');
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalLoadingService);
    service.showSpinner$.subscribe(showSpinnerSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not show spinner if requests are resolved in under 500 ms', fakeAsync(() => {
    service.requestStart();
    tick(debounceTime / 4);
    service.requestStart();
    tick(debounceTime / 4);
    service.requestEnd();
    tick(debounceTime / 4);
    service.requestEnd();
    tick(debounceTime / 4);
    expect(showSpinnerSpy.calls.allArgs()).toEqual([[false]]);
  }));

  it('should show spinner when request takes longer than 500ms to complete', fakeAsync(() => {
    service.requestStart();
    tick(debounceTime);
    expect(showSpinnerSpy.calls.allArgs()).toEqual([[false], [true]]);
  }));

  it('should hide spinner once the queue is empty', fakeAsync(() => {
    service.requestStart();
    tick(debounceTime / 2);
    service.requestStart();
    tick(debounceTime / 2);
    expect(showSpinnerSpy.calls.allArgs()).toEqual([[false], [true]]);
    service.requestEnd();
    expect(showSpinnerSpy.calls.allArgs()).toEqual([[false], [true]]);
    tick(100);
    service.requestEnd();
    expect(showSpinnerSpy.calls.allArgs()).toEqual([[false], [true], [false]]);
  }));
});
