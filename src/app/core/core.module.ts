import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './component/footer/footer.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {SidebarModule} from 'ng-sidebar';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    RouterModule,
    SidebarModule
  ]
})
export class CoreModule {
}
