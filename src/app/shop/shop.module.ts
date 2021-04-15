import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShopRoutingModule} from './shop-routing.module';
import {CatalogComponent} from './component/catalog/catalog.component';
import {CoreModule} from "../core/core.module";
import {ProductComponent} from './component/product/product.component';
import {FormsModule} from "@angular/forms";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {SidebarModule} from "ng-sidebar";
import {ProductDetailComponent} from './component/product-detail/product-detail.component';
import {NgbNavModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {SignInComponent} from './component/sign-in/sign-in.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {NgStepperModule} from "angular-ng-stepper";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CartModule} from "./component/cart/cart.module";


@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent,
    ProductDetailComponent,
    SignInComponent,
    SignUpComponent,
  ],
  exports: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    CoreModule,
    FormsModule,
    NgxSliderModule,
    SidebarModule,
    NgbRatingModule,
    NgbNavModule,
    NgStepperModule,
    CdkStepperModule,
    CartModule
  ]
})
export class ShopModule {
}
