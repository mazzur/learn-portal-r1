import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from 'App/core/user.service';
import { mockService } from 'App/testing/helpers';
import { AuthorizationService } from 'App/core/authorization.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockUserService: any;

  beforeEach(async(() => {
    mockUserService = mockService(UserService);
    mockUserService.user$ = new BehaviorSubject({});
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: Router, useValue: { events: new Subject() } },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthorizationService, useValue: mockService(AuthorizationService) },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
