import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CatalogRoutingModule} from './catalog-routing.module';
import {AngularMaterialModule} from "../../modules/angular-material.modules";
import {CatalogComponent} from "./catalog.component";
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    AngularMaterialModule,
    NgbButtonsModule
  ]
})
export class CatalogModule {
}
