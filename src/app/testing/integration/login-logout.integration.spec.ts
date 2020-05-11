import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginPageComponent } from 'App/login/login-page/login-page.component';
import { By } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { storageKeys } from 'App/core/storage-keys';
import SpyObj = jasmine.SpyObj;
import { HeaderComponent } from 'App/core/header/header.component';

describe('Login and logout flow integration', () => {
  let loginPageComponent: LoginPageComponent;
  let loginPageComponentComponentFixture: ComponentFixture<LoginPageComponent>;
  let headerComponent: HeaderComponent;
  let headerComponentComponentFixture: ComponentFixture<HeaderComponent>;
  let httpTestingController: HttpTestingController;
  const testEmail = 'some@email.com';
  const testPassword = '12345';
  const testToken = 'dasd1313';
  let mockRouter: SpyObj<any>;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginPageComponent, HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    loginPageComponentComponentFixture = TestBed.createComponent(LoginPageComponent);
    loginPageComponent = loginPageComponentComponentFixture.componentInstance;
    loginPageComponentComponentFixture.detectChanges();

    headerComponentComponentFixture = TestBed.createComponent(HeaderComponent);
    headerComponent = headerComponentComponentFixture.componentInstance;
    headerComponentComponentFixture.detectChanges();
  });

  function getHeaderUserNameDebugElement() {
    return headerComponentComponentFixture.debugElement.query(By.css('.e2e-user-name'));
  }

  describe('once valid credentials submitted', () => {
    const userData = {
      name: 'John Doe',
      email: testEmail
    };

    beforeEach(() => {
      loginPageComponent.loginForm.controls.email.setValue(testEmail);
      loginPageComponent.loginForm.controls.password.setValue(testPassword);
      loginPageComponentComponentFixture.debugElement.query(By.css('.e2e-login-form'))
        .triggerEventHandler('ngSubmit', null);
      httpTestingController.expectOne(`${ environment.apiUrl }/auth/login`)
        .flush({ access_token: testToken });
      httpTestingController.expectOne(`${ environment.apiUrl }/user/profile`)
        .flush(userData);
    });

    describe('app should', () => {
      it('store token in localStorage', () => {
        expect(localStorage.getItem(storageKeys.token)).toBe(testToken);
      });

      it('store user data in local storage', () => {
        expect(JSON.parse(localStorage.getItem(storageKeys.user) as string)).toEqual(userData);
      });

      it('redirect the user to courses page', () => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/courses']);
      });
    });

    describe('app header should', () => {
      beforeEach(() => {
        headerComponentComponentFixture.detectChanges();
      });

      it('display user name in header', () => {
        expect(getHeaderUserNameDebugElement().nativeElement.innerText)
          .toBe(userData.name);
      });

      describe('provide ability to logout:', () => {
        beforeEach(() => {
          headerComponentComponentFixture.debugElement.query(By.css('.e2e-logout-btn'))
            .triggerEventHandler('click', null);
          headerComponentComponentFixture.detectChanges();
        });

        it('should redirect the user to login page', () => {
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
        });

        it('should remove token from local storage', () => {
          expect(localStorage.getItem(storageKeys.token)).toBeNull();
        });

        it('should remove user info from header', () => {
          expect(getHeaderUserNameDebugElement()).toBeNull();
        });
      });
    });
  });
});
