import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {StepOneComponent} from './stepper/step-one/step-one.component';
import {StepTwoComponent} from './stepper/step-two/step-two.component';
import {StepThreeComponent} from './stepper/step-three/step-three.component';
import {StepFourComponent} from './stepper/step-four/step-four.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CartComponent} from "./cart.component";
import {AngularMaterialModule} from "../../modules/angular-material.modules";


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
    CartRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class CartModule {
}
