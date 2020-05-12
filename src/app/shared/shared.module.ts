import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { PageSizeSwitcherComponent } from './page-size-switcher/page-size-switcher.component';
import { PageSwitcherComponent } from './page-switcher/page-switcher.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DurationPipe, PageSizeSwitcherComponent, PageSwitcherComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DurationPipe,
    PageSizeSwitcherComponent,
    PageSwitcherComponent,
    ConfirmationModalComponent,
  ]
})
export class SharedModule { }
