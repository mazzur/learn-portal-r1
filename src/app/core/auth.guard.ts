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

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }

  private checkLogin(url: string) {
    if (this.authorizationService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin(state.url);
  }

  canLoad(route: Route, segments: Array<UrlSegment>): boolean {
    return this.checkLogin(route.path || '');
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
