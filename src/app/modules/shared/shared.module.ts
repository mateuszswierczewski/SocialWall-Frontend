import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifcationComponent } from './notifcation/notifcation.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';


@NgModule({
  declarations: [NotifcationComponent, ClickOutsideDirective],
  imports: [
    CommonModule
  ],
  exports: [
    NotifcationComponent,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
