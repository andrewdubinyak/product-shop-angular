import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StepOneComponent} from './stepper/step-one/step-one.component';
import {StepTwoComponent} from './stepper/step-two/step-two.component';
import {StepThreeComponent} from './stepper/step-three/step-three.component';
import {StepFourComponent} from './stepper/step-four/step-four.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CartComponent} from "./cart.component";
import {NgStepperModule} from "angular-ng-stepper";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CoreModule} from "../../../core/core.module";


@NgModule({
  declarations: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    CartComponent
  ],
  exports: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgStepperModule,
    CdkStepperModule,
    CoreModule,
  ]
})
export class CartModule {
}
