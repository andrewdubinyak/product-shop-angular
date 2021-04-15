import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {ShopComponent} from './shop/shop.component';
import {ShopModule} from "./shop/shop.module";


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ShopModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
