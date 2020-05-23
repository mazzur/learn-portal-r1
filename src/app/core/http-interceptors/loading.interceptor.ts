import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalLoadingService } from 'App/core/global-loading/global-loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private globalLoadingService: GlobalLoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.globalLoadingService.requestStart();
    return next.handle(request)
      .pipe(
        finalize(() => {
          this.globalLoadingService.requestEnd();
        })
      );
  }
}
