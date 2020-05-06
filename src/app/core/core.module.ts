import { NgModule } from '@angular/core';
import { HeaderComponent } from 'App/core/header/header.component';
import { FooterComponent } from 'App/core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorsProviders } from 'App/core/http-interceptors';
import { NotFountPageComponent } from './not-fount-page/not-fount-page.component';
import { SharedModule } from 'App/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFountPageComponent,
    BreadcrumbsComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  providers: [
    httpInterceptorsProviders
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    BreadcrumbsComponent
  ]
})
export class CoreModule { }
