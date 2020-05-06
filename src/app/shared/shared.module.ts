import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { PageSizeSwitcherComponent } from './page-size-switcher/page-size-switcher.component';
import { PageSwitcherComponent } from './page-switcher/page-switcher.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [DurationPipe, PageSizeSwitcherComponent, PageSwitcherComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DurationPipe,
    PageSizeSwitcherComponent,
    PageSwitcherComponent,
    ConfirmationModalComponent,
  ]
})
export class SharedModule { }
