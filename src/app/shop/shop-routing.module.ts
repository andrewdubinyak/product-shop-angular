import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogComponent} from './component/catalog/catalog.component';
import {ProductComponent} from './component/product/product.component';
import {ProductDetailComponent} from './component/product-detail/product-detail.component';
import {CartComponent} from './component/cart/cart.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {ShopComponent} from './shop.component';

const routes: Routes = [
  {
    path: '', component: ShopComponent,
    children: [
      {
        path: '', component: CatalogComponent, pathMatch: 'full',
      },
      {
        path: 'sign-in', component: SignInComponent, pathMatch: 'full'
      },
      {
        path: 'sign-up', component: SignUpComponent, pathMatch: 'full'
      },
      {
        path: 'product', component: ProductComponent, pathMatch: 'full'
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent,
        pathMatch: 'full'
      },
      {
        path: 'cart', component: CartComponent, pathMatch: 'full'
      }
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
