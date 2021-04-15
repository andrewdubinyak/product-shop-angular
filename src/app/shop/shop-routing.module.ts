import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from "./component/catalog/catalog.component";
import {ProductComponent} from "./component/product/product.component";
import {ProductDetailComponent} from "./component/product-detail/product-detail.component";
import {CartComponent} from "./component/cart/cart.component";
import {SignInComponent} from "./component/sign-in/sign-in.component";
import {SignUpComponent} from "./component/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: '', component: CatalogComponent
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'product', component: ProductComponent
  },
  {
    path: 'product-detail', component: ProductDetailComponent
  },
  {
    path: 'cart', component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
