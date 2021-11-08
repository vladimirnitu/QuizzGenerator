import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HomeScreenHomeComponent } from './home-screen/home/home-screen-home.component';
import { HomeScreenLoginComponent } from './home-screen/login/home-screen-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: HomeScreenComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeScreenHomeComponent },
      { path: 'login', component: HomeScreenLoginComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent, children: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
