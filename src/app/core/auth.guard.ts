import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
  CanLoad,
  Route, UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'App/core/authorization.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }

  private checkLogin(url: string) {
    return this.authorizationService.authorization$
      .pipe(
        take(1),
        tap((isAuthorized) => {
          if (!isAuthorized) {
            this.router.navigate(['/login']);
          }
        })
      );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin(state.url);
  }

  canLoad(route: Route, segments: Array<UrlSegment>): Observable<boolean> {
    return this.checkLogin(route.path || '');
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
