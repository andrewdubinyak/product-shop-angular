import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {AdminComponent} from './admin.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AddProductComponent} from './component/add-product/add-product.component';
import {ProductListComponent} from './component/product-list/product-list.component';
import {AddCategoryComponent} from './component/add-category/add-category.component';
import {AddSubCategoryComponent} from './component/add-sub-category/add-sub-category.component';
import {AdminHeaderMenuComponent} from './component/admin-header-menu/admin-header-menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminLoginComponent} from './component/admin-login/admin-login.component';
import {ToastsContainer} from "../core/component/toast/toast.component";
import {CategoryListComponent} from './component/category-list/category-list.component';
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    AddProductComponent,
    ProductListComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    AdminHeaderMenuComponent,
    AdminLoginComponent,
    ToastsContainer,
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ]
})
export class AdminModule {
}
