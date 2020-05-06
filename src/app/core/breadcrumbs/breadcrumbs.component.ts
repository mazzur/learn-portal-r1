import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'lp-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: Array<Breadcrumb> = [];
  private unsubscribeOnDestroy = new Subject();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribeOnDestroy),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Array<Breadcrumb> = []
  ): Array<Breadcrumb> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    const activeChild = children[0];
    const routeURL = activeChild.snapshot.url.map(segment => segment.path).join('/');
    if (routeURL !== '') {
      url += `/${ routeURL }`;
    }

    const label = activeChild.routeConfig && activeChild.routeConfig.data && activeChild.routeConfig.data.breadcrumb;
    if (label) {
      breadcrumbs.push({ label, url });
    }

    return this.createBreadcrumbs(activeChild, url, breadcrumbs);
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

}
