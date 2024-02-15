import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { DriverDashboardComponent } from './pages/driver-dashboard/driver-dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddPackageComponent } from './pages/add-package/add-package.component';
import { AddDeliveryComponent } from './pages/add-delivery/add-delivery.component';
import { AdminGuard } from './guards/admin.guard';
import { CustomerGuard } from './guards/customer.guard';
import { DriverGuard } from './guards/driver.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthenticationGuard, AdminGuard]
  },
  {
    path: 'admin/add-package',
    component: AddPackageComponent,
    canActivate: [AuthenticationGuard, AdminGuard]
  },
  {
    path: 'admin/add-delivery',
    component: AddDeliveryComponent,
    canActivate: [AuthenticationGuard, AdminGuard]
  },
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthenticationGuard, CustomerGuard]
  },
  {
    path: 'driver/dashboard',
    component: DriverDashboardComponent,
    canActivate: [AuthenticationGuard, DriverGuard]
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
