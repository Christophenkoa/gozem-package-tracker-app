import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { DriverDashboardComponent } from './pages/driver-dashboard/driver-dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddPackageComponent } from './pages/add-package/add-package.component';
import { AddDeliveryComponent } from './pages/add-delivery/add-delivery.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'admin/add-package',
    component: AddPackageComponent
  },
  {
    path: 'admin/add-delivery',
    component: AddDeliveryComponent
  },
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent
  },
  {
    path: 'driver/dashboard',
    component: DriverDashboardComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
