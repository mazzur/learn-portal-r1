import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorizationService, Credentials } from 'App/core/authorization.service';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'App/core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onSubmit(credentials: Credentials) {
    this.authorizationService.login(credentials)
      .pipe(switchMap(() => this.userService.getUser()))
      .subscribe(() => {
        this.router.navigate(['/courses']);
      });
  }

}
