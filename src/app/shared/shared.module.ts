import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { PageSizeSwitcherComponent } from './page-size-switcher/page-size-switcher.component';
import { PageSwitcherComponent } from './page-switcher/page-switcher.component';



@NgModule({
  declarations: [DurationPipe, PageSizeSwitcherComponent, PageSwitcherComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    DurationPipe,
    PageSizeSwitcherComponent,
    PageSwitcherComponent
  ]
})
export class SharedModule { }
