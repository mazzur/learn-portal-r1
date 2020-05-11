import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from 'App/core/authorization.service';
import { User } from 'App/core/user';
import { UserService } from 'App/core/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null;
  private unsubscribeOnDestroy = new Subject();

  constructor(private authorizationService: AuthorizationService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        takeUntil(this.unsubscribeOnDestroy),
      )
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
