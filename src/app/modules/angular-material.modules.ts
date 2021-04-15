import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SidebarModule} from 'ng-sidebar';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {NgStepperModule} from 'angular-ng-stepper';
import {CdkStepperModule} from "@angular/cdk/stepper";

const materialModules = [
  SidebarModule,
  NgxSliderModule,
  NgStepperModule,
  CdkStepperModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
})

export class AngularMaterialModule {
}
