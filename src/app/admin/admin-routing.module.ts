import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AddProductComponent} from "./component/add-product/add-product.component";
import {ProductListComponent} from "./component/product-list/product-list.component";
import {AddCategoryComponent} from "./component/add-category/add-category.component";
import {AddSubCategoryComponent} from "./component/add-sub-category/add-sub-category.component";
import {AdminLoginComponent} from "./component/admin-login/admin-login.component";
import {AuthGuard} from "../guards/auth.guard";
import {AdminComponent} from "./admin.component";
import {CategoryListComponent} from "./component/category-list/category-list.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'dashboard', component: DashboardComponent,
      },
      {
        path: 'add-product', component: AddProductComponent, pathMatch: 'full'
      },
      {
        path: 'product-list', component: ProductListComponent, pathMatch: 'full'
      },
      {
        path: 'add-category', component: AddCategoryComponent, pathMatch: 'full'
      },
      {
        path: 'category-list', component: CategoryListComponent, pathMatch: 'full'
      },
      {
        path: 'add-sub-category',
        component: AddSubCategoryComponent,
        pathMatch: 'full'
      }
    ]
  },
  {path: 'log-in', component: AdminLoginComponent, pathMatch: 'full'},

  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
