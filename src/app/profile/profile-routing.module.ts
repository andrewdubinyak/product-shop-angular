import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AuthGuard} from '../guards/auth.guard';
import {DashboardComponent} from './component/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: DashboardComponent, pathMatch: 'full'
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
