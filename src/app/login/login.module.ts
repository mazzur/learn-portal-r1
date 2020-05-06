import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from 'App/shared/shared.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
