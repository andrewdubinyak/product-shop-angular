import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {ProductComponent} from "./product.component";
import {AngularMaterialModule} from "../../modules/angular-material.modules";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxSliderModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class ProductModule {
}
