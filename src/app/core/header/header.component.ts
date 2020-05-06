import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from 'App/core/authorization.service';
import { User } from 'App/core/user';
import { UserService } from 'App/core/user.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'lp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null;
  private unsubscribeOnDestroy = new Subject();

  constructor(private authorizationService: AuthorizationService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribeOnDestroy),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => this.getUser());
  }

  getUser() {
    this.userService.getUser()
      .subscribe((user) => {
        this.user = user;
      });
  }

  logout() {
    this.authorizationService.logout();
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }
}
