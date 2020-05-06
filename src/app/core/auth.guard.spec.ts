import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthorizationService } from 'App/core/authorization.service';
import { mockService } from 'App/testing/helpers';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthorizationService, useValue: mockService(AuthorizationService) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
