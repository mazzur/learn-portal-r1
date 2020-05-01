import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'App/core/header/header.component';
import { FooterComponent } from 'App/core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorsProviders } from 'App/core/http-interceptors';
import { MOCK_COURSES } from 'App/core/http-interceptors/mock-courses-injection-token';
import coursesListMock from 'App/core/http-interceptors/mocks/courses-list.mock.json';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorsProviders,
    { provide: MOCK_COURSES, useValue: coursesListMock }
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule
  ]
})
export class CoreModule { }
