import { AuthInterceptor } from 'App/core/http-interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const httpInterceptorsProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
