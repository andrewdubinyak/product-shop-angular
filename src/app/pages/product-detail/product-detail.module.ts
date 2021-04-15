import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductDetailRoutingModule} from './product-detail-routing.module';
import {ProductDetailComponent} from "./product-detail.component";
import {AngularMaterialModule} from "../../modules/angular-material.modules";
import {NgbNavModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    AngularMaterialModule,
    NgbRatingModule,
    NgbNavModule
  ]
})
export class ProductDetailModule {
}
