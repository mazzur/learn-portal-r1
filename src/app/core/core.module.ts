import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'App/core/header/header.component';
import { FooterComponent } from 'App/core/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorsProviders } from 'App/core/http-interceptors';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [httpInterceptorsProviders],
  exports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule
  ]
})
export class CoreModule { }
