import { AuthInterceptor } from 'App/core/http-interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from 'App/core/http-interceptors/loading.interceptor';

export const httpInterceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
];
